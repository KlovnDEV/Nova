import { wrapInAPIResponse } from 'utils';
import APIMock from '../APIMock';

const passthrough =
  name =>
  (args: AnyObject, mock: APIMock): Promise<APIResponse> =>
    mock.dbPost(name, args);

APIMock.registerCommands({
  'menu/click-background': () => Promise.resolve({ status: 200 }),
});
