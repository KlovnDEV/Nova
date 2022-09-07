WEB.route(
  "/api/vehicle/update",
  [
    WEB.val.body("id").isInt(),
    WEB.val.body("x").isFloat(),
    WEB.val.body("y").isFloat(),
    WEB.val.body("z").isFloat(),
    WEB.val.body("heading").isFloat(),
  ],
  async (request, response) => {
    const { id, x, y, z, heading } = request.body;

    const res = await DB.query("UPDATE vehicle set x = ?, y = ?, z = ?, heading = ? WHERE id = ?",
      x, y, z, heading, id,
    );

    if (!WEB.affected(res))
      return WEB.nothingUpdated(response);

    return response.send(res);
  }
);
