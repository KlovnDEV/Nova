import { assert } from '../../shared/Utils';

export class Random {
    /**
     * Возвращает псевдослучайное число N в диапазоне [0, 1)
     */
    static random(): number {
        return Math.random();
    }

    /**
     * Возвращает псевдослучайное целое число 
     * @return {number} целое N в диапазоне [a, b)
     * @return {number} Если b не задано, целое N в диапазоне [0, a)
     */
     static randint(a: number, b?: number): number {
        let minval, maxval;

        if (b !== undefined) {
            minval = a;
            maxval = b;
        } else {
            minval = 0;
            maxval = a;
        }

        assert(maxval >= minval);

        return minval + Math.floor(Random.random() * (maxval-minval));
    }

    /**
     * Выбирает псевдослучайный элемент из входящего массива
     */
    static choice(arr: any[]) {
        assert(arr.length > 0, 'Nothing to choose! Array is empty.');

        const index = Random.randint(arr.length);
        return arr[index];
    }

  }
  