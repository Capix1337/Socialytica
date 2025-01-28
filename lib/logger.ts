type LogLevel = 'info' | 'error' | 'warn' | 'debug';

// Make LogParams type more specific
interface BaseLogParams {
  [key: string]: string | number | boolean | null | undefined | BaseLogParams;
}

interface LogParams extends BaseLogParams {
  options?: Record<string, unknown>;
  error?: string;
  guestId?: string;
  duration?: number;
  totalDeleted?: number;
}

class Logger {
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(level: LogLevel, message: string, params?: LogParams): string {
    const timestamp = this.getTimestamp();
    const paramsString = params ? ` ${JSON.stringify(params)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${paramsString}`;
  }

  info(message: string, params?: LogParams): void {
    console.log(this.formatMessage('info', message, params));
  }

  error(message: string, params?: LogParams): void {
    console.error(this.formatMessage('error', message, params));
  }

  warn(message: string, params?: LogParams): void {
    console.warn(this.formatMessage('warn', message, params));
  }

  debug(message: string, params?: LogParams): void {
    console.debug(this.formatMessage('debug', message, params));
  }
}

export const logger = new Logger();