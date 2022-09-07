WEB.route(
  "/api/vehicle/props/get",
  [
    WEB.val.body("vehicle").isInt(),
  ],
  async (request, response) => {
    const { vehicle } = request.body;
    const res = await DB.query(
        `SELECT value FROM vehicle_props WHERE vehicle = ? LIMIT 1`,
        vehicle,
      );

    response.send(res);

  }
);
