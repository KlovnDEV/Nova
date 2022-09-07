WEB.route(
  "/api/cad/person/update",
  [
    WEB.val.body("id").isInt(),
    WEB.val.body("firstname").isString(),
    WEB.val.body("lastname").isString(),
    WEB.val.body("sex").isInt(),
    WEB.val.body("age").isInt(),
    WEB.val.body("status").isInt(),
    WEB.val.body("phone").isString(),
    WEB.val.body("photo").isString(),
  ],
  async (request, response) => {
    const { id, firstname, lastname, sex, age, status, phone, photo } = request.body;

    const res = await DB.query(
      `UPDATE cad_persons SET
          firstname=?,
          lastname=?,
          sex=?,
          age=?,
          status=?,
          phone=?,
          photo=?
        WHERE
          id=?`,
      firstname,
      lastname,
      sex,
      age,
      status,
      phone,
      photo,
      id
    );

    response.send(res);
  }
);
