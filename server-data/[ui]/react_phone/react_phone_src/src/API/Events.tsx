import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { startDevSession } from '~u/Dev';
import ContactStore from '~s/storage/ContactStore';
import useClientQuery from 'utils/useClientQuery';

const Events = (): JSX.Element => {
  const history = useHistory();

  useClientQuery((category: string, query: string, args: AnyObject) => {
    // console.log('useClientQuery', category, query, args);
    if (category === 'number') {
      switch (query) {
        case 'set':
          ContactStore.setPhoneNumber(args.phone);
          break;

        default:
          throw new Error(`Unknown number query! Query: ${query}`);
      }
    }
  });

  useEffect(() => {
    if (DEVELOPMENT) {
      startDevSession();
    }
  }, []);

  return null;
};

export default Events;
