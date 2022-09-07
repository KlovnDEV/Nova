WEB.route(
  '/api/phone/contacts/update',
  [
    WEB.val.body('id').isInt(),
    WEB.val.body('name').optional().isString(),
    WEB.val.body('phone').optional().isString(),
    WEB.val.body('avatar').optional().isString(),
    WEB.val.body("favorite").optional().isBoolean(),
  ],
  async (request, response) => {
    const { id } = request.body;

    let paramKeys = [];
    let paramValues = [];

    Object.entries(request.body).forEach(([key, val]) => {
      if (key === 'id') return;

      if (val !== undefined) {
        paramKeys.push(`${key} = ?`);
        paramValues.push(val);
      }
    })

    const res = await DB.query(
      `UPDATE react_phone_contacts SET ${paramKeys.join(', ')} WHERE id = ?`,
      ...paramValues,
      id,
    );

    response.send(res);
  },
);
