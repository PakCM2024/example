export interface ContainerInfo {
  containerNumber: string;
  terminalExit: string;
  portDate: string;
  loadingDate: string;
  billOfLading: string;
  customsStatus: string;
  blockageInfo: {
    port: string;
    customs: string;
  };
}

export interface TrackingResponse {
  message: string;
  status: 'success' | 'error';
  rawResponse?: any;
  containerInfo?: ContainerInfo;
}