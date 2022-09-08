onNet('headtrack:update', function (x, y, z) {
  TriggerClientEvent('headtrack:update', -1, source, x, y, z);
});
