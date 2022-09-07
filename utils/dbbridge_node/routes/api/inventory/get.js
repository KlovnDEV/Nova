WEB.route(
  "/api/inventory/get",
  [
    WEB.val.body("id").optional().isInt(),
    WEB.val.body("category").optional().isString(),
    WEB.val.body("identifier").optional().isString()
  ],
  async (request, response) => {
    const { id, category, identifier } = request.body;

    let query = "SELECT * FROM inventory WHERE 1";

    const params = [];

    if (id) {
      query += ` AND id = ?`;
      params.push(id);
    }

    if (category) {
      query += ` AND category = ?`;
      params.push(category);
    }

    if (identifier) {
      query += ` AND identifier = ?`;
      params.push(identifier);
    }

    const result = await DB.query(query, ...params);

    response.send(result);
  }
);
