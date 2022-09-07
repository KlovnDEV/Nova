WEB.route(
  "/api/inventory/getid",
  [
    WEB.val.body("category").isString(),
    WEB.val.body("identifier").isString()
  ],
  async (request, response) => {
    const { category, identifier } = request.body;
    const result = await DB.query(
      `SELECT id FROM inventory WHERE category = ? AND identifier = ?`,
      category,
      identifier
    );

    if (result.length == 0) {
      return response.status(400).json({});
    }

    response.send(result[0]);
  }
);
