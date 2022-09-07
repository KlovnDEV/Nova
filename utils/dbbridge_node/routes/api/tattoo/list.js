WEB.route(
  "/api/tattoo/list",
  [
  ],
  async (request, response) => {
    const res = await DB.query(
      `SELECT * FROM tattoo_config`
    );

    response.send(res);
  }
);
