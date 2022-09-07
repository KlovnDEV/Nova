import { Vector3 } from '../Vector3';

test('Создаём Vector3', () => {
  const v = new Vector3(1, 2, 3);
  expect(v.toArray()).toStrictEqual([1, 2, 3]);
});

test('Проверяем длину вектора', () => {
  expect(Vector3.FromArray([3, 2, 6]).length).toBe(7);
});

test('Проверяем расстояние между точками', () => {
  expect(new Vector3(1, 6, 5).distanceTo(new Vector3(8, 2, 9))).toBe(9);
});

test('Складываем векторы', () => {
  expect(new Vector3(1, 2, 3).add(new Vector3(2, 3, 4)).toArray()).toMatchObject([3, 5, 7]);
});

test('Преобразование в vector2', () => {
  expect(new Vector3(3, 4, 6).xy().length).toBe(5);
});

test('Преобразование в строку', () => {
  expect(new Vector3(1, 2, 3).toString()).toBe('vector3(1, 2, 3)');
});
