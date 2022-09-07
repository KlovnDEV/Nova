/* eslint-disable @typescript-eslint/no-var-requires */
// core
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// components
import styles from './index.local.scss';
import { Box } from 'libs/UI';
import { Page, BottomBar } from 'views/components';
// ui
// styles

function BankLoader(): JSX.Element {
  const history = useHistory();
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let timer;

    const timerStep = () => {
      timer = setTimeout(() => {
        setLoadingProgress(progress => {
          if (progress >= 100) {
            clearTimeout(timer);
            history.replace('/apps/bank');
          } else {
            timerStep();
          }
          return progress + Math.random() * 20;
        });
      }, 250 + Math.random() * 250);
    };

    timerStep();

    return () => clearTimeout(timer);
  }, []);

  return (
    <Page
      className={styles.loader}
      backgroundBlur
      statusBar="dark"
      bottomBar={<BottomBar variant="dark" />}
    >
      <Box flex="column center" className={styles.loaderBox}>
        <img src="./img/loader-logo.png" alt="" />

        <div className={styles.loaderBar}>
          <div className={styles.loaderBarProgress} style={{ width: `${loadingProgress}%` }} />
        </div>
      </Box>
    </Page>
  );
}

export default BankLoader;
