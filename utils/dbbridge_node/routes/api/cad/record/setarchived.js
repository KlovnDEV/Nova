// FIXME: deprecated
WEB.route(
  "/api/cad/record/setarchived",
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
    delete res[0].participants.meta;

    //console.log(res[0].participants);

    response.send(res);
  }
);
