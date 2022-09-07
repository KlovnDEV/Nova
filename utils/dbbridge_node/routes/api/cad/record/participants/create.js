WEB.route(
  "/api/cad/record/participants/create",
  [
    WEB.val.body("recordId").isInt(),
    WEB.val.body("firstname").isString(),
    WEB.val.body("lastname").isString(),
  ],
  async (request, response) => {
    const { recordId, firstname, lastname } = request.body;
    const res = await DB.query(
        `INSERT INTO cad_participants
          (recordId, firstname, lastname)
        VALUES (?, ?, ?)`,
        recordId, firstname, lastname
      );

    response.send({ id: res.insertId });
  }
);
