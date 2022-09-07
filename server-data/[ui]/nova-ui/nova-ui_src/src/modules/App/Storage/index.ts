import { observable, action, makeAutoObservable } from 'mobx';
import { PopupMenuProps, TooltipProps } from 'components';
import API from 'API';

class StorageProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable isShiftDown = false;

  @observable isUIVisible = true;

  @observable isPlayerInfoVisible = false;

  @observable isCtrlDown = false;

  @observable currentLocation = null;

  currentPreview = null;

  @observable tooltip: TooltipProps = null;

  @observable popupMenu: PopupMenuProps = null;

  previewPosition = null;

  @action showTooltip(data: TooltipProps) {
    this.tooltip = data;
  }

  @action showPopup = (data: PopupMenuProps) => {
    this.popupMenu = data;
  };

  @action closeApp = () => {
    API.query('close', {});
    this.showPopup(null);
    this.showTooltip(null);
  };

  @action setUIVisible = (value: boolean) => {
    if (this.isUIVisible != value) {
      this.isUIVisible = value;
      API.query('ui/visible', { visible: value }).catch(() => {});
    }
  };

  refs: Record<string, React.RefObject<HTMLDivElement>> = {};
}

const Storage = new StorageProto();

export default Storage;
