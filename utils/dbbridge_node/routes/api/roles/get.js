WEB.route(
  "/api/roles/get",
  [
    WEB.val.body("identifier").isString().optional(),
    WEB.val.body("role").isString().optional(),
  ],
  async (request, response) => {
    const { identifier, role } = request.body;

    let query = "SELECT ur.*, CONCAT(ui.firstname, ' ', ui.lastname) as 'name' FROM user_roles ur, user_identity ui WHERE ur.identifier = ui.identifier";
    const queryParams = [];

    if (identifier) {
      query += " AND ur.identifier = ?";
      queryParams.push(identifier);
    }

    if (role) {
      query += " AND ur.role = ?";
      queryParams.push(role);
    }

    const res = await DB.query(query, ...queryParams);

    response.send(res);

  }
);
