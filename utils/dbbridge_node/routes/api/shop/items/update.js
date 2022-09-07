WEB.route(
  "/api/shop/items/update",
  [
    WEB.val.body("id").isInt(),
    WEB.val.body("amount").isInt(),
  ],
  async (request, response) => {
    const { id, amount } = request.body;

    const res = await DB.query(
      "UPDATE shop_items SET amount=? WHERE id=?",
      amount, id,
    );

    if (!WEB.affected(res))
      return WEB.nothingUpdated(response);

    return response.send(res);
  }
);
