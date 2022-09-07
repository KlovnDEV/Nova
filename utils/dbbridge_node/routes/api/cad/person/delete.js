WEB.route('/api/cad/person/delete', [WEB.val.body('id').isString()], async (request, response) => {
  const { id } = request.body;

  const res = await DB.query(`DELETE FROM cad_persons WHERE id=?`, id);

  response.send(res);
});
