WEB.route(
  '/api/admin/commands/finish',
  [
    WEB.val.body('id').isInt(),
    WEB.val.body('result').isString(),
  ],
  async (request, response) => {
    const { result, id } = request.body;

    const res = await DB.query("UPDATE admin_commands SET result = ? WHERE id = ?",
      result, id
    );

    return response.send(res);
  },
);
