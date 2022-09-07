WEB.route(
  "/api/users/summary",
  [
    WEB.val.body("connected").optional().isBoolean(),
  ],
  async (request, response) => {

    const { connected } = request.body;

    let query = `
      SELECT
        u.identifier,
        u.connected,
        i.firstname,
        i.lastname,
        i.sex,
        i.age,
        i.height
      FROM
        users u,
        user_identity i
      WHERE
        i.identifier = u.identifier
      `;

      if (connected) {
      query += " AND u.connected = TRUE";
    }

    const res = await DB.query(
      query,
    );

    response.send(res);
  }
);
