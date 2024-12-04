import { SimpaAction } from '../types/simpa';

export const logSimpaAction = (action: SimpaAction): void => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    action: action.type,
    data: action.data,
    url: action.url
  };

  // Log to console for development
  console.log('SIMPA Action:', logEntry);

  // Store in localStorage for persistence
  const logs = JSON.parse(localStorage.getItem('simpa_logs') || '[]');
  logs.push(logEntry);
  localStorage.setItem('simpa_logs', JSON.stringify(logs));
};

export const getSimpaLogs = (): SimpaAction[] => {
  return JSON.parse(localStorage.getItem('simpa_logs') || '[]');
};

export const exportSimpaLogsAsXML = (): string => {
  const logs = getSimpaLogs();
  
  const xmlContent = logs.map(log => `
    <action>
      <timestamp>${log.timestamp}</timestamp>
      <type>${log.type}</type>
      <url>${log.url}</url>
      <data>${JSON.stringify(log.data)}</data>
    </action>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<simpa_logs>
  ${xmlContent}
</simpa_logs>`;
};