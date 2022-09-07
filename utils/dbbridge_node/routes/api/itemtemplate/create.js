WEB.route(
  "/api/itemtemplate/create",
  [
    WEB.val.body("name").isString(),
    WEB.val.body("label").isString(),
    WEB.val.body("description").optional().isString(),
    WEB.val.body("category").isString(),
    WEB.val.body("weight").optional().isFloat(),
    WEB.val.body("width").optional().isInt(),
    WEB.val.body("height").optional().isInt(),
    WEB.val.body("maxstack").optional().isInt(),
    WEB.val.body("extra").optional().isString(),
    WEB.val.body("prop").optional().isString(),
  ],
  async (request, response) => {
    const { name, label, description = '', category, weight = null, width = 1, height = 1, maxstack = 1, extra = '', prop = null } = request.body;
    const res = await DB.query(
        `INSERT INTO item_template
          (name, label, description, category, weight, width, height, maxstack, extra, prop)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)  ON DUPLICATE KEY UPDATE label=?, description=?, category=?, weight=?, width=?, height=?, maxstack=?, extra=?, prop=?`,
        name, label, description, category, weight, width, height, maxstack, extra, prop,
        label, description, category, weight, width, height, maxstack, extra, prop
      );

    response.send({ id: res.insertId });
  }
);
