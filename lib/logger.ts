type LogLevel = 'info' | 'error' | 'warn' | 'debug';

interface LogOptions {
  [key: string]: string | number | boolean | object;
}

class Logger {
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(level: LogLevel, message: string, options?: LogOptions): string {
    const timestamp = this.getTimestamp();
    const optionsString = options ? ` ${JSON.stringify(options)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${optionsString}`;
  }

  info(message: string, options?: LogOptions): void {
    console.log(this.formatMessage('info', message, options));
  }

  error(message: string, options?: LogOptions): void {
    console.error(this.formatMessage('error', message, options));
  }

  warn(message: string, options?: LogOptions): void {
    console.warn(this.formatMessage('warn', message, options));
  }

  debug(message: string, options?: LogOptions): void {
    console.debug(this.formatMessage('debug', message, options));
  }
}

export const logger = new Logger();