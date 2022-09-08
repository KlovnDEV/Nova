import axios from 'axios';
import * as T from 'types';
// utils
import { wrapInAPIResponse, sleep } from 'utils/Utils';

class APIMockProto {

  #axios;

  constructor(baseURL: string) {
    this.#axios = axios.create({
      baseURL,
      responseType: 'json',
      timeout: 1000,
    });
  }

  static async responseError(status: number, data?: string) : Promise<T.APIResponse> {
    return { status, data };
  }

  async query(command: string, args: AnyObject) : Promise<T.APIResponse> {
    await sleep(100+Math.random()*100);

    switch (command) {

      //   // Laws
      //   case 'getLaws':
      //     return this.getLaws();

      //   // Certificates
      //   case 'getCertificates':
      //     return this.getCertificates();
      //   case 'getCertificate':
      //     return this.getCertificate(args.id);

      //   // Organizations
      //   // case 'getOrganizations':
      //   //   return this.getOrganizations(args.name);

      //   // Organization
      case 'organizations/budget/get':
        return this.getBudget(args.name);
        //   // case 'getBudgetHistory':
        //   //   return this.getBudgetHistory(args.name);
        //   case 'getEmployees':
        //     return this.getEmployees(args.name);
        //   case 'getGrades':
        //     return this.getGrades(args.name);

        //   // Roles
        //   // case 'getRoles':
        //   //   return this.getRoles(args.role);
        //   case 'jobsChangeGrade':
        //     return this.jobsChangeGrade(args.identifier, args.role, args.grade);
        //   case 'jobsChangeSalary':
        //     return this.jobsChangeSalary(args.role, args.grade, args.salary);

        //   // Records
        //   case 'getRecord':
        //     return this.getRecord(args.id);
        //   case 'getRecords':
        //     return this.getRecords(args.archived, args.organization);
        //   case 'getRecordsByName':
        //     return this.getRecordsByName(args.organization, args.firstname, args.lastname);
      case 'saveRecord':
        return this.saveRecord(args);

        //   // Violations
        //   case 'createViolation':
        //     return this.createViolation(args.firstname, args.lastname, args.recordId, args.lawId, args.fineAmount, args.detentionAmount, args.closed);
        //   case 'closeViolation':
        //     return this.closeViolation(args.id);

        //   // Person
        //   case 'createPerson':
        //     return this.createPerson(args as T.Person);
        //   case 'updatePerson':
        //     return this.updatePerson(args as T.Person);
        //   case 'searchPerson':
        //     return this.searchPerson(args.firstname, args.lastname, args.phone, args.status);
        //   case 'getPerson':
        //     return this.getPerson(args.id);
      case 'cad/person/delte':
        return this.deletePerson(args.id);

        //   // Tax
        //   case 'getTaxList':
        //     return this.getTaxList();

        //   // Photo
          case 'takePhotoStart':
            return this.takePhotoStart();

            case 'takePhotoEnd':
              return this.takePhotoEnd();



      default:
        return this.dbPost(command, args);
    }
  }

  takePhotoStart(): Promise<T.APIResponse> {
    return wrapInAPIResponse(`${ASSETS}/img/face.jpg`);
  }

  takePhotoEnd(): Promise<T.APIResponse> {
    return wrapInAPIResponse(`${ASSETS}/img/face.jpg`);
  }

  async getLaws(): Promise<T.APIResponse> {
    return this.dbPost('cad/laws/list', {});
  }

  async getCertificate(id: number) : Promise<T.APIResponse> {
    const response = await this.dbPost('certificates/get', { id });
    if (response.status !== 200) return response;

    // eslint-disable-next-line prefer-destructuring
    response.data = response.data[0];
    return response;
  }

  async getCertificates() : Promise<T.APIResponse> {
    const response = await this.dbPost('certificates/list', {});
    if (response.status !== 200) return response;
    return response;
  }

  async getTaxList(): Promise<T.APIResponse> {
    return this.dbPost('tax/getlist', {});
  }

  // async getBudgetHistory(orgName: string): Promise<T.APIResponse> {
  //   return this.dbPost('stats/budget', { identifier: orgName }); // .then(response => {
  // }

  async getBudget(name: string): Promise<T.APIResponse> {
    // TODO: actual code
    return wrapInAPIResponse({ budget: Math.floor(Math.random()*200000) });
  }

  // async getOrganizations(name?: string): Promise<T.APIResponse> {
  //   return this.dbPost('organizations/get', { name });
  // }

  // async getRoles(role: string): Promise<T.APIResponse> {
  //   return this.dbPost('roles/get', { role });
  // }

  async jobsChangeGrade(identifier: string, role: string, grade: number): Promise<T.APIResponse> {
    return this.dbPost('roles/update', { identifier, role, grade });
  }

  async jobsChangeSalary(role: string, grade: number, salary: number): Promise<T.APIResponse> {
    return this.dbPost('roles/grades/setsalary', { role, grade, salary });
  }

  async createPerson(person: T.Person): Promise<T.APIResponse> {
    return this.dbPost('cad/person/create', person);
  }

  async updatePerson(person: T.Person): Promise<T.APIResponse> {
    return this.dbPost('cad/person/update', person);
  }

  async closeViolation(id: number): Promise<T.APIResponse> {
    return this.dbPost('cad/violations/close', { id });
  }

  async createViolation(firstname: string, lastname: string, recordId: number, lawId: string, fineAmount: number, detentionAmount: number, closed: boolean): Promise<T.APIResponse>  {
    return this.dbPost('cad/violations/create', { firstname, lastname, recordId, lawId, fineAmount, detentionAmount, closed });
  }

  async getRecordsByName(organization: string, firstname: string, lastname: string): Promise<T.APIResponse> {
    return this.dbPost('cad/participants/byname', { organization, firstname, lastname });
  }

  async getEmployees(role: string, identifier?: string): Promise<T.APIResponse> {
    return this.dbPost('roles/get', { role, identifier });
  }

  async getGrades(role: string): Promise<T.APIResponse> {
    return this.dbPost('roles/grades/get', { role });
  }

  async dbPost(url: string, args: AnyObject) : Promise<T.APIResponse> {
    return this.#axios.post(url, args);
  }

  async getRecord(id: number) : Promise<T.APIResponse> {
    const response = await this.dbPost('cad/record/get', { id });
    if (response.status !== 200) return response;

    // eslint-disable-next-line prefer-destructuring
    response.data = response.data[0];
    return response;
  }

  async getRecords(archived: boolean, organization: string) : Promise<T.APIResponse> {
    const response = await this.dbPost('cad/record/list', { archived: archived ? 1 : 0, organization });
    if (response.status !== 200) return response;
    return response;
  }

  async saveRecord(args: AnyObject) : Promise<T.APIResponse> {
    if (args.id < 0) {
      const response = await this.dbPost('cad/record/create', { data: args });
      return response;
    }

    const response = await this.dbPost('cad/record/update', { id: args.id, data: args });
    return response;
  }

  async searchPerson(firstname: string, lastname: string, phone: string, status: number) : Promise<T.APIResponse> {
    const response = await this.dbPost('cad/person/search', { firstname, lastname, phone, status });
    return response;
  }

  async deletePerson(personId: string): Promise<T.APIResponse> {
    const response = await this.dbPost('cad/person/delete', { id: personId});
    return response;
  }

  async getPerson(id: number) : Promise<T.APIResponse> {
    const response = await this.dbPost('cad/person/get', { id });
    return response;
  }
}

export const APIMock = APIMockProto;
export default APIMockProto;
