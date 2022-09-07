WEB.route(
  "/api/clotheslimiter/torsoshirt/delete",
  [
    WEB.val.body("sex").isInt(),
    WEB.val.body("torso").isInt(),
    WEB.val.body("shirt").isInt(),
  ],
  async (request, response) => {
    const { sex, torso,shirt } = request.body;
    const res = await DB.query(
      `DELETE FROM clotheslimiter_torsoshirt WHERE sex=? AND torso=? AND shirt=?`,
      sex, torso, shirt
    );

    response.send(res);
  }
);
