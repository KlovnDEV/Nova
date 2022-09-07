WEB.route(
  "/api/licenses/get",
  [
    WEB.val.body("identifier").isString().optional(),
    WEB.val.body("name").isString().optional(),
  ],
  async (request, response) => {
    const { identifier, name } = request.body;

    let query = `
    SELECT
      ul.*,
      CONCAT(ui.firstname, ' ', ui.lastname) as 'name'
    FROM
      user_licenses ul,
      user_identity ui
    WHERE
      ur.identifier = ui.identifier
    `;

    const queryParams = [];

    if (identifier) {
      query += " AND ul.identifier = ?";
      queryParams.push(identifier);
    }

    if (name) {
      query += " AND ul.name = ?";
      queryParams.push(name);
    }

    const res = await DB.query(query, ...queryParams);

    response.send(res);

  }
);
