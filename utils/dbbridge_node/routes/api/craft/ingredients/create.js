WEB.route(
    "/api/craft/ingredients/create", [
        WEB.val.body("name").isString(),
        WEB.val.body("amount").isInt(),
        WEB.val.body("recipeId").isInt(),
    ],
    async(request, response) => {
        const { name, amount, recipeId } = request.body;
        const res = await DB.query(
            `INSERT INTO craft_ingredients
          (name, amount, recipeId)
        VALUES (?, ?, ?)`,
            name, amount, recipeId
        );

        response.send(res);
    }
);
