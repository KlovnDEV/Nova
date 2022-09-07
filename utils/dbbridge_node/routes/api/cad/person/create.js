import mariadb from "mariadb";

WEB.route(
  "/api/cad/person/create",
  [
    WEB.val.body("firstname").isString(),
    WEB.val.body("lastname").isString(),
    WEB.val.body("sex").isInt(),
    WEB.val.body("age").isInt(),
    WEB.val.body("status").isInt(),
    WEB.val.body("phone").isString(),
    WEB.val.body("photo").isString(),
  ],
  async (request, response) => {
    const { firstname, lastname, sex, age, status, phone, photo } = request.body;

    try {
      const res = await DB.query(
        `INSERT INTO cad_persons
          (firstname, lastname, sex, age, status, phone, photo)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        firstname, lastname, sex, age, status, phone, photo
      );

      response.send({ id: res.insertId });
    } catch (e) {
      if (e instanceof mariadb.SqlError) {
        if (e.code === "ER_DUP_ENTRY") {
            response.status(422).send("Запись с такими параметрами уже существует!");
        }

      } else {
        throw e;
      }
    }
  }
);
