import React from 'react';
import { observer } from 'mobx-react';
// components
import { InputField, Button, Icon } from 'libs/UI';
// types
import { UIInputField } from 'libs/UI/@types';
// styles
import s from './index.local.scss';
import v from '~m/Skinchanger/Views/index.local.scss';
// State
import Storage from '~m/Skinchanger/Storage';

interface IRenderProps extends UIInputField {
  State: AnyObject;
  label: string;
}

const RenderField = observer(
  ({ name, label, type, onChange, onBlur, State }: IRenderProps): JSX.Element => (
    <InputField
      name={name}
      labelText={label}
      type={type}
      onChange={e => onChange(e)}
      onBlur={onBlur ? e => onBlur(e) : null}
      value={State[name]}
    />
  ),
);

interface IRenderButton {
  icon: string;
  value: number;
  setter: { (target: number | string, value: number | string): void };
  getter: { (target: number | string): number | string };
}

const RenderButton = observer(
  ({ icon, setter, value, getter }: IRenderButton): JSX.Element => (
    <Button
      variant="rounded"
      onClick={() => {
        setter('sex', value);
        getter('sex');
      }}
      active={getter('sex') === value}
    >
      <Icon name={icon} fill="#fff" />
    </Button>
  ),
);

const Register = (): JSX.Element => {
  const { validateInitials, validateAge, setSkinMap, getSkinMap } = Storage;

  return (
    <div className={v.Wrapper}>
      <div className={v.Column}>
        <RenderField
          type="text"
          name="name"
          State={Storage}
          label="Имя"
          onChange={validateInitials}
        />
        <RenderField
          type="text"
          name="lastname"
          State={Storage}
          label="Фамилия"
          onChange={validateInitials}
        />
        <div className={s.AgeSex}>
          <RenderField
            type="number"
            name="age"
            State={Storage}
            label="Возраст"
            onChange={e => {
              Storage.age = e.target.value;
            }}
            onBlur={e => validateAge(e)}
          />
          <RenderButton icon="mars" setter={setSkinMap} value={0} getter={getSkinMap} />
          <RenderButton icon="venus" setter={setSkinMap} value={1} getter={getSkinMap} />
        </div>
      </div>
    </div>
  );
};

export { Register };
export default Register;
