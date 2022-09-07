WEB.route(
  "/api/cad/record/list",
  [
    WEB.val.body("archived").isInt(),
    WEB.val.body("organization").isString(),
  ],
  async (request, response) => {
    const { archived, organization } = request.body;
    const res = await DB.query(
      `SELECT * FROM cad_records WHERE isArchived = ? AND organization = ?`,
      archived, organization
    );

    response.send(res);
  }
);
