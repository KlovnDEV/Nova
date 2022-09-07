WEB.route(
  "/api/clothesshop/get",
  [
  ],
  async (request, response) => {
    const res = await DB.query(
      `SELECT * FROM clothesshop`
    );

    response.send(res);
  }
);
