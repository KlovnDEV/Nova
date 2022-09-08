import { Static } from '../../shared/Core/Static';
import { AnyObject } from '../../shared/types';

export class DBError extends Error {
  status: number;
  reason: string;

  constructor(status: number, reason: string) {
    super(`DB query error: ${status}! ${reason}`);
    this.status = status;
    this.reason = reason;
  }
}

export class DB extends Static {
  static Query(command: string, args: AnyObject): Promise<AnyObject> {

    return new Promise((resolve, reject) => {
      emit('db:post', command, JSON.stringify(args), (status, response) => {
      if (status == 200 || status == 204) {
        resolve(JSON.parse(response));
      } else {
        reject(new DBError(status, response));
      }
    })
  });
  }
}
