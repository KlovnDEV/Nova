WEB.route(
  "/api/cad/record/get",
  [
    WEB.val.body("id").isInt(),
  ],
  async (request, response) => {
    const { id } = request.body;
    const res = await DB.query(
      `SELECT * FROM cad_records WHERE id = ? LIMIT 1`,
      id
    );

    res[0].media = JSON.parse(res[0].media);

    res[0].participants = await DB.query(`SELECT * FROM cad_participants WHERE recordId = ?`, id);
    res[0].violations = await DB.query(`SELECT * FROM cad_violations WHERE recordId = ?`, id);
    delete res[0].participants.meta;
    delete res[0].violations.meta;
    delete res[0].meta;

    response.send(res[0]);
  }
);
