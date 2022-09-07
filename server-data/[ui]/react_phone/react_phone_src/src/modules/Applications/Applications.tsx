// core
import React from 'react';
import { useHistory } from 'react-router-dom';
// ui
import { Box } from 'libs/UI';
// components
import { AppButton, Page, BottomBar } from 'views/components';
// utils
import { useFocusMap } from 'utils/FocusMap';
// storage
import PhoneConfig from 'storage/PhoneConfig';
// style
import './Applications.scss';

export function Applications(): JSX.Element {
  const history = useHistory();
  const [focusState] = useFocusMap('0');

  return (
    <Page
      className="applications__screen"
      backgroundBlur
      statusBar
      bottomBar={<BottomBar />}
      pageLayoutRef={focusState.ref}
      onKeyDown={e => focusState?.onKeyDown(e)}
    >
      <Box flex="left" className="applications__screen_grid">
        {PhoneConfig.appsAvailable.map((elem, index) => {
          return (
            <div key={elem.link}>
              <AppButton
                icon={elem.icon}
                label={elem.label}
                tabIndex={index}
                focus={{ name: index, right: index + 1, left: index - 1 }}
                onClick={() => {
                  history.push(elem.link);
                }}
              />
            </div>
          );
        })}
      </Box>
    </Page>
  );
}

export default Applications;
