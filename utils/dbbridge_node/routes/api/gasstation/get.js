WEB.route(
  "/api/gasstation/get",
  [
    WEB.val.body("id").isInt(),
  ],
  async (request, response) => {
    const { id } = request.body;

    const res = await DB.query("SELECT * FROM gas_stations WHERE id = ?", id);

    response.send(res);

  }
);
