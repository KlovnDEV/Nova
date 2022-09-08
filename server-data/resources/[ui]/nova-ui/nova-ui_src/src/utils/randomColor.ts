const genRandom = (): { a: number; b: string }[] => {
  const target = [];

  for (let i = 0; i <= 64; i += 1) {
    target.push({
      value: i,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    });
  }

  return target;
};

export default genRandom;
export { genRandom };
