import axios from 'axios';
import { wrapInAPIResponse } from 'utils';
import APIMock from './APIMock';

// Mocks
import './Mock';

class API {
  #axios;

  #mock;

  constructor(baseURL: string) {
    this.#axios = axios.create({
      baseURL,
      responseType: 'json',
      timeout: 10000,
    });

    if (DEVELOPMENT) {
      this.#mock = new APIMock(process.env.MOCK_DB_BASE, this.#axios);
    }
  }

  query(command: string, args: AnyObject): Promise<APIResponse> {
    if (DEVELOPMENT) {
      return this.#mock.query(command, args);
    }

    const responsePromise = this.#axios.post('query_api', {
      cmd: command,
      args,
    });

    return responsePromise.then(({ data, status }) => {
      if (!data) {
        return wrapInAPIResponse({ value: 'Query API response is not defined!', status: 500 });
      }

      if (data.length < 2) {
        return wrapInAPIResponse({ value: 'Query API response format is invalid!', status: 500 });
      }

      if (status !== 200) {
        return wrapInAPIResponse({ value: data, status });
      }

      const dbstatus = data[0];
      const responseData = data[1];

      if (!Number.isInteger(dbstatus)) {
        return wrapInAPIResponse({ value: 'Status is not a number!', status: 500 });
      }

      if (!responseData) {
        return wrapInAPIResponse({ value: 'Response data is not defined!', status: 500 });
      }

      return wrapInAPIResponse({ value: responseData, status: dbstatus });
    });
  }
}

const instance = new API(DEVELOPMENT ? process.env.MOCK_DB_BASE : process.env.BASE_URI);

export default instance;
