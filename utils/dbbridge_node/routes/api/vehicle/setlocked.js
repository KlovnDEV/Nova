WEB.route(
  "/api/vehicle/setlocked",
  [
    WEB.val.body("id").isInt(),
    WEB.val.body("locked").isBoolean(),
  ],
  async (request, response) => {
    const { id, locked } = request.body;

    const res = await DB.query("UPDATE vehicle set locked = ? WHERE id = ?",
      locked, id,
    );

    if (!WEB.affected(res))
      return WEB.nothingUpdated(response);

    return response.send(res);
  }
);
