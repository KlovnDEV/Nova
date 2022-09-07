WEB.route(
  "/api/users/drop",
  [
    WEB.val.body("identifier").optional().isString(),
  ],
  async (request, response) => {
    const { identifier } = request.body;

    if (!identifier) {
      response.send(await DB.query(`UPDATE users SET connected = FALSE`));
    } else {
      const res = await DB.query(`UPDATE users SET connected = FALSE WHERE identifier = ? LIMIT 1`, identifier);
      response.send(res);
    }
  }
);
