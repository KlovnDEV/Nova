WEB.route(
  "/api/inventoryitem/delete",
  [
    WEB.val.body("inventory_id").isInt(),
    WEB.val.body("id").isInt(),
  ],
  async (request, response) => {
    const { inventory_id, id } = request.body;
    const res = await DB.query(
      `DELETE FROM inventory_items WHERE inventory_id = ? AND id = ?`,
      inventory_id,
      id,
    );

    if (!WEB.affected(res)) return WEB.nothingUpdated(response);

    response.send(res);
  }
);
