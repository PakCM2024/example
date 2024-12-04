import { UserInfo, WebhookResponse } from './types';
import { logger } from './logger';

const REPORT_WEBHOOK_URL = 'https://hook.eu1.make.com/gyj5trrkuf0ni6qdrs63uy91cqbds5wn';
const WEBHOOK_URL = 'https://hook.eu1.make.com/4s48785feuu6m9pqljq9vxvwr5trrjuq';

export const submitReport = async (formData: Record<string, any>): Promise<{ success: boolean; message: string }> => {
  try {
    logger.addLog('api', {
      type: 'report_submission',
      data: formData
    }, {
      direction: 'outgoing',
      endpoint: REPORT_WEBHOOK_URL
    });

    const response = await fetch(REPORT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    logger.addLog('api', {
      type: 'report_submission_success',
      status: response.status
    }, {
      direction: 'incoming',
      endpoint: REPORT_WEBHOOK_URL,
      status: response.status
    });

    return {
      success: true,
      message: 'Votre signalement a été envoyé avec succès.'
    };
  } catch (error) {
    logger.addLog('error', {
      type: 'report_submission_error',
      error: error.message
    });

    return {
      success: false,
      message: 'Une erreur est survenue lors de l\'envoi du signalement. Veuillez réessayer.'
    };
  }
};

export const sendMessage = async (message: string, userInfo: UserInfo | null): Promise<WebhookResponse> => {
  try {
    logger.addLog('api', {
      type: 'request',
      url: WEBHOOK_URL,
      data: { message, userInfo }
    }, {
      direction: 'outgoing',
      endpoint: WEBHOOK_URL
    });

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: message,
        context: {
          timestamp: new Date().toISOString(),
          userInfo
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    
    try {
      const jsonResponse = JSON.parse(data);
      logger.addLog('api', {
        type: 'response',
        data: jsonResponse
      }, {
        direction: 'incoming',
        endpoint: WEBHOOK_URL,
        status: response.status
      });

      return {
        message: jsonResponse.response || jsonResponse.message || "Je ne comprends pas votre demande. Pouvez-vous reformuler?",
        status: 'success',
        timestamp: new Date().toISOString(),
      };
    } catch (e) {
      // If response is not JSON, use text directly
      return {
        message: data || "Je ne comprends pas votre demande. Pouvez-vous reformuler?",
        status: 'success',
        timestamp: new Date().toISOString(),
      };
    }
  } catch (error) {
    console.error('Error sending message:', error);
    return {
      message: "Je suis désolé, je rencontre des difficultés techniques. Pouvez-vous réessayer dans quelques instants?",
      status: 'error',
      timestamp: new Date().toISOString(),
    };
  }
};