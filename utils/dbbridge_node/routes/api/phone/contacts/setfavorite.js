WEB.route(
    "/api/phone/contacts/setfavorite",
    [
      WEB.val.body("id").isInt(),
      WEB.val.body("favorite").isBoolean(),
    ],
    async (request, response) => {
      const { id, favorite } = request.body;

      const res = await DB.query(
        `UPDATE react_phone_contacts SET favorite = ? WHERE id = ?`,
        favorite, id,
      );
  
      response.send(res);
    }
  );
  