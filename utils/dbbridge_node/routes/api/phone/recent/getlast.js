WEB.route(
  "/api/phone/recent/getlast",
  [
    WEB.val.body("sim_number").isString(),
  ],
  async (request, response) => {
    const { sim_number } = request.body;
    const res = await DB.query(
      `SELECT * FROM react_phone_recent WHERE sim_number = ? or from_number = ? ORDER BY last_call DESC LIMIT 100`,
      sim_number,
      sim_number,
    );

    response.send(res);
  }
);
