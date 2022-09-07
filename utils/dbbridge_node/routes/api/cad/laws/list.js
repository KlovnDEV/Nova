WEB.route(
  "/api/cad/laws/list",
  [
  ],
  async (request, response) => {
    const res = await DB.query(
      `SELECT * FROM cad_laws`,
    );

    response.send(res);
  }
);
