import axios from 'axios';
import { APIResponse } from 'types';
import { wrapInAPIResponse } from 'utils/Utils';
import { APIMock } from './APIMock';
import * as T from '../types';

class APIProto {
  #axios;

  #mock;

  constructor(baseURL: string) {
    if (DEVELOPMENT) {
      this.#mock = new APIMock(process.env.MOCK_DB_BASE);
    }

    this.#axios = axios.create({
      baseURL,
      responseType: 'json',
      timeout: 10000,
    });
  }

  query(command: string, args: AnyObject): Promise<APIResponse> {
    if (DEVELOPMENT) {
      return this.#mock.query(command, args);
    }

    const responsePromise = this.#axios.post('query_api', {
      cmd: command,
      args,
    });

    return responsePromise;
  }

  getBudgetHistory(identifier?: string) {
    return this.query('stats/budget', { identifier }).then((r: T.APIResponse) => {
      return r.data.map(e => ({
        t: new Date(e.date),
        y: e.amount,
      }));
    });
  }
}

export const API = new APIProto(process.env.BASE_URI);

export default API;
