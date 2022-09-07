WEB.route(
  "/api/phone/contacts/create",
  [
    WEB.val.body("sim_number").isString(),
    WEB.val.body("name").isString(),
    WEB.val.body("avatar").isString(),
    WEB.val.body("phone").isString(),
    WEB.val.body("favorite").optional().isBoolean(),
  ],
  async (request, response) => {

    const { sim_number, name, avatar, phone, favorite } = request.body;
    const res = await DB.query(
      `INSERT INTO react_phone_contacts(sim_number, name, avatar, phone, favorite) VALUES (?, ?, ?, ?, ?)`,
      sim_number,
      name,
      avatar,
      phone,
      favorite || false
    );

    response.send(res);
  }
);
