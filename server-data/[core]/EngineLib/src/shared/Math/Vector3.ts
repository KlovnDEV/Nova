import { Vector2 } from './Vector2';

export class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x * 1.0;
    this.y = y * 1.0;
    this.z = z * 1.0;
  }

  /**
   * Длина вектора от точки 0
   */
  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  /**
   * Расстояние между точками
   */
  distanceTo(v: Vector3): number {
    return this.sub(v).length;
  }

  /**
   * Сложение двух векторов
   */
  add(v: Vector3): Vector3 {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  /**
   * Сложение вектора и скаляра
   */
  addXYZ(x: number, y: number, z: number): Vector3 {
    return new Vector3(this.x + x, this.y + y, this.z + z);
  }

  /**
   * Умножение вектора на скаляр
   */
   mul(m: number): Vector3 {
    return new Vector3(this.x * m, this.y * m, this.z * m);
  }

  /**
   * Умножение вектора на скаляр покоординатно
   */
  mulXYZ(x: number, y: number, z: number): Vector3 {
    return new Vector3(this.x * x, this.y * y, this.z * z);
  }

  /**
   * Вычитание векторов
   */
  sub(v: Vector3): Vector3 {
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  /**
   * Сформировать новый вектор (x,y)
   */
  xy(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  toArray(): number[] {
    return [this.x, this.y, this.z];
  }

  static FromArray(arr: [number, number, number] | number[]): Vector3 {
    return new Vector3(arr[0], arr[1], arr[2]);
  }

  static FromObject(dict: { x: number; y: number; z: number }): Vector3 {
    return new Vector3(dict.x, dict.y, dict.z);
  }

  static get Zero() {
    return new Vector3(0,0,0);
  }

  toString(): string {
    return `vector3(${this.x}, ${this.y}, ${this.z})`;
  }

}
