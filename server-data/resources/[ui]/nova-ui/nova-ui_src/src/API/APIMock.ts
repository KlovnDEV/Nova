import { AxiosInstance } from 'axios';
// utils
import { sleep } from 'utils';
import { ResponseError } from './ResponseError';

type ICommand = {(args: AnyObject, mock: APIMock): Promise<APIResponse>};
class APIMock {

  #axios: AxiosInstance;

  static readonly commands = {} as Record<string, ICommand>;

  constructor(baseURL: string, axios: AxiosInstance) {
    this.#axios = axios;
  }

  static registerCommands(commands: Record<string, ICommand>): void {
    Object.assign(APIMock.commands, commands);
  }

  async dbPost(url: string, args: AnyObject) : Promise<APIResponse> {
    try {
      return await this.#axios.post(url, args);
    } catch (e) {
      return new Promise<APIResponse>((resolve, reject) => {
        reject(new ResponseError(
          500,
          `Запрос к базе завершился неудачей!\n
          Адрес: ${url}\n
          Аргументы: ${JSON.stringify(args)}`
          ));
      });
//      return e.response || APIMock.responseError(500, "Запрос к базе завершился неудачей!");
    }
  }

  async query(command: string, args: AnyObject) : Promise<APIResponse> {
    if (DEVELOPMENT) {
      await sleep(100+Math.random()*100);
    }

    if (APIMock.commands[command]) {
      return APIMock.commands[command](args, this);
    }

    return new Promise<APIResponse>((resolve, reject) => {
      reject(new ResponseError(500, `Неизвестная команда API: ${command}`));
    });
  }
}

export default APIMock;
