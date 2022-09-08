import { Vector2 } from '../Vector2';

test('Создаём Vector2', () => {
  const v = new Vector2(1, 2);
  expect(v.toArray()).toStrictEqual([1, 2]);
});

test('Проверяем длину вектора', () => {
  expect(Vector2.FromArray([6, 8]).length).toBe(10);
});

test('Проверяем расстояние между точками', () => {
  expect(new Vector2(1, 9).distanceTo(new Vector2(5, 6))).toBe(5);
});

test('Складываем векторы', () => {
  expect(new Vector2(3, 4).add(new Vector2(5, 6)).toArray()).toMatchObject([8, 10]);
});

test('Преобразование в строку', () => {
  expect(new Vector2(1, 2).toString()).toBe('vector2(1, 2)');
});
