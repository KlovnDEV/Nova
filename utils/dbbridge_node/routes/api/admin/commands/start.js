WEB.route(
  '/api/admin/commands/start',
  [
    WEB.val.body('id').optional().isInt(),
  ],
  async (request, response) => {
    const { id } = request.body;

    let query = "UPDATE admin_commands SET started = TRUE WHERE id = ?";

    const res = await DB.query(query, id);
    return response.send(res);
  },
);
