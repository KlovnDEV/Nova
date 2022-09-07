WEB.route(
  "/api/phone/recent/get",
  [
    WEB.val.body("sim_number").isString(),
    WEB.val.body("from_number").isString(),
  ],
  async (request, response) => {
    const { sim_number, from_number } = request.body;
    const res = await DB.query(
      `SELECT * FROM react_phone_recent WHERE (sim_number = ? and from_number = ?) or (sim_number = ? and from_number = ?) ORDER BY last_call DESC LIMIT 100`,
      sim_number,
      from_number,
      from_number,
      sim_number,
    );

    response.send(res);
  }
);
