import express from "express";
import ExpressValidator from "express-validator";
import cors from "cors";

class WebProto {
  #Express;

  constructor(port) {
    this.#Express = express();
    this.#Express.use(express.json());
    this.#Express.use(cors());

    this.val = ExpressValidator;

    this.#Express.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }

  async get(path, middle, func) {
    return this.#Express.get(path, middle, func);
  }

  async post(path, middle, func) {
    return this.#Express.post(path, middle, func);
  }

  async all(path, middle, func) {
    return this.#Express.all(path, middle, func);
  }

  async route(path, middle, func) {
    return this.all(path, middle, async (req, res) => {
      const errors = ExpressValidator.validationResult(req);

      if (!errors.isEmpty()) {
        console.error('Invalid query!', path, errors.errors);
        return res.status(400).json({ errors: errors.array() });
      }

      const f = func(req, res).catch((e) => {
        console.error(e);
        return res.status(500).send(e);
      });

      return f;
    });
  }

  affected(res) {
    if (!res.affectedRows || res.affectedRows < 1) {
      return false;
    }

    return true;
  }

  nothingUpdated(res) {
    return res.status(500).send("nothing updated in the database");
  }
}

const WEB = new WebProto(8080);

export default WEB;
