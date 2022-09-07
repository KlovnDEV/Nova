WEB.route(
  "/api/cad/violations/create",
  [
    WEB.val.body("firstname").isString(),
    WEB.val.body("lastname").isString(),
    WEB.val.body("recordId").isInt(),
    WEB.val.body("law").isInt(),
    WEB.val.body("fineAmount").isInt(),
    WEB.val.body("detentionAmount").isInt(),
    WEB.val.body("closed").isBoolean(),
  ],
  async (request, response) => {
    const { firstname, lastname, recordId, law, fineAmount, detentionAmount, closed } = request.body;
    const res = await DB.query(
        `INSERT INTO cad_violations
          (firstname, lastname, recordId, law, fineAmount, detentionAmount, closed)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        firstname, lastname, recordId, law, fineAmount, detentionAmount, closed
      );

    response.send({ id: res.insertId });
  }
);
