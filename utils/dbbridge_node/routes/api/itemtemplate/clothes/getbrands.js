WEB.route(
  "/api/itemtemplate/clothes/getbrands",
  [
    WEB.val.body("sex").isInt(),
    WEB.val.body("category").isString(),
    WEB.val.body("class").isInt(),
  ],
  async (request, response) => {
    const { sex, category } = request.body;
    const clothClass = request.body['class'];

    const res = await DB.query(
      `SELECT DISTINCT brand, brand_label FROM item_template_clothes WHERE sex = ? AND category = ? AND class = ?`,
      sex, category, clothClass
    );

    response.send(res);
  }
);
