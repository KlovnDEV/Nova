WEB.route(
  "/api/inventory/update",
  [
    WEB.val.body("category").isString(),
    WEB.val.body("identifier").isString(),
    WEB.val.body("current_weight").toFloat().isFloat(),
    WEB.val.body("max_weight").toFloat().isFloat(),
  ],
  async (request, response) => {
    const { category, identifier, current_weight, max_weight } = request.body;
    const res = await DB.query(
      `UPDATE
            inventory
          SET
            max_weight = ?, current_weight = ?
          WHERE
            category = ? AND identifier = ?`,
      max_weight,
      current_weight,
      category,
      identifier
    );

    if (!WEB.affected(res))
      return WEB.nothingUpdated(response);

    response.send(res);
  }
);
