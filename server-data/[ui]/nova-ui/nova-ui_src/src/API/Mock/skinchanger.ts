import { wrapInAPIResponse } from 'utils';
import APIMock from '../APIMock';

const passthrough =
  name =>
  (args: AnyObject, mock: APIMock): Promise<APIResponse> =>
    mock.dbPost(name, args);

const setPage = (args: { name: string }): Promise<APIResponse> => {
  const { name } = args;

  if (name) {
    const event = new CustomEvent('message');
    Object.assign(event, {
      data: {
        query: 'chat/message',
        page: name,
      },
    });
    window.dispatchEvent(event);
  }

  return wrapInAPIResponse({ value: 'ok', status: 200 });
};

APIMock.registerCommands({
  'skin/update': passthrough('skin/update'),
  'skin/page/set': setPage,
});
