WEB.route(
  "/api/users/join",
  [
    WEB.val.body("identifier").isString(),
  ],
  async (request, response) => {
    const { identifier } = request.body;
    const res = await DB.query(`UPDATE users SET connected = TRUE WHERE identifier = ? LIMIT 1`, identifier);

    response.send(res);
  }
);
