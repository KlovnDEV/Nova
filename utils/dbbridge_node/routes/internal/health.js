WEB.route(
  "/internal/health",
  [
    //  WEB.val.body('username').isEmail(),
  ],
  async (request, response) => {
    response.send("");
  }
);
