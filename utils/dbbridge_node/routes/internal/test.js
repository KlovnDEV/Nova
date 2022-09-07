WEB.route(
  "/internal/test",
  [
    WEB.val.query("grade").isInt({ min: -1, max: 10 }).optional()
  ],
  async (request, response) => {
    const res = await DB.query("SELECT * FROM users WHERE job_grade > ?", request.query.grade || 0);
    response.send(res);
  }
);
