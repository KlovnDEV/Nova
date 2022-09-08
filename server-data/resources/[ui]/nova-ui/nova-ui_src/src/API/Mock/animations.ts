import { wrapInAPIResponse } from 'utils';
import APIMock from '../APIMock';

const start = (args: { value: string }): Promise<APIResponse> => {
  const { value } = args;

  console.log('requested anim', value);

  return wrapInAPIResponse({ value: 'ok', status: 200 });
};

const favorite = (args: { value: string; label: string }): Promise<APIResponse> => {
  const { value, label } = args;

  console.log('faved anim', label, 'by action:', value);

  return wrapInAPIResponse({ value: 'ok', status: 200 });
};

APIMock.registerCommands({
  'animations/start': start,
  'animations/favorite': favorite,
});
