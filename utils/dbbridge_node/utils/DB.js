import mariadb from "mariadb";

const SLOW_QUERY_THRESHOLD = 1000; //ms

class DBProto {
  #pool;

  constructor(poolParams) {
    this.#pool = mariadb.createPool(poolParams);
  }

  async getConnection() {
    return this.#pool.getConnection();
  }

  async query(sql, ...rest) {
    let time1 = new Date().getTime();
    let conn;
    try {
      conn = await this.#pool.getConnection();
      let res = undefined;

      try {
        res = await conn.query(sql, rest);
      } catch (e) {
        if (!e.fatal) {
          console.error(e);
          res = await conn.query(sql, rest);
        } else {
          throw e;
        }
      }

      let time2 = new Date().getTime();
      if (time2-time1 > SLOW_QUERY_THRESHOLD) {
        console.warn(`Slow query (${time2-time1} ms): ${sql}`);
      }

      return res;
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.release();
    }
  }
}

const DB = new DBProto({
  // socketPath: "\\\\.\\pipe\\MySQL",
  host: "127.0.0.1",
  user: "root",
  database: "nova",
  connectionLimit: 100,
  acquireTimeout: 3000,
  minDelayValidation: 3000,
  resetAfterUse: false,
});

export default DB;
