WEB.route(
  "/api/money/set",
  [
    WEB.val.body("name").isString(),
    WEB.val.body("identifier").isString(),
    WEB.val.body("amount").isInt(),
  ],
  async (request, response) => {
    const { name, amount, identifier } = request.body;
    const res = await DB.query(
      `
        INSERT INTO
          money
          (name, identifier, amount)
        VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE amount = ?
      `,
      name,
      identifier,
      amount,
      amount
    );

    response.send(res);
  }
);
