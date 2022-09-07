WEB.route(
  "/api/vehicle/garage/update",
  [
    WEB.val.body("id").isInt(),
    WEB.val.body("garage").isString(),
  ],
  async (request, response) => {
    let { id, garage } = request.body;
    if (garage == "") {
      garage = null;
    }

    const res = await DB.query("UPDATE vehicle set garage = ? WHERE id = ?",
      garage, id
    );

    if (!WEB.affected(res))
      return WEB.nothingUpdated(response);

    return response.send(res);
  }
);
