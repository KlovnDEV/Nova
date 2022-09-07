WEB.route(
  "/api/inventoryitem/getlist",
  [
    WEB.val.body("inventory_id").isInt(),
  ],
  async (request, response) => {
    const { inventory_id } = request.body;
    const res = await DB.query(
      `SELECT id, inventory_id, item_id, x, y, amount, extra FROM inventory_items WHERE inventory_id = ?`,
      inventory_id
    );

    response.send(res);
  }
);
