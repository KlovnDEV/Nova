WEB.route(
  '/api/admin/commands/add',
  [
    WEB.val.body('cmd').optional().isString(),
  ],
  async (request, response) => {
    const { cmd } = request.body;

    let query = "INSERT INTO admin_commands (cmd) VALUES(?)";

    const res = await DB.query(
      query, cmd
    );

    return response.send(res);
  },
);
