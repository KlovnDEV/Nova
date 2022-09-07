WEB.route(
  "/api/craft/ingredients/get",
  [
    WEB.val.body("recipeId").isInt(),
  ],
  async (request, response) => {
    const { recipeId } = request.body;

    const res = await DB.query(
      `SELECT
        craft_ingredients.*, item_template.label
      FROM
        craft_ingredients
      LEFT JOIN
        item_template on craft_ingredients.name = item_template.name
      WHERE craft_ingredients.recipeId = ?`, recipeId
    );

    res.forEach(item => delete item.meta);

    response.send(res);
  }
);
