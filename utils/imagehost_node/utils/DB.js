import mariadb from "mariadb";

class DBProto {
  #pool;

  constructor(poolParams) {
    this.#pool = mariadb.createPool(poolParams);
  }

  async query(sql, ...rest) {
    let conn;
    try {
      conn = await this.#pool.getConnection();
      const res = await conn.query(sql, rest);
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
  database: "xyz",
  connectionLimit: 3,
  acquireTimeout: 3000,
  minDelayValidation: 3000,
  resetAfterUse: false,
});

export default DB;
