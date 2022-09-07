WEB.route(
  "/api/vehicle/getlist",
  [

  ],
  async (request, response) => {
    const res = await DB.query(
        `SELECT * FROM vehicle`,
      );

    response.send(res);
  }
);
