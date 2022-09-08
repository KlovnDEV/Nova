import { observable, makeAutoObservable, action } from 'mobx';
import ReactImageGallery from 'react-image-gallery';
// utils
import { API, warn } from 'utils';
import * as T from 'types';
import { BlankRecord } from './record';
// types

class StateProto {
  @observable organization: 'police' | 'ambulance' = 'ambulance';

  sliderInstance: ReactImageGallery;

  constructor() {
    makeAutoObservable(this);
  }

  @observable assets = {} as {
    recordData: Promise<any>;
    lawArticles: Promise<any>;
  };

  @observable RecordData: T.Record | null = null;

  @observable currentMedia = {} as T.Media;

  @observable hasRecordArchived = false;

  @observable isMediaMenuOpen = false;

  @observable isParticipantsMenuOpen = true;

  @observable isViolationsMenuOpen = true;

  @observable LawArticles: Array<T.LawArticle> | null = null;

  @action fetchRecordData = async (id: number): Promise<any> => {
    if (id == -1) {
      this.RecordData = { ...BlankRecord(this.organization) };
      if (this.organization === 'police') this.isMediaMenuOpen = true;
      return new Promise(r => {
        r(true);
      });
    }

    return API.query('cad/record/get', { id }).then(response => {
      this.RecordData = { ...response.data };
      this.isParticipantsMenuOpen =
        !this.RecordData.participants || this.RecordData.participants.length === 0;
      this.isMediaMenuOpen = !this.RecordData.media || this.RecordData.media.length == 0;
      this.isViolationsMenuOpen =
        !this.RecordData.violations || this.RecordData.violations.length === 0;

      this.hasRecordArchived = this.RecordData.isArchived;

      return response;
    });
  };

  @action updateRecordData(id: number) {
    this.assets.recordData = this.fetchRecordData(id);
  }

  @action updateLawArticles() {
    this.assets.lawArticles = API.query('cad/laws/list', {}).then(response => {
      this.LawArticles = [...response.data];
      return response;
    });
  }

  @action onSlideChange = (index: number): void => {
    this.currentMedia = { ...this.RecordData.media[index] };
  };

  @action onViolationRemove = (rowData: AnyObject): boolean => {
    const target = this.RecordData.violations.find(
      v =>
        v.lastname === rowData.lastname &&
        v.firstname === rowData.firstname &&
        v.lawId === rowData.lawId,
    );
    if (!target) return false;

    const position = this.RecordData.violations.indexOf(target);
    if (position !== -1) this.RecordData.violations.splice(position, 1);

    if (this.RecordData.violations.length === 0) this.isViolationsMenuOpen = true;

    return true;
  };

  @action onViolationAdd = (
    firstName: string,
    lastName: string,
    lawId: number,
    fineAmount: number,
    detentionAmount: number,
  ): boolean => {
    if (firstName.length === 0 || lastName.length === 0) {
      warn('Не заданы имя и фамилия правонарушителя!');
      return false;
    }

    if (lawId < 0) {
      warn('Не выбрана статья закона!');
      return false;
    }

    this.RecordData.violations.push({
      id: -1,
      firstname: firstName,
      lastname: lastName,
      recordId: this.RecordData.id,
      lawId: lawId,
      fineAmount: fineAmount,
      detentionAmount: detentionAmount,
      closed: false,
    });
    this.isViolationsMenuOpen = false;

    return true;
  };

  @action onMediaAdd = async (
    src: string,
    isVideo: boolean,
    isClip: boolean,
    caption: string,
    original: string,
    thumbnail: string,
  ): Promise<void> => {
    this.RecordData.media.push({
      isVideo,
      isClip,
      src,
      caption,
      original,
      thumbnail,
    });
    if (this.sliderInstance) {
      this.sliderInstance.slideToIndex(this.RecordData.media.length);
    } else {
      this.currentMedia = {
        isVideo,
        isClip,
        src,
        caption,
        original,
        thumbnail,
      };
    }
    this.isMediaMenuOpen = false;
  };

  @action deleteMedia = (item: T.Media): boolean => {
    const target = this.RecordData.media.find(slide => slide.src === item.src);
    if (!target) return false;

    const position = this.RecordData.media.indexOf(target);
    if (position >= 0) this.RecordData.media.splice(position, 1);
    return true;
  };

  @action onMediaDelete = (): void => {
    if (this.RecordData.media.length > 0) {
      const prev = this.sliderInstance.getCurrentIndex();
      if (this.RecordData.media.length === 1) {
        this.deleteMedia(this.RecordData.media[0]);
      } else {
        this.deleteMedia(this.currentMedia);
      }
      this.sliderInstance.slideToIndex(prev - 1);
    }

    if (this.RecordData.media.length === 0) {
      this.isMediaMenuOpen = true;
    }
  };

  @action onParticipantAdd = (
    firstName: string,
    lastName: string,
    role: T.RecordParticipantCategoryAmbulance | T.RecordParticipantCategoryPolice | -1,
  ): void => {
    if (role !== -1 && firstName.length > 0 && lastName.length > 0) {
      this.RecordData.participants.push({
        firstname: firstName,
        lastname: lastName,
        category: role as any,
      });
      this.isParticipantsMenuOpen = false;
    }
  };

  @action onParticipantRemove = (data: {
    lastname: string;
    firstname: string;
    category: T.RecordParticipantCategoryAmbulance | T.RecordParticipantCategoryPolice;
  }): void => {
    const { lastname, firstname, category } = data;
    const target = this.RecordData.participants.find(participant => {
      const { lastname: lName, firstname: fName, category: ctg } = participant;
      return ctg === category && fName === firstname && lName === lastname;
    });

    if (target) {
      this.RecordData.participants.splice(this.RecordData.participants.indexOf(target), 1);
    }

    if (this.RecordData.participants.length === 0) this.isParticipantsMenuOpen = true;
  };

  @action saveRecord = (): Promise<T.APIResponse> => {
    if (this.RecordData.id < 0) {
      return API.query('cad/record/create', { data: this.RecordData });
    }
    return API.query('cad/record/update', { id: this.RecordData.id, data: this.RecordData });
  };

  @action setOrganization = (organization: 'police' | 'ambulance'): void => {
    this.organization = organization;

    this.RecordData = { ...BlankRecord(this.organization) };
  };

  @action setSliderInstance = (instance: ReactImageGallery) => {
    this.sliderInstance = instance;
  };
}

export default new StateProto();
