WEB.route(
  "/api/craft/tasks/get",
  [
    WEB.val.body("category").isString(),
    WEB.val.body("identifier").isString(),
  ],
  async (request, response) => {
    const { category, identifier } = request.body;

    const res = await DB.query(
      `SELECT * FROM craft_tasks WHERE craftZoneCategory = ?, craftZoneIdentifier = ?`,
      category, identifier
    );

    response.send(res);
  }
);
