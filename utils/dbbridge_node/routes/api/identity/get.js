WEB.route(
  "/api/identity/get",
  [
    WEB.val.body("identifier").isString()
  ],
  async (request, response) => {
    const { identifier } = request.body;
    const res = await DB.query(
      `SELECT * FROM user_identity WHERE identifier = ? LIMIT 1`,
      identifier
    );

    response.send(res);
  }
);
