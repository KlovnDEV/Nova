WEB.route(
  "/api/phone/contacts/create",
  [
    WEB.val.body("sim_number").isString(),
    WEB.val.body("url").isString(),
    WEB.val.body("location").optional().isString(),
    WEB.val.body("author").optional().isString(),
  ],
  async (request, response) => {

    const { sim_number, url, location, author } = request.body;
    const res = await DB.query(
      `INSERT INTO react_phone_gallery(sim_number, url, location, author) VALUES (?, ?, ?, ?)`,
      sim_number, url, location, author
    );

    response.send(res);
  }
);
