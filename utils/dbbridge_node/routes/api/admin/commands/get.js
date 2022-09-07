WEB.route(
  '/api/admin/commands/get',
  [
    WEB.val.body('id').optional().isInt(),
    WEB.val.body('pending').optional().isBoolean(),
  ],
  async (request, response) => {
    const { id, pending } = request.body;

    let query = "SELECT * FROM admin_commands";
    let params = [];

    if (id) {
      query += " WHERE id = ?"
      params.push(id);
    }

    if (pending) {
      query += (params.length > 0 ? " AND" : " WHERE") + " result is NULL AND started = FALSE";
    }

    const res = await DB.query(
      query, ...params
    );

    return response.send(res);
  },
);
