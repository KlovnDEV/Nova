WEB.route(
  '/api/stats/budget',
  [
    WEB.val.body('name').optional().isString(),
    WEB.val.body('identifier').optional().isString(),
    WEB.val.body('grouping').optional().isString(),
  ],
  async (request, response) => {
    const { name, identifier, grouping } = request.body;
    let res;

    let params = [];
    let where = '';

    if (identifier) {
      params = [identifier];
      where = 'AND identifier = ?';
    }

    if (grouping === 'week') {
      res = await DB.query(
        `SELECT *, YEARWEEK(timestamp) as yw FROM stats_budget WHERE ${where} GROUP BY yw ORDER BY yw`,
        ...params,
      );
    } else if (grouping === 'month') {
      res = await DB.query(
        `SELECT *, MONTH(timestamp) as yw FROM stats_budget WHERE ${where} GROUP BY yw ORDER BY yw`,
        ...params,
      );
    } else {
      res = await DB.query(`SELECT * FROM stats_budget WHERE 1 ${where}`, ...params);
    }

    response.send(res);
  },
);
