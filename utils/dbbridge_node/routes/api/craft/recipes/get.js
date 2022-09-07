WEB.route(
  "/api/craft/recipes/get",
  [
    WEB.val.body("categories").isArray(),
  ],
  async (request, response) => {
    const { categories } = request.body;

    if (categories.length === 0) {
      return response.status(400).send('Category is empty!')
    }
    const subquery = categories.map(c => `craft_recipes.category = "${c}"`).join(' OR ')

    const res = await DB.query(
      `SELECT
      craft_recipes.*, item_template.description
    FROM
      craft_recipes
    LEFT JOIN
      item_template on craft_recipes.output = item_template.name
    WHERE ${subquery}`
    );

    response.send(res);
  }
);
