type IOverload = {
  (value: string, initial?: undefined): void;
  (value: string, initial: boolean): number;
};

const useSetRangeValue = (
  setter: { (target: string, value: string | number) },
  getter: { (target: string) },
  target: string,
  min: number,
  max: number,
): IOverload => {
  return (value, initial) => {
    const newValue = Math.min(Math.max(+value, min), max);
    setter(target, newValue);
    return initial ? getter(target) : undefined;
  };
};

export { useSetRangeValue };
export default useSetRangeValue;
