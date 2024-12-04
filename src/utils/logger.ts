import { LogEntry } from '../types/logs';

interface LogOptions {
  direction?: LogEntry['direction'];
  endpoint?: string;
  status?: number;
}

class Logger {
  private logs: LogEntry[] = [];
  private subscribers: ((logs: LogEntry[]) => void)[] = [];

  addLog(type: LogEntry['type'], data: unknown, options: LogOptions = {}) {
    const logEntry: LogEntry = {
      timestamp: new Date(),
      type,
      data,
      direction: options.direction,
      endpoint: options.endpoint,
      status: options.status
    };
    this.logs.push(logEntry);
    this.notifySubscribers();
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
    this.notifySubscribers();
  }

  subscribe(callback: (logs: LogEntry[]) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.getLogs()));
  }
}

export const logger = new Logger();