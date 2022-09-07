WEB.route(
    "/api/users/getbylicense",
    [
      WEB.val.body("license").isString(),
    ],
    async (request, response) => {
      const { license } = request.body;
      const res = await DB.query(
        `SELECT * FROM users WHERE license = ? LIMIT 1`, license
      );

      response.send(res);
    }
  );
