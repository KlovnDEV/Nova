// FIXME: deprecated
import DB from "./DB.js";

const join = (fields, sep) => {
  return Array.isArray(fields) ? fields.join(sep) : fields;
}

class QueryBuilder {
  queryStr = "";

  async query(...rest) {
    return DB.query(this.queryStr, ...rest);
  }
}

class QueryBuilderUpdate extends QueryBuilder {
  #params;
  #whereParams;

  constructor(table, params) {
    super();
    const entries = Object.entries(params);
    this.queryStr = `UPDATE ${table} SET ${entries.map(e => `${e[0]} = ?`).join(',')}`;
    this.#params = entries.map(e => e[1]);
   }

   where(params, sep = 'AND') {
    if (this.#whereParams) throw 'Where already defined!';
    const whereParams = Object.entries(params);
    this.#whereParams = whereParams.map(e => e[1]);
    this.queryStr += ` WHERE ${ whereParams.map(e => `${e[0]} = ?`).join(` ${sep} `) }`

    return this;
   }

   async query() {
     if (!this.#whereParams) this.#whereParams = [];
     return DB.query(this.queryStr, ...this.#params, ...this.#whereParams);
   }
}

class QueryBuilderInsert extends QueryBuilder {
  #params;

 constructor(table, params) {
   super();
   const entries = Object.entries(params);
   this.queryStr = `INSERT INTO ${table} (${entries.map(e => e[0]).join(',')}) VALUES (${entries.map(e => '?').join(',')})`;
   this.#params = entries.map(e => e[1]);
  }

  async query() {
    return DB.query(this.queryStr, ...this.#params);
  }

}

class QueryBuilderSelect extends QueryBuilder {
  #where = false;

  constructor(fields, tables) {
    super();
    this.queryStr = `SELECT ${join(fields, ', ')} FROM ${join(tables, ', ')}`;

    return this;
  }

  where(fields, sep = "AND") {
    if (this.#where) throw "Multiple where!";

    this.queryStr += ` WHERE ${join(fields, ` ${sep} `)}`
    this.#where = true;
  }
}

export {QueryBuilderSelect, QueryBuilderInsert, QueryBuilderUpdate};
