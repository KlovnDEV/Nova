WEB.route(
  '/api/status/set',
  [
    WEB.val.body('identifier').isString(),
    WEB.val.body('value').isString(),
  ],
  async (request, response) => {
    const { identifier, value } = request.body;

    const res = await DB.query(
      "REPLACE INTO user_status (identifier, value) VALUES(?,?)",
      identifier, value
    );

    if (!WEB.affected(res))
      return WEB.nothingUpdated(response);

    return response.send(res);
  },
);
