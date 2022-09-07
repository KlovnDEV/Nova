WEB.route(
  "/api/identity/delete",
  [
    WEB.val.body("id").isInt()
  ],
  async (request, response) => {
    const { id } = request.body;
    const res = await DB.query(
      `DELETE FROM cad_participants WHERE id = ?`,
      id
    );

    response.send(res);
  }
);
