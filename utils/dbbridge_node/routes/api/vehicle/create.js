WEB.route(
  "/api/vehicle/create",
  [
    WEB.val.body("model").isString(),
    WEB.val.body("x").isFloat(),
    WEB.val.body("y").isFloat(),
    WEB.val.body("z").isFloat(),
    WEB.val.body("heading").isFloat(),
  ],
  async (request, response) => {
    const { model, x, y, z, heading } = request.body;

    const res = await DB.query("INSERT INTO vehicle(model, x, y, z, heading) VALUES (?, ?, ?, ?, ?)",
      model, x, y, z, heading,
    );

    if (!WEB.affected(res))
      return WEB.nothingUpdated(response);

    return response.send(res);
  }
);
