WEB.route(
  '/api/stats/player/get',
  [
    WEB.val.body('identifier').isString(),
    WEB.val.body('last').optional().isBoolean(),
  ],
  async (request, response) => {
    const { identifier, last } = request.body;

    let query = "SELECT * FROM stats_player WHERE identifier = ?";

    if (last) {
      query += " ORDER BY time DESC LIMIT 10";
    }

    const res = await DB.query(
      query,
      identifier
    );

    return response.send(res);
  },
);
