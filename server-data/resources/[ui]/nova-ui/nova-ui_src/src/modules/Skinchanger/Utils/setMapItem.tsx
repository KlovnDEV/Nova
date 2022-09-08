import Store from '../Storage';

const { setSkinMap } = Store;

const setMapItem = (e): void => {
  const {
    target: { value: val, name },
  } = e;
  const targetValue = parseInt(val, 10);

  setSkinMap(name, targetValue);
};

export { setMapItem };
export default setMapItem;
