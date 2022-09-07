WEB.route(
    "/api/tax/getlist",
    [],
    async (request, response) => {
      const res = await DB.query(`SELECT * FROM tax`);

      response.send(res);
    }
  );
  