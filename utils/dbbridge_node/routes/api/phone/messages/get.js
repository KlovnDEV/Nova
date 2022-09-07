WEB.route(
  "/api/phone/messages/get",
  [
    WEB.val.body("number1").isString(),
    WEB.val.body("number2").isString(),
  ],
  async (request, response) => {
    const { number1, number2 } = request.body;
    const res = await DB.query(
      `SELECT * FROM react_phone_messages WHERE (sim_number = ? and from_number = ?) OR (sim_number = ? and from_number = ?)`,
      number1,
      number2,
      number2,
      number1
    );

    res.forEach((e) => {
      e.phone = e.from_number;
      e.date = Date.parse(e.created);
      e.text = e.message;
    });

    response.send(res);
  }
);
