WEB.route(
  "/api/roles/update",
  [
    WEB.val.body("identifier").isString(),
    WEB.val.body("role").isString(),
    WEB.val.body("grade").isInt(),
  ],
  async (request, response) => {
    const { identifier, role, grade } = request.body;

    // FIXME: SRP & DRY violation
    if (grade < 0) {
        const res = await DB.query("DELETE FROM user_roles WHERE identifier = ? AND role = ?", identifier, role);
        if (!WEB.affected(res)) return WEB.nothingUpdated(response);
        return response.send(res);
    }

    const res = await DB.query(
      "INSERT INTO user_roles (identifier, role, grade) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE grade=?",
      identifier,
      role,
      grade,
      grade
    );

    if (!WEB.affected(res))
      return WEB.nothingUpdated(response);

    return response.send(res);
  }
);
