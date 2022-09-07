import express from "express";
import cors from "cors";
import ExpressValidator from "express-validator";
import dotenv from 'dotenv';
dotenv.config();

class WebProto {
  #Express;

  constructor(host, port) {
    this.#Express = express();
    this.#Express.use(express.json({limit: '50mb', strict: false}));
    this.#Express.use('/public', express.static('public'));
    this.#Express.use(cors());

    this.val = ExpressValidator;

    this.#Express.listen(port, host, () => {
      console.log(`Example app listening at http://${host}:${port}`);
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

const WEB = new WebProto(process.env.HOST, process.env.PORT);

export default WEB;
