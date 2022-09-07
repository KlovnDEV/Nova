WEB.route(
  "/api/shop/items/delete",
  [
    WEB.val.body("id").isInt(),
  ],
  async (request, response) => {
    const { id } = request.body;

    const res = await DB.query(
      "DELETE FROM shop_items WHERE id=?",
      id,
    );

    if (!WEB.affected(res))
      return WEB.nothingUpdated(response);

    return response.send(res);
  }
);
