WEB.route(
  "/api/tax/create",
  [
    WEB.val.body("name").isString(),
    WEB.val.body("label").isString(),
    WEB.val.body("amount").isFloat(),
    WEB.val.body("description").isString(),
  ],
  async (request, response) => {
    const { name, label, amount, description } = request.body;
    const res = await DB.query(
      `INSERT INTO tax(name, label, amount, description) VALUES (?, ?, ?, ?)`,
      name, label, amount, description
    );

    response.send(res);
  }
);
