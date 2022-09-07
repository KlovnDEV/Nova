WEB.route(
  "/api/cad/violations/close",
  [
    WEB.val.body("id").isInt(),
  ],
  async (request, response) => {
    const { id } = request.body;

    const res = await DB.query(
      `UPDATE
            cad_violations
          SET
            closed = 1
          WHERE
            id = ?`,
      id,
    );

    if (!WEB.affected(res))
      return WEB.nothingUpdated(response);

    response.send(res);
  }
);
