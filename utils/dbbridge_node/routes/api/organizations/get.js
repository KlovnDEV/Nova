WEB.route(
  "/api/organizations/get",
  [
    WEB.val.body("name").optional().isString(),
  ],
  async (request, response) => {
    const { name } = request.body;
    let res = null;

    if (name) {
      res = await DB.query(
        `SELECT * FROM organizations WHERE name = ?`,
        name,
      );
    } else {
      res = await DB.query(`SELECT * FROM organizations`);
    }

    if (!res || res.length == 0) {
      return response.status(400).json({});
    }

    response.send(res);
  }
);
