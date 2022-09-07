WEB.route(
  "/api/property/setowner",
  [
    WEB.val.body("id").isInt(),
    WEB.val.body("owner").optional().isString(),
    WEB.val.body("rented").optional().isBoolean(),
  ],
  async (request, response) => {
    const { id, owner, rented } = request.body;
    let res = null;

    res = await DB.query(
      `UPDATE property SET owner = ?, rented = ? WHERE id = ?`,
      owner || null,
      rented || false,
      id
    );

    response.send(res);
  }
);
