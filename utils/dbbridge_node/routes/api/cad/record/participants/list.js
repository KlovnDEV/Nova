WEB.route(
  "/api/cad/record/participants/list",
  [
    WEB.val.body("recordId").isInt(),
  ],
  async (request, response) => {
    const { archived } = request.body;
    const res = await DB.query(
      `SELECT * FROM cad_participants WHERE recordId = ?`,
      archived
    );

    response.send(res);
  }
);
