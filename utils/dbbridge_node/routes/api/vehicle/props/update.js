WEB.route(
  "/api/vehicle/props/update",
  [
    WEB.val.body("vehicle").isInt(),
    WEB.val.body("props").isString(),
  ],
  async (request, response) => {
    const { vehicle, props } = request.body;

    DB.query("REPLACE INTO vehicle_props (vehicle, value) VALUES (?,?)",
      vehicle, props
    );

    return response.send({});
  }
);
