export interface ICertificate {
  State: AnyObject;
  editable: boolean;
  onPhoto?: { (url: string): void };
}

export interface IIDCard {
  firstname: string;
  lastname: string;
  age: number;
  sex: number;
  photo: string;
  drivingLicenses: AnyObject;
  weaponLicenses: AnyObject;
}
