WEB.route(
  "/api/phone/contacts/get",
  [
    WEB.val.body("sim_number").isString(),
  ],
  async (request, response) => {
    const { sim_number } = request.body;

    const res = await DB.query(
      `SELECT * FROM react_phone_contacts WHERE sim_number = ?`,
      sim_number
    );

    response.send(res);
  }
);
