WEB.route(
  "/api/cad/person/get",
  [
    WEB.val.body("id").isInt(),
  ],
  async (request, response) => {
    const { id } = request.body;
    const res = await DB.query(
      `SELECT * FROM cad_persons WHERE id = ? LIMIT 1`,
      id
    );

    response.send(res);
  }
);
