WEB.route(
  "/api/inventoryitem/create",
  [
    WEB.val.body("inventory_id").isInt(),
    WEB.val.body("item_id").isInt(),
    WEB.val.body("x").isInt(),
    WEB.val.body("y").isInt(),
    WEB.val.body("amount").isInt(),
    WEB.val.body("extra").isJSON(),
  ],
  async (request, response) => {
    const { inventory_id, item_id, x, y, amount, extra } = request.body;
    const res = await DB.query(
      `INSERT INTO inventory_items(inventory_id, item_id, x, y, amount, extra) VALUES (?, ?, ?, ?, ?, ?)`,
      inventory_id,
      item_id,
      x,
      y,
      amount,
      extra,
    );

    if (!WEB.affected(res)) return WEB.nothingUpdated(response);

    response.send({id: res.insertId});
  }
);
