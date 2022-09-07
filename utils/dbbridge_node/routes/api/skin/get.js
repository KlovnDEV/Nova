WEB.route(
  "/api/skin/get",
  [
    WEB.val.body("identifier").isString(),
  ],
  async (request, response) => {
    const { identifier } = request.body;

    let query = "SELECT skin FROM users WHERE identifier = ?";
    const queryParams = [ identifier ];

    const res = await DB.query(query, ...queryParams);

    response.send(res);
  }
);
