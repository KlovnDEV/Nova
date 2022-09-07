WEB.route(
  "/api/shop/items/create",
  [
    WEB.val.body("shop").isString(),
    WEB.val.body("name").isString(),
    WEB.val.body("label").isString(),
    WEB.val.body("amount").isInt(),
    WEB.val.body("extra").isString(),
    WEB.val.body("price").isInt(),
  ],
  async (request, response) => {
    const { shop, name, label, amount, extra, price } = request.body;

    const res = await DB.query(
      "INSERT INTO shop_items (shop, name, label, amount, extra, price) VALUES(?, ?, ?, ?, ?, ?)",
      shop, name, label, amount, extra, price,
    );

    if (!WEB.affected(res))
      return WEB.nothingUpdated(response);

    return response.send(res);
  }
);
