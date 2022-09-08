const useChangeRangeValue =
  (
    setter: { (target: string, value: string | number) },
    getter: { (target: string): void },
    name: string,
    min: number,
    max: number,
  ): { (value: number): void } =>
  (value: number): void => {
    const oldValue = getter(name);
    const newValue = Math.min(Math.max(+oldValue + value, min), max);
    setter(name, newValue);
  };

export { useChangeRangeValue };
export default useChangeRangeValue;
