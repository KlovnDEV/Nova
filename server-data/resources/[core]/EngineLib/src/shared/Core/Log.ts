enum LogLevel {
  NONE = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
};

export class Log {
  static logLevel = LogLevel.DEBUG;

  static write(...args: any[]): void {
    console.log(...args);
  }

  static error(...args: any[]): void {
    if (Log.logLevel < LogLevel.ERROR) return;
    console.log('^1', ...args, '^0');
  }

  static info(...args: any[]): void {
    if (Log.logLevel < LogLevel.INFO) return;
    console.log('^2', ...args, '^0');
  }

  static warn(...args: any[]): void {
    if (Log.logLevel < LogLevel.WARN) return;
    console.log('^3', ...args, '^0');
  }

  static debug(...args: any[]): void {
    if (Log.logLevel < LogLevel.DEBUG) return;
    console.log('^4', ...args, '^0' );
  }
}
