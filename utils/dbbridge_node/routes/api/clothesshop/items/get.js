WEB.route(
  "/api/clothesshop/items/get",
  [
    WEB.val.body("shop").isInt(),
  ],
  async (request, response) => {
    const { shop } = request.body;
    const res = await DB.query(
      `SELECT * FROM clothesshop_items WHERE shop = ?`, shop
    );

    response.send(res);
  }
);
