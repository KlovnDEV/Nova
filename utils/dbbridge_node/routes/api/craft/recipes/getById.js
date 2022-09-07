WEB.route(
  "/api/craft/recipes/getById",
  [
    WEB.val.body("id").isInt(),
  ],
  async (request, response) => {
    const { id } = request.body;

    const res = await DB.query(
      `SELECT * FROM craft_recipes WHERE id = ? LIMIT 1`,
      id,
    );

    response.send(res);
  }
);
