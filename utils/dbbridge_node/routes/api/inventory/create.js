WEB.route(
  "/api/inventory/create",
  [
    WEB.val.body("category").isString(),
    WEB.val.body("identifier").isString(),
    WEB.val.body("title").isString(),
    WEB.val.body("current_weight").optional().isFloat(),
    WEB.val.body("max_weight").optional().isFloat(),
    WEB.val.body("width").optional().isInt(),
    WEB.val.body("height").optional().isInt(),
    WEB.val.body("auto_stack").optional().isBoolean(),
    WEB.val.body("single_item").optional().isBoolean(),
    WEB.val.body("action_group").optional().isString(),
    WEB.val.body("areas").optional().isString(),
  ],
  async (request, response) => {
    const { category, identifier, title, current_weight,
            max_weight, width, height, auto_stack,
            single_item, action_group, areas } = request.body;
    const res = await DB.query(
        `INSERT INTO inventory
          (category, identifier, title, current_weight, max_weight, width, height, auto_stack, single_item, action_group, areas)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        category, identifier, title || "", current_weight || 0,
        max_weight || 0, width || 10, height || 10,
        auto_stack || false, single_item || false, action_group || "default",
        areas || "{}"
      );

    response.send({ id: res.insertId });
  }
);
