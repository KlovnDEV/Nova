WEB.route(
  "/api/cad/participants/byname",
  [
    WEB.val.body("organization").isString(),
    WEB.val.body("firstname").isString(),
    WEB.val.body("lastname").isString(),
  ],
  async (request, response) => {
    const { organization, firstname, lastname  } = request.body;

    const res = await DB.query(
      `SELECT
        r.* FROM cad_participants as p,
        cad_records as r
      WHERE
        r.organization=?
        AND p.firstname=?
        AND p.lastname=?
        AND p.recordId = r.id`,
      organization,
      firstname,
      lastname,
    );

    response.send(res);
  }
);
