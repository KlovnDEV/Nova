WEB.route(
  "/api/phone/number/set",
  [
    WEB.val.body("identifier").isString(),
    WEB.val.body("number").isString().optional(),
  ],
  async (request, response) => {
    const { identifier, number } = request.body;
    const res = await DB.query(
      `USERS users SET phone_number = ? WHERE users.identifier = ? LIMIT 1`,
      identifier, number || null
    );

    response.send(res[0]);
  }
);
