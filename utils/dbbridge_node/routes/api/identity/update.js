WEB.route(
  "/api/identity/update",
  [
    WEB.val.body("identifier").isString(),
    WEB.val.body("firstname").isString(),
    WEB.val.body("lastname").isString(),
    WEB.val.body("sex").isInt(),
    WEB.val.body("age").isInt(),
    WEB.val.body("height").isInt(),
  ],
  async (request, response) => {
    const { identifier, firstname, lastname, sex, age, height } = request.body;
    const res = await DB.query(
      `INSERT INTO
        user_identity (identifier, firstname, lastname, sex, age, height)
      VALUES(?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE firstname=?, lastname=?, sex=?, age=?, height=?`,
      identifier,
      firstname,
      lastname,
      sex,
      age,
      height,
      firstname,
      lastname,
      sex,
      age,
      height
    );

    if (!WEB.affected(res)) return WEB.nothingUpdated(response);

    response.send(res);
  }
);
