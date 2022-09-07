import { wrapInAPIResponse } from 'utils';
import APIMock from '../APIMock';

const visible = (): Promise<APIResponse> => {
  return wrapInAPIResponse({ value: 'ok', status: 200 });
};

APIMock.registerCommands({
  'ui/visible': visible,
});
