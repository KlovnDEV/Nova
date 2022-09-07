WEB.route(
  "/api/craft/tasks/delete",
  [
    WEB.val.body("id"),
  ],
  async (request, response) => {

    res = await DB.query("DELETE FROM craft_tasks WHERE id = ?", id);
    if (!WEB.affected(res)) WEB.nothingUpdated(response);

    return response.send(res);
  }
);
