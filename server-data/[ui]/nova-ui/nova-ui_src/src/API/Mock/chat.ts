import { wrapInAPIResponse } from 'utils';
import APIMock from '../APIMock';
import ChatStore from '~m/Chat/Storage';

const getChatColor = (chat: string) => {
  switch (chat) {
    case '/me':
      return [255, 228, 100];
    case '/ooc':
      return [150, 200, 255];
    case '/report':
      return [225, 60, 60];
    default:
      return [255, 255, 255];
  }
};

const chatResult = (args: { message: string; canceled?: boolean }): Promise<APIResponse> => {
  const { message, canceled } = args;

  if (!canceled) {
    const event = new CustomEvent('message');
    Object.assign(event, {
      data: {
        query: 'chat/message',
        message: {
          args: [message],
          color: getChatColor(ChatStore.activeChat),
        },
      },
    });
    window.dispatchEvent(event);
  }

  return wrapInAPIResponse({ value: 'ok', status: 200 });
};

const clear = (): Promise<APIResponse> => {
  const event = new CustomEvent('message');
  Object.assign(event, {
    data: {
      query: 'chat/clear',
    },
  });
  window.dispatchEvent(event);

  return wrapInAPIResponse({ value: 'ok', status: 200 });
};

APIMock.registerCommands({
  'chat/result': chatResult,
  'chat/clear': clear,
});
