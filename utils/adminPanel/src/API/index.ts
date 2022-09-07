import axios from 'axios';
import { wrapInAPIResponse } from 'utils';

class API {
  #axios;

  constructor(baseURL: string) {
    this.#axios = axios.create({
      baseURL,
      responseType: 'json',
      timeout: 10000,
    });
  }

  query(command: string, args: AnyObject): Promise<APIResponse> {
    const responsePromise = this.#axios.post(command, args);

    return responsePromise.then(({ data, status }) => {
      if (!data) {
        return wrapInAPIResponse({ value: 'Query API response is not defined!', status: 500 });
      }

      if (status !== 200) {
        return wrapInAPIResponse({ value: data, status });
      }

      if (!data) {
        return wrapInAPIResponse({ value: 'Response data is not defined!', status: 500 });
      }

      return wrapInAPIResponse({ value: data, status: status });
    });
  }
}

const instance = new API(process.env.BASE_URI);

export default instance;
