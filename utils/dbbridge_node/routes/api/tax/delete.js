WEB.route(
    "/api/tax/delete",
    [
      WEB.val.body("name").isString(),
    ],
    async (request, response) => {
      const { name } = request.body;
      const res = await DB.query(
        `DELETE FROM tax WHERE name = ?`, name
      );
  
      response.send(res);
    }
  );
  