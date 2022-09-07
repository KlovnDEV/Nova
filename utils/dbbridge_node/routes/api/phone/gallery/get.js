WEB.route(
  "/api/phone/gallery/get",
  [
    WEB.val.body("sim_number").isString(),
  ],
  async (request, response) => {
    const { sim_number } = request.body;

    const res = await DB.query(
      `SELECT * FROM react_phone_gallery WHERE sim_number = ? ORDER BY timestamp DESC`,
      sim_number
    );

    response.send(res);
  }
);
