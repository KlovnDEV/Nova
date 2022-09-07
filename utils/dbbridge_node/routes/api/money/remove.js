WEB.route(
  "/api/money/remove",
  [
    WEB.val.body("name").isString(),
    WEB.val.body("identifier").isString(),
    WEB.val.body("amount").isInt(),
  ],
  async (request, response) => {
    const { name, amount, identifier } = request.body;
    const res = await DB.query(
      `
        UPDATE money SET amount = amount - ? WHERE name = ? AND identifier = ? AND amount - ? >= 0
      `,
      amount,
      name,
      identifier,
      amount,
    );

    response.send(res);
  }
);
