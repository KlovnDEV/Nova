WEB.route(
  '/api/status/get',
  [
    WEB.val.body('identifier').isString(),
  ],
  async (request, response) => {
    const { identifier } = request.body;

    const res = await DB.query(
      "SELECT * FROM user_status WHERE identifier = ?",
      identifier
    );

    return response.send(res);
  },
);
