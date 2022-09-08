import * as T from 'types';

export function BlankRecord(organization: 'police' | 'ambulance'): T.Record {
  return {
    id: -2,
    isArchived: false,
    organization: organization,
    title: '',
    category:
      organization === 'ambulance'
        ? T.RecordCategoryAmbulance.Reception
        : T.RecordCategoryPolice.Administrative,
    responsible: '',
    description: '',
    date: new Date(),
    participants: [],
    violations: [],
    media: [],
  };
}

export default BlankRecord;
