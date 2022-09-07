WEB.route(
  "/api/cad/record/create",
  [
    WEB.val.body("data"),
  ],
  async (request, response) => {
    const { data } = request.body;

    const {isArchived, organization, title, category, description, responsible, media} = data;

    const res = await DB.query(
      `INSERT INTO
        cad_records ( isArchived, organization, title, category,  description, responsible, media )
      VALUES (?,?,?,?,?,?,?)`,
      isArchived, organization, title, category, description, responsible, JSON.stringify(media),
    );

    const id = res.insertId;

    if (id < 0) return response.sendStatus(500);

    if (data.participants) {
      await DB.query(`DELETE FROM
            cad_participants
          WHERE
            recordId = ?`,
      id);

      data.participants.forEach(participant => {
        DB.query(`INSERT INTO
            cad_participants (recordId, firstname, lastname, category)
          VALUES
            (?,?,?,?)`,
        id,
        participant.firstname,
        participant.lastname,
        participant.category);
      });
    }

    if (data.violations) {
      data.violations?.forEach(async v => await DB.query(
        `INSERT INTO cad_violations
          (firstname, lastname, recordId, lawId, fineAmount, detentionAmount, closed)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        v.firstname, v.lastname, id, v.lawId, v.fineAmount, v.detentionAmount, v.closed
      ));
    }

    if (!WEB.affected(res))
      return WEB.nothingUpdated(response);

    response.send(res);
  }
);
