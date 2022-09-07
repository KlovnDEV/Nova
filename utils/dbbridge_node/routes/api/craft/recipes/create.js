WEB.route(
    "/api/craft/recipes/create", [
        WEB.val.body("label").isString(),
        WEB.val.body("icon").isString(),
        WEB.val.body("category").isString(),
        WEB.val.body("level").isInt(),
        WEB.val.body("output").isString(),
    ],
    async(request, response) => {
        const { label, icon, category, level, output, description } = request.body;
        const res = await DB.query(
            `INSERT INTO craft_recipes
          (label, icon, category, level, output)
        VALUES (?, ?, ?, ?, ?)`,
            label, icon, category, level, output
        );

        response.send(res);
    }
);
