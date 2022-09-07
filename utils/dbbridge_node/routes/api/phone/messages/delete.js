WEB.route(
  "/api/phone/messages/delete",
  [
    WEB.val.body("id").isInt(),
  ],
  async (request, response) => {
    const { id } = request.body;

    const res = await DB.query(
      `DELETE FROM react_phone_messages WHERE id = ?`,
      id,
    );

    if (!WEB.affected(res)) return WEB.nothingUpdated(response);

    response.send(res);
  }
);
