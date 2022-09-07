WEB.route(
  "/api/property/get",
  [
    WEB.val.body("name").optional().isString(),
  ],
  async (request, response) => {
    const { name } = request.body;
    let res = null;

    if (name) {
      res = await DB.query(
        `SELECT * FROM property WHERE name = ?`,
        name,
      );
    } else {
      res = await DB.query(
        `SELECT * FROM property`,
      );
    }


    response.send(res);

  }
);
