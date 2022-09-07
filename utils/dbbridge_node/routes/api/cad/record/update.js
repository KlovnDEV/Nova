WEB.route(
  "/api/cad/record/update",
  [
    WEB.val.body("id").isInt(),
    WEB.val.body("data"),
  ],
  async (request, response) => {
    const { id, data} = request.body;

    const res = await DB.query(
      `UPDATE
            cad_records
          SET
            isArchived = ?,
            title = ?,
            category = ?,
            description = ?,
            responsible = ?,
            media = ?
          WHERE
            id = ?`,
      data.isArchived,
      data.title,
      data.category,
      data.description,
      data.responsible,
      JSON.stringify(data.media),
      id,
    );

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
      await DB.query(`DELETE FROM cad_violations WHERE recordId = ?`, id);
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
