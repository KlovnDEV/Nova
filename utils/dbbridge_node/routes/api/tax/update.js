WEB.route(
  "/api/tax/update",
  [
    WEB.val.body("name").isString(),
    WEB.val.body("amount").isFloat()
  ],
  async (request, response) => {
    const { name, amount } = request.body;
    const res = await DB.query(
      `UPDATE tax SET amount = ? WHERE name = ?`,
      amount,
      name
    );

    if (!WEB.affected(res))
      return WEB.nothingUpdated(response);

    response.send(res);
  }
);
