WEB.route(
  "/api/craft/tasks/add",
  [
    WEB.val.body("recipeId").isInt(),
    WEB.val.body("amount").isInt(),
    WEB.val.body("endTime").isDate(),
    WEB.val.body("category").isString(),
    WEB.val.body("identifier").isString(),
  ],
  async (request, response) => {
    const { id, recipeId, amount, endTime, category, identifier } = request.body;
    const res = await DB.query(
      `INSERT INTO
        craft_tasks (recipeId, amount, endTime, craftZoneCategory, craftZoneIdentifier)
      VALUES(?, ?, ?, ?, ?)`,
      recipeId, amount, endTime, category, identifier,
    );

    if (!WEB.affected(res)) return WEB.nothingUpdated(response);

    response.send(res);
  }
);
