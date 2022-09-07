WEB.route(
    "/api/tax/getbyname",
    [
      WEB.val.body("name").isString(),
    ],
    async (request, response) => {
      const { name } = request.body;
      const res = await DB.query(
        `SELECT * FROM tax WHERE name = ?`, name
      );
  
      response.send(res);
    }
  );
  