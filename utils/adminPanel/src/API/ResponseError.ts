class ResponseError {
  status: number;

  data: string;

  constructor(status: number, data: string) {
    this.status = status;
    this.data = data;
  }

  toString(): string {
    return `Ошибка ${this.status}: ${this.data}`;
  }
}

export { ResponseError };
export default ResponseError;
