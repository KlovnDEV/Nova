WEB.route(
  "/api/inventoryitem/updatepos",
  [
    WEB.val.body("id").isInt(),
    WEB.val.body("x").isInt(),
    WEB.val.body("y").isInt(),
  ],
  async (request, response) => {
    const { id, x, y } = request.body;
    const res = await DB.query(
      `UPDATE inventory_items SET x = ?, y = ? WHERE id = ?`,
      id,
      x,
      y,
    );

    if (!WEB.affected(res)) return WEB.nothingUpdated(response);

    response.send(res);
  }
);
