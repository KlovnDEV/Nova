WEB.route(
    "/api/inventory/delete",
    [
      WEB.val.body("category"),
      WEB.val.body("identifier"),
    ],
    async (request, response) => {
      const { category, identifier } = request.body;

      res = await DB.query("DELETE FROM inventory WHERE category = ? AND identifier = ?", category, identifier);
      if (!WEB.affected(res)) WEB.nothingUpdated(response);

      return response.send(res);
    }
  );
