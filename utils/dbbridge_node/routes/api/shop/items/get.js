WEB.route(
    "/api/shop/items/get",
    [
      WEB.val.body("shop").isInt(),
    ],
    async (request, response) => {
      const { shop } = request.body;
      const res = await DB.query(
        `SELECT * FROM shop_items WHERE shop = ?`, shop
      );

      response.send(res);
    }
  );
