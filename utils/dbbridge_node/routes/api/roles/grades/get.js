WEB.route(
  "/api/roles/grades/get",
  [
    WEB.val.body("role").isString(),
  ],
  async (request, response) => {
    const { role } = request.body;
    const res = await DB.query("SELECT * FROM user_roles_grades WHERE role = ?", role);

    response.send(res);
  }
);
