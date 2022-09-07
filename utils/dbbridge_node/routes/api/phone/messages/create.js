WEB.route(
  "/api/phone/messages/create",
  [
    WEB.val.body("sim_number").isString(),
    WEB.val.body("from_number").isString(),
    WEB.val.body("message").isString(),
  ],
  async (request, response) => {
    const { sim_number, from_number, message } = request.body;
    const res = await DB.query(
      `INSERT INTO react_phone_messages SET sim_number=?, from_number=?, message=?`,
      sim_number,
      from_number,
      message
    );

    response.send(res);
  }
);
