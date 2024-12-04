export interface SimpaResponse {
  html: string;
  status: number;
  headers: Record<string, string>;
}

export interface SimpaAction {
  type: string;
  url: string;
  action: string;
  data?: Record<string, unknown>;
  timestamp?: string;
}

export interface SafeError {
  message: string;
  status?: number;
}