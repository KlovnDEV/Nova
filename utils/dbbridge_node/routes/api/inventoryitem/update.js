WEB.route(
  "/api/inventoryitem/update",
  [
    WEB.val.body("id").isInt(),
    WEB.val.body("inventory_id").isInt(),
    WEB.val.body("x").isInt(),
    WEB.val.body("y").isInt(),
    WEB.val.body("amount").isInt(),
    WEB.val.body("extra").isJSON(),
  ],
  async (request, response) => {
    const { id, inventory_id, x, y, amount, extra } = request.body;
    const res = await DB.query(
      `UPDATE inventory_items SET inventory_id = ?, x = ?, y = ?, amount = ?, extra = ? WHERE id = ?`,
      inventory_id,
      x,
      y,
      amount,
      extra,
      id
    );

    if (!WEB.affected(res)) return WEB.nothingUpdated(response);

    response.send(res);
  }
);
