WEB.route(
  "/api/cad/violations/replace",
  [
    WEB.val.body("recordId").isInt(),
    WEB.val.body("violations").isJSON(),
  ],
  async (request, response) => {
    const { recordId, violations } = request.body;

    await DB.query(`DELETE FROM cad_violations WHERE recordId = ?`, recordId);

    var promises = JSON.parse(violations)?.map(async v => await DB.query(
      `INSERT INTO cad_violations
        (firstname, lastname, recordId, law, fineAmount, detentionAmount, closed)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      v.firstname, v.lastname, recordId, v.law, v.fineAmount, v.detentionAmount, v.closed
    ));

    await Promise.all(promises);

    response.send({});
  }
);
