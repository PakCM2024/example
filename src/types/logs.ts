export type LogDirection = 'incoming' | 'outgoing';

export interface LogEntry {
  timestamp: Date;
  type: 'info' | 'error' | 'webhook' | 'api';
  data: unknown;
  direction?: LogDirection;
  endpoint?: string;
  status?: number;
}