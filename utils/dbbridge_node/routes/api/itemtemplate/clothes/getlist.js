WEB.route(
  "/api/itemtemplate/clothes/getlist",
  [
    WEB.val.body("brand").isString(),
    WEB.val.body("sex").isInt(),
    WEB.val.body("category").isString(),
    WEB.val.body("class").isInt(),
  ],
  async (request, response) => {
    const { brand, sex, category } = request.body;
    const clothClass = request.body['class'];
    const res = await DB.query(
      `SELECT * FROM item_template_clothes WHERE brand = ? AND sex = ? AND category = ? AND class = ?`,
      brand, sex, category, clothClass
    );

    response.send(res);
  }
);
