WEB.route(
  "/api/inventoryitem/getitem",
  [
    WEB.val.body("inventory_id").isInt(),
    WEB.val.body("id").isString()
  ],
  async (request, response) => {
    console.log('Inventory item get');
    const { inventory_id, id } = request.body;
    const res = await DB.query(
      `SELECT id, inventory_id, item_id, x, y, amount, extra FROM inventory_items WHERE inventory_id = ? and id = ?`,
      inventory_id,
      id
    );

    if (res.length == 0) {
      return res.status(400).json({});
    }

    response.send(res[0]);
  }
);
