WEB.route(
    "/api/roles/delete",
    [
      WEB.val.body("identifier").optional(),
      WEB.val.body("role").optional()
    ],
    async (request, response) => {
      const { identifier, role } = request.body;

      res = await DB.query("DELETE FROM user_roles WHERE identifier = ? AND role = ?", identifier, role);
      if (!WEB.affected(res)) return WEB.nothingUpdated(response);

      return response.send(res);
    }
  );
