import { useEffect } from 'react';

type IClientQueryHandler = { (category: string, query: string, args: AnyObject): void };

function useClientQuery(handler: IClientQueryHandler): void {
  const upperHandler = (event: AnyObject): void => {
    const { data } = event;

    if (!data.query) return;
    const queryParts = data.query.split('/');
    if (queryParts.length === 0) return;

    const category = queryParts[0];

    queryParts.shift();

    handler(category, queryParts.join('/'), data);
  };

  useEffect(() => {
    window.addEventListener('message', upperHandler);

    return () => {
      window.removeEventListener('message', upperHandler);
    };
  }, []);
}

export default useClientQuery;
