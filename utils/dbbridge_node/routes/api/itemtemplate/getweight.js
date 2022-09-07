WEB.route(
  "/api/itemtemplate/getweight",
  [
    WEB.val.body("name").isString(),
  ],
  async (request, response) => {
    const { name } = request.body;
    const res = await DB.query(
      `SELECT weight FROM item_template WHERE name = ?`,
      name
    );

    response.send(res);
  }
);
