import { Vector3 } from "./Vector3";

export class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Длина вектора от точки 0
   */
  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Расстояние между точками
   */
  distanceTo(v: Vector2): number {
    return this.sub(v).length;
  }

  /**
   * Сложение векторов
   */
  add(v: Vector2): Vector2 {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  /**
   * Сложение вектора и скаляра
   */
   addXYZ(x: number, y: number, z: number): Vector2 {
    return new Vector2(this.x + x, this.y + y);
  }

  /**
   * Вычитание векторов
   */
  sub(v: Vector2): Vector2 {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

 /**
   * Умножение вектора на скаляр
   */
  mul(m: number): Vector2 {
    return new Vector2(this.x * m, this.y * m);
  }

  /**
   * Умножение вектора на скаляр покоординатно
   */
  mulXY(x: number, y: number): Vector2 {
    return new Vector2(this.x * x, this.y * y);
  }

  toArray(): number[] {
    return [this.x, this.y];
  }

  static FromArray(arr: [number, number]): Vector2 {
    return new Vector2(arr[0], arr[1]);
  }

  static FromObject(dict: { x: number; y: number }): Vector2 {
    return new Vector2(dict.x, dict.y);
  }

  static get Zero() {
    return new Vector2(0,0);
  }

  toString(): string {
    return `vector2(${this.x}, ${this.y})`;
  }

  toVector3(z: number): Vector3 {
    return new Vector3(this.x, this.y, z);
  }
}
