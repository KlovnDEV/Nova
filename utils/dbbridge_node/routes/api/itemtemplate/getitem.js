WEB.route(
  "/api/itemtemplate/getitem",
  [
    WEB.val.body("name").isString(),
  ],
  async (request, response) => {
    const { name } = request.body;
    const res = await DB.query(
      `SELECT * FROM item_template WHERE name = ?`,
      name
    );

    response.send(res[0]);
  }
);
