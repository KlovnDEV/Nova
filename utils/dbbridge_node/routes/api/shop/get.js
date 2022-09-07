WEB.route(
  "/api/shop/get",
  [
  ],
  async (request, response) => {
    const res = await DB.query(
      `SELECT * FROM shops`
    );

    response.send(res);
  }
);
