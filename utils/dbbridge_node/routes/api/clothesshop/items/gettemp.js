WEB.route(
  "/api/clothesshop/items/gettemp",
  [
    WEB.val.body("shopid").isInt(),
    WEB.val.body("category").isString(),
    WEB.val.body("sex").isInt(),
  ],
  async (request, response) => {
    const { shopid, category, sex } = request.body;
    const res = await DB.query(
      `SELECT * FROM item_template_clothes WHERE category = ? AND sex = ? LIMIT 10`,
      category, sex, shopid
    );

    response.send(res);
  }
);
