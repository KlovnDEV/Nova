WEB.route(
  "/api/shop/items/sell",
  [
    WEB.val.body("id").isInt(),
    WEB.val.body("amount").isInt(),
  ],
  async (request, response) => {
    const { id, amount } = request.body;

    let res = await DB.query(
      "UPDATE shop_items SET amount=amount-? WHERE id=? AND amount > ?",
      amount, id, amount,
    );

    if (!WEB.affected(res)) {
      res = await DB.query(
        "DELETE FROM shop_items WHERE id=? AND amount = ?",
        amount, id, amount,
      );
    }

    if (!WEB.affected(res))
      return WEB.nothingUpdated(response);

    return response.send(res);
  }
);
