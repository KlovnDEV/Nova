WEB.route(
  "/api/property/markers/get",
  [],
  async (request, response) => {
    const res = await DB.query(
      `SELECT * FROM property_markers`,
    );

    response.send(res);
  }
);
