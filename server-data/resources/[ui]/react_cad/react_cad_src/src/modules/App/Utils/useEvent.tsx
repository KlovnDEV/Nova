import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { startDevSession } from 'utils/config.dev';
import { MainStore } from 'storage/MainStore';
import { info, warn, error, success, EventHandler } from 'utils';

export const useEvent = (): void => {
  const history = useHistory();

  return useEffect(() => {
    EventHandler(data => {
      if (data.showMenu !== undefined) {
        if (data.showMenu === true) {
          MainStore.shown = true;

          if (data.homepage) {
            MainStore.Homepage = data.homepage;
            history.push(data.homepage);
          }
          if (data.permissions) {
            MainStore.permissions = data.permissions;
          }

          if (data.tax) {
            MainStore.tax = data.tax;
          }
        } else {
          history.push('/', {});
          MainStore.shown = false;
        }
      }

      if (data.showMessage) {
        const msgType = data.type;
        if (msgType === 'error') error(data.text, data.timeout);
        else if (msgType === 'warn') warn(data.text, data.timeout);
        else if (msgType === 'success') success(data.text, data.timeout);
        else info(data.text, data.timeout);
      }
    });

    if (DEVELOPMENT) {
      startDevSession();
      history.push('/police');
    }
  }, [history]);
};

export default useEvent;
