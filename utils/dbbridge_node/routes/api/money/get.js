WEB.route(
  "/api/money/get",
  [
    WEB.val.body("name").optional().isString(),
    WEB.val.body("identifier").optional().isString(),
  ],
  async (request, response) => {
    const { name, identifier } = request.body;
    let res = null;

    if (name && identifier) {

      res = await DB.query(
        `SELECT * FROM money WHERE name = ? AND identifier = ?`,
        name,
        identifier,
      );
    } else if (!name && !identifier) {
      res = await DB.query(
        `SELECT * FROM money`,
      );
    } else if (identifier && !name) {
      res = await DB.query(
        `SELECT * FROM money WHERE identifier = ?`,
        identifier,
      );
    } else if (!identifier && name) {
      res = await DB.query(
        `SELECT * FROM money WHERE name = ?`,
        name,
      );
    }

    if (!res || res.length == 0) {
      return response.status(400).json({});
    }

    response.send(res[0]);
  }
);
