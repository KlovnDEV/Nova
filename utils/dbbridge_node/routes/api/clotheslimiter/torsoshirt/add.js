WEB.route(
  "/api/clotheslimiter/torsoshirt/add",
  [
    WEB.val.body("sex").isInt(),
    WEB.val.body("torso").isInt(),
    WEB.val.body("shirt").isInt(),
  ],
  async (request, response) => {
    const { sex, torso, shirt } = request.body;

    const res = await DB.query(
      `INSERT INTO clotheslimiter_torsoshirt
      (sex, torso, shirt)
      VALUES (?, ?, ?)`,
      sex,torso,shirt,
    );

    response.send(res);
  }
);
