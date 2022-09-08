import { DB } from '@nova/engine-lib/server/DB';
import { Players } from '@nova/engine-lib/server/Game';
import { assert, Delay } from '@nova/engine-lib/shared';

export * from './Command';

setTick(async () => {
  await Delay(1000);

  const commands = (await DB.Query('admin/commands/get', { pending: true })) as any[];

  // eslint-disable-next-line guard-for-in
  for (const row of commands) {
    const params = JSON.parse(row.cmd);
    assert(params.name);

    // eslint-disable-next-line no-await-in-loop
    await DB.Query('admin/commands/start', { id: row.id });

    emit(`engine:admincmd:${params.name}`, row.id, params);
  }
});

on('engine:admincmd:setstatus', async (id, { identifier, key, value }) => {
  const player = Players.ByIdentifier(identifier);
  assert(player);

  player.core.status.set(key, value * 1.0);

  await DB.Query('admin/commands/finish', { id: id, result: '{}' });
});

on('engine:admincmd:revive', async (id, { identifier }) => {
  const player = Players.ByIdentifier(identifier);
  assert(player);

  player.revive();

  await DB.Query('admin/commands/finish', { id: id, result: '{}' });
});

on('engine:admincmd:teleport', async (id, { identifier, x, y, heading }) => {
  const player = Players.ByIdentifier(identifier);
  assert(player);

  player.teleportXY(x, y, heading);

  await DB.Query('admin/commands/finish', { id: id, result: '{}' });
});
