WEB.route(
  "/api/cad/violations/list",
  [
    WEB.val.body("recordId").optional().isInt(),
    WEB.val.body("firstname").isString(),
    WEB.val.body("lastname").isString(),
  ],
  async (request, response) => {
    const { firstname, lastname, recordId } = request.body;

    const query = `
      SELECT
        V.*,
        L.label,
        L.category,
        R.date
      FROM
        cad_violations as V,
        cad_laws as L,
        cad_records as R
      WHERE
        L.id = V.lawId
        AND V.recordId = R.id
        AND V.firstname = ?
        AND V.lastname = ?
    `;
    const queryArgs = [ firstname, lastname ];

    if (recordId) {
      query += " AND V.recordId = ?";
      queryArgs.push(recordId);
    }

    const res = await DB.query(query, ...queryArgs);

    response.send(res);
  }
);
