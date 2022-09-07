WEB.route(
  "/api/itemtemplate/clothes/getitem",
  [
    WEB.val.body("name").isString(),
  ],
  async (request, response) => {
    const { name } = request.body;
    const res = await DB.query(
      `SELECT * FROM item_template_clothes WHERE name = ?`,
      name
    );

    if (res.length == 0) {
      return res.status(400).json({});
    }

    response.send(res[0]);
  }
);
