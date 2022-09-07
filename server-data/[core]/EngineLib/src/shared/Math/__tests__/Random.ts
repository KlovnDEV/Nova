import { Random } from '../Random';

test('random', () => {

  for (let i=0; i < 100; i++) {
    const val = Random.random();
    expect(val).toBeGreaterThanOrEqual(0);
    expect(val).toBeLessThan(1);
  }
});

test('randint (1 аргумент)', () => {

    for (let i=0; i < 100; i++) {
      const val = Random.randint(5);
      expect(Math.floor(val) == val).toBeTruthy();
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThan(5);
    }
  });

  test('randint (2 аргумента)', () => {

    for (let i=0; i < 100; i++) {
      const val = Random.randint(2,7);
      expect(Math.floor(val) == val).toBeTruthy();
      expect(val).toBeGreaterThanOrEqual(2);
      expect(val).toBeLessThan(7);
    }
  });
  
  test('randint (вырожденные случаи)', () => {
      expect(Random.randint(0,0)).toBe(0);
      expect(Random.randint(1,1)).toBe(1);
      expect(() => Random.randint(7,2)).toThrowError();
  });

  test('choice', () => {
    const arr = "abcdefg".split('');
    const buckets = new Map<string, number>();

    for (let i=0; i < 1000; i++) {
        const val = Random.choice(arr);
        expect(arr.includes(val));
        if (!buckets.has(val)) buckets.set(val, 0);
        buckets.set(val, buckets.get(val) + 1);
    }

    // console.log(buckets);

    expect(buckets.size).toBe(arr.length);
    for (const val of buckets.values()) {
      expect(val).toBeGreaterThanOrEqual(100);
      expect(val).toBeLessThanOrEqual(180);
    };

});
