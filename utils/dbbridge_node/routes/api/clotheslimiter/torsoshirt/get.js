WEB.route(
  "/api/clotheslimiter/torsoshirt/get",
  [
  ],
  async (request, response) => {
    const res = await DB.query(
      `SELECT * FROM clotheslimiter_torsoshirt`,
    );

    response.send(res);
  }
);
