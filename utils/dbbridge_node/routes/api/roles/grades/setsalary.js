WEB.route(
  "/api/roles/grades/setsalary",
  [
    WEB.val.body("role").isString(),
    WEB.val.body("grade").isInt(),
    WEB.val.body("salary").isInt(),
  ],
  async (request, response) => {
    const { role, grade, salary } = request.body;

    const res = await DB.query("UPDATE user_roles_grades SET salary = ? WHERE role = ? AND grade = ?", salary, role, grade);

    return response.send(res);
  }
);
