import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
// components
import { Button, LineProgress } from 'libs/UI';
// utils
import API from 'API';
// storage
import Storage from 'modules/Craft/Storage';
import AppStorage from 'modules/App/Storage';
// styles;
import { toJS } from 'mobx';
import s from './index.local.scss';

const TasksBlock = observer((): JSX.Element => {
  const { Tasks } = Storage;

  const [, setTimer] = useState(0);

  const onTaskClick = task => {
    API.query('craft/tasks/delete', {
      id: task.id,
      category: Storage.CraftInventory.category,
      identifier: Storage.CraftInventory.identifier,
    }).then(() => {
      Storage.fetchTasks();
    });
  };

  const Tip = 'Нажмите, чтобы удалить из очереди';

  const onShowTooltip = (e: React.SyntheticEvent) => {
    AppStorage.showTooltip({
      anchor: e.currentTarget,
      tip: {
        title: Tip,
        position: 'top',
      },
    });
  };

  const onCloseTooltip = () => {
    AppStorage.showTooltip(null);
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer(t => t + 1);
      Storage.fetchTasks();
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div className={s.Que}>
      {Tasks.map(task => {
        return (
          <div>
            <Button
              className={s.QueControl}
              variant="rect"
              onClick={() => onTaskClick(task)}
              onMouseEnter={onShowTooltip}
              onMouseLeave={onCloseTooltip}
            >
              {task.label} x{task.amount}
            </Button>
            <LineProgress
              className={s.QueProgress}
              transitionDuration="3s"
              value={task.timePassed}
              maxValue={task.timeToCraft}
              color="#00a6ff"
            />
          </div>
        );
      })}
    </div>
  );
});

export { TasksBlock };
export default TasksBlock;
