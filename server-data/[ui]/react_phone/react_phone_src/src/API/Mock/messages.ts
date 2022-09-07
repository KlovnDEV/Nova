import APIMock from '../APIMock';

const passthrough = name => (args: AnyObject, mock: APIMock): Promise<APIResponse> =>
  mock.dbPost(name, args);

APIMock.registerCommands({
  'phone/messages/get': passthrough('phone/messages/get'),
  'phone/messages/create': passthrough('phone/messages/create'),
  // inventory_close: passthrough('inventory_close'),
  // inventory_item_drop: passthrough('inventory_item_drop'),
  // inventory_item_move: (_args: AnyObject, _mock: APIMock): Promise<APIResponse> =>
  //   (async (): Promise<APIResponse> => {
  //     return { data: true, status: 200 };
  //   })(),
  // inventory_action_do: passthrough('inventory_action_do'),
});
