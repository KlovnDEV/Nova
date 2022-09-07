import { AxiosResponse } from 'axios';

export type APIResponse = AxiosResponse | { status: number; data?: AnyObject | string };

export type SnackbarAction = {
  label: string;
  handler: { (): void };
};
export interface GasStation {
  brand: string;
  title: string;
  owner: string;
  volume: number;
  price: number;
}

export interface Employee {
  id: number;
  name: string;
  grade: number;
}

export interface EmployeeGrade {
  role: string;
  grade: number;
  name: string;
  label: string;
  salary: number;
}

export interface BudgetHistoryEntry {
  t: Date | number;
  y: number;
}

export interface Organization {
  title: string;
  name: string;
  budget: number;
  income: number;
  owner: string;
  color: string;
  icon?: string;
  permissions: any;
}

export type Organizations = Array<Organization>;

export interface Tax {
  name: string;
  label: string;
  description: string;
  amount: number;
  incomeDay: number;
  color: string;
  taxHistory: Array<BudgetHistoryEntry>;
}

export enum RecordCategoryPolice {
  Administrative = 0,
  Criminal = 1,
}

export enum RecordCategoryAmbulance {
  Reception = 0,
  Certificate = 1,
  Surgery = 2,
}

export enum RecordParticipantCategoryPolice {
  Victim = 0,
  Witness = 1,
  Criminal = 2,
  Officer = 3,
  Detective = 4,
}

export enum RecordParticipantCategoryAmbulance {
  Patient = 0,
  Assistant = 1,
  Doctor = 2,
}

export enum PersonSex {
  Male = 0,
  Female = 1,
}

export enum PersonStatus {
  Alive = 0,
  Dead = 1,
  Missing = 2,
  Wanted = 3,
  UnderInvestigation = 4,
  Prison = 5,
}

export interface Person {
  id?: number;
  sex?: PersonSex;
  firstname: string;
  lastname: string;
  age?: number;
  status?: PersonStatus;
  phone?: string;
  photo?: string;
}

export interface RecordParticipant extends Person {
  category: RecordParticipantCategoryPolice;
}

export interface Media {
  src: string;
  caption?: string;
  isVideo?: boolean;
  isClip?: boolean;
  original: string;
  thumbnail?: string;
}

export interface CurrentMedia {
  instance: any;
  media: Media;
  index: number;
}

export interface Record {
  id: number;
  isArchived: boolean;
  organization: 'police' | 'ambulance';
  title: string;
  category: RecordCategoryPolice | RecordCategoryAmbulance;
  responsible: string;
  date: Date;
  participants?: Array<RecordParticipant>;
  violations?: Array<Violation>;
  description?: string;
  media?: Array<Media>;
  [x: string]: any;
}

export interface Violation {
  id: number;
  firstname: string;
  lastname: string;
  recordId: number;
  lawId: number;
  fineAmount: number;
  detentionAmount: number;
  closed: boolean;
}

export interface LawArticle {
  id: number;
  label: string;
  description: string;
  fineMin: number;
  fineMax: number;
  detentionMin: number;
  detentionMax: number;
  category: RecordCategoryPolice;
}

export enum CertificateCategory {
  IDCard = 0,
  Document = 1,
  Fine = 2,
  PassKey = 3,
}

export interface Certificate {
  id: number;
  firstname: string;
  lastname: string;
  date: Date;
  expireDate?: Date;
  category: CertificateCategory;
  author: string;
  isRevoked: boolean;
  variation?: number;
}

export interface CertificatePassKey extends Certificate {
  role: string;
  grade: number;
  organization: string;
}

export interface CertificateFine extends Certificate {
  lawId: number;
  fineAmount: number;
  text: string;
}

export interface CertificateIDCard extends Certificate {
  age: number;
  sex: number;
  drivingLicenses: AnyObject; //   drivingLicenses: Set<'car' | 'moto' | 'boat' | 'heli' | 'plane'>;
  weaponLicenses: AnyObject;
  photo: string;
}

export interface CertificateDocument extends Certificate {
  text: string;
  title: string;
  organization: string;
}
