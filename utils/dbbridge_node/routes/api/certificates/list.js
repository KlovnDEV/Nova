WEB.route(
  "/api/certificates/list",
  [
  ],
  async (request, response) => {
    const res = await DB.query(`SELECT * FROM certificates`);

    response.send(res);
  }
);
