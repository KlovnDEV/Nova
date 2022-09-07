WEB.route(
  "/api/identity/delete",
  [
    WEB.val.body("identifier").isString()
  ],
  async (request, response) => {
    const { identifier } = request.body;
    const res = await DB.query(
      `DELETE FROM user_identity WHERE identifier = ?`,
      identifier
    );

    response.send(res);
  }
);
