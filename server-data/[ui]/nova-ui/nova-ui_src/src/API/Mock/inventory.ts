import { wrapInAPIResponse } from 'utils';
import APIMock from '../APIMock';

const passthrough =
  name =>
  (args: AnyObject, mock: APIMock): Promise<APIResponse> =>
    mock.dbPost(name, args);

APIMock.registerCommands({
  inventory_close: passthrough('inventory_close'),
  // inventory_item_drop: passthrough('inventory_item_drop'),
  inventory_item_drop: () => Promise.resolve({ status: 200 }),
  inventory_item_move: (_args: AnyObject, _mock: APIMock): Promise<APIResponse> =>
    wrapInAPIResponse({ value: true }),
  inventory_action_do: passthrough('inventory_action_do'),
});
