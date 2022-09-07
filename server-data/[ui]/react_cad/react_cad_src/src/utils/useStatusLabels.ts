import { useState, useEffect } from 'react';
import { getPersonStatusLables } from 'utils/Utils';

const useStatusLabels = (
  orgName: string,
  isArray = false,
  current = 0,
): Array<AnyObject> | AnyObject => {
  if (!isArray) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [status, setStatus] = useState({});

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const generateLabels = async () => {
        const labels = getPersonStatusLables(orgName, current).reduce((dict, item) => {
          // eslint-disable-next-line no-param-reassign
          dict[item.value] = item.label;
          return dict;
        }, {});
        setStatus(labels);
      };
      generateLabels();
    }, [current, orgName]);

    return status;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [status, setStatus] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setStatus(getPersonStatusLables());
  }, []);

  return status;
};

export { useStatusLabels };
export default useStatusLabels;
