WEB.route(
  '/api/stats/player/set',
  [
    WEB.val.body('identifier').isString(),
    WEB.val.body('coords').isArray(),
    WEB.val.body('status').isString(),
  ],
  async (request, response) => {
    const { identifier, coords, status } = request.body;


    const res = await DB.query(
      "INSERT INTO stats_player (identifier, x, y, status) VALUES(?,?,?,?)",
      identifier, coords[0], coords[1], status
    );

    if (!WEB.affected(res))
      return WEB.nothingUpdated(response);

    return response.send(res);
  },
);
