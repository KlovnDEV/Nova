WEB.route(
  "/api/cad/person/search",
  [
    WEB.val.body("firstname").optional().isString(),
    WEB.val.body("lastname").optional().isString(),
    WEB.val.body("phone").optional().isString(),
    WEB.val.body("status").optional().isInt(),
  ],
  async (request, response) => {
    const { firstname, lastname, phone, status } = request.body;

    const params = [];
    let query = `SELECT * FROM cad_persons WHERE 1`;

    if (firstname && firstname.length > 0) {
      query += ` AND firstname = ?`
      params.push(firstname);
    }
    if (lastname && lastname.length > 0) {
      query += ` AND lastname = ?`
      params.push(lastname);
    }
    if (phone && phone.length > 0) {
      query += ` AND phone = ?`
      params.push(phone);
    }
    if (status) {
      query += ` AND status = ?`
      params.push(status);
    }

    if (params.length === 0) {
      return response.sendStatus(500);
    }

    const res = await DB.query(query, ...params);

    response.send(res);
  }
);
