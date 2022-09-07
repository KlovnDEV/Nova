WEB.route(
  "/api/phone/messages/getlast",
  [
    WEB.val.body("phoneNumber").isString(),
  ],
  async (request, response) => {
    const { phoneNumber } = request.body;
    const res = await DB.query(
      // `SELECT * FROM react_phone_messages WHERE sim_number = ? or from_number = ? GROUP BY sim_number`,
      `SELECT
        m.*
      FROM
        (SELECT
          from_number, MAX(created) as max_created
          FROM react_phone_messages as c
          WHERE sim_number = ? OR from_number = ?
          GROUP BY from_number ORDER BY max_created DESC) as a,
      react_phone_messages m
      WHERE m.from_number = a.from_number AND m.created = a.max_created`,
      phoneNumber,
      phoneNumber,
    );

    res.forEach((e) => {
      //e.created = Date.parse(e.created);
      e.phone = e.from_number;
      e.date = Date.parse(e.created);
      e.text = e.message;
    })
    //console.log(res);

    response.send(res);
  }
);
