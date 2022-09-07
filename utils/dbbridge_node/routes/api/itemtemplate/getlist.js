WEB.route(
  "/api/itemtemplate/getlist",
  [],
  async (request, response) => {
    const res = await DB.query(
      `SELECT * FROM item_template`
    );

    response.send(res);
  }
);
