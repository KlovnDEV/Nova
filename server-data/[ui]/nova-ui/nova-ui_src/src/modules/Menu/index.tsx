import React, { useEffect, useState } from 'react';
// components
import { Button, Icon } from 'libs/UI';
import { observer } from 'mobx-react';
import API from 'API';
import s from './index.local.scss';
import Storage from './Storage';
import { IButton } from './types';

const Menu = observer(
  (): JSX.Element => {
    const { buttons, position, menuShown, name, refs } = Storage;
    const [btnTimeout, setBtnTimeout] = useState<ReturnType<typeof setTimeout>>(null);

    const updateFocus = () => {
      refs[Storage.focusedButton].current.focus();
    };

    const onBtnFocus = (btn: IButton, elem, type: 'add' | 'remove'): void => {
      updateFocus();
      if (btn.icon) {
        if (btnTimeout) clearTimeout(btnTimeout);
        const timeout = setTimeout(
          (): void => {
            if (elem) elem?.current?.classList[type](s['is-active']);
          },
          type === 'add' ? 500 : 0,
        );
        setBtnTimeout(() => {
          return timeout;
        });
      }
    };

    const menuPrev = (): void => {
      if (Storage.focusedButton > 0) Storage.focusedButton -= 1;
      else Storage.focusedButton = buttons.length - 1;
      updateFocus();

      API.query('menu/up', { menu: name });
    };

    const menuNext = (): void => {
      if (Storage.focusedButton < buttons.length - 1) Storage.focusedButton += 1;
      else Storage.focusedButton = 0;
      updateFocus();

      API.query('menu/down', { menu: name });
    };

    const menuClick = (btn): void => {
      console.log('onBtnClick', btn.value);
      API.query('menu/click', { value: btn.value, menu: name });
    };

    const onKeyDown = (event, btn: IButton): void => {
      switch (event.key) {
        case 'Backspace':
        case 'Escape':
          API.query('menu/back', { menu: name });
          break;

        case 'ArrowRight':
          API.query('menu/right', { value: btn.value, menu: name });
          break;

        case 'ArrowLeft':
          API.query('menu/left', { value: btn.value, menu: name });
          break;

        case 'ArrowDown':
        case 'Tab':
          menuNext();
          break;

        case 'ArrowUp':
          menuPrev();
          break;

        default:
      }
    };

    const onBtnClick = (btn: IButton): void => {
      menuClick(btn);
    };

    useEffect(() => {
      const ref = refs[Storage.focusedButton];

      if (ref && ref.current) {
        ref.current.focus();
      }

      if (!menuShown && btnTimeout) {
        setBtnTimeout(() => {
          clearTimeout(btnTimeout);
          return null;
        });
      }
    }, [btnTimeout, menuShown, refs]);

    if (!menuShown) return null;

    return (
      <div role="presentation" className={s.Wrapper} style={{ opacity: menuShown ? 1 : 0 }}>
        <nav
          className={s.Menu}
          style={{
            gridArea: position,
            direction: position.includes('l') ? 'ltr' : 'rtl',
          }}
        >
          {buttons.map((btn, i) => (
            <Button
              onFocus={() => onBtnFocus(btn, refs[i], 'add')}
              onBlur={() => onBtnFocus(btn, refs[i], 'remove')}
              onClick={() => onBtnClick(btn)}
              onKeyDown={e => onKeyDown(e, btn)}
              innerRef={refs[i]}
              key={`${btn.label}/${btn.value}`}
              variant="rect"
              className={[
                s.Button,
                btn.icon ? null : s['is-active'],
                position.includes('l') && s.SlideLeft,
                position.includes('r') && s.SlideRight,
                position.includes('c') && s.SlideDown,
              ]}
              style={{
                animationDelay: `${(i + 1) * 60}ms`,
              }}
            >
              {btn.icon && <Icon className={s.Icon} name={btn.icon} fill="#fff" />}
              <span className={s.Label}>{btn.label}</span>
            </Button>
          ))}
        </nav>
      </div>
    );
  },
);

export { Menu };
export default Menu;
