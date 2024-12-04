export const getUserInfo = async (): Promise<any> => {
  const userInfo = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    platform: navigator.platform,
  };

  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return { ...userInfo, ip: data.ip };
  } catch (error) {
    return { ...userInfo, ip: 'Unable to fetch IP' };
  }
};