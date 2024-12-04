export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface UserInfo {
  ip: string;
  userAgent: string;
  language: string;
  screenResolution: string;
  timezone: string;
  platform: string;
}

export interface WebhookResponse {
  message: string;
  status: 'success' | 'error';
  timestamp: string;
  containerInfo?: ContainerInfo;
}

export interface MakeWebhookResponse {
  Status: number;
  Body: string;
  'Content[': string;
  'Text.Value': string;
}