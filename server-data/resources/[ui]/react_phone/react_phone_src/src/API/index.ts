/* eslint-disable prefer-promise-reject-errors */
import axios, { AxiosInstance } from 'axios';
import APIMock from './APIMock';

// Mocks
import './Mock';

class API {
  #axios: AxiosInstance;

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

  async query(command: string, args: AnyObject): Promise<APIResponse> {
    if (DEVELOPMENT) {
      return this.#mock.query(command, args);
    }

    return new Promise<APIResponse>((resolve, reject) => {
      this.#axios
        .post('query_api', { cmd: command, args })
        .then(response => {
          const { data, status } = response;

          if (!data) {
            return reject({ data: 'Query API response is not defined!', status: 500 });
          }

          if (data.length < 1) {
            return reject({ data: 'Query API response format is invalid!', status: 500 });
          }

          if (status !== 200 && status !== 204) {
            return reject({ data, status });
          }

          if (data[0] !== 200 && data[0] != 204) {
            reject({ data: `Remote error! ${data[1]}`, status: data[0] });
          }

          return resolve({ data: data[1], status: data[0] });
        })
        .catch(e => {
          reject({ data: `Query error! ${e}`, status: 0 });
        });
    });
  }
}

const instance = new API(DEVELOPMENT ? process.env.MOCK_DB_BASE : process.env.BASE_URI);

export default instance;
