WEB.route(
  "/api/phone/number/get",
  [
    WEB.val.body("identifier").isString(),
  ],
  async (request, response) => {
    const { identifier } = request.body;
    const res = await DB.query(
      `SELECT users.phone_number FROM users WHERE users.identifier = ? LIMIT 1`,
      identifier
    );

    response.send(res[0]);
  }
);
