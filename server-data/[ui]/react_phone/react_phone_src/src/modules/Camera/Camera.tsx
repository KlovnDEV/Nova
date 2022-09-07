// core
import React from 'react';
// UI
import { Box, FloatingButton, SvgIcon } from 'libs/UI';
// components
import { Page, BottomBar } from 'views/components';
// Utils
import { useFocusMap } from 'utils/FocusMap';
// styles
import './Camera.scss';

export function Camera(): JSX.Element {
  const [focusState] = useFocusMap('camera-button');

  return (
    <>
      <Page
        className="camera__page page__scrollbar"
        pageLayoutRef={focusState.ref}
        onKeyDown={e => focusState?.onKeyDown(e)}
        backgroundBlur
        statusBar="dark"
        bottomBar={<BottomBar variant="dark" />}
      >
        <div className="camera__finder" />
        <Box flex="center" className="camera__menu">
          <FloatingButton
            color="#777"
            focus={{ name: 'camera-button' }}
            onClick={() => {
              console.log('Camera button click');
            }}
          >
            <SvgIcon width="70%" fill="#fff" src="Camera" />
          </FloatingButton>
        </Box>
      </Page>
    </>
  );
}

export default Camera;
