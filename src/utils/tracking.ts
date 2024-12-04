import { TrackingResponse, ContainerInfo } from '../types/tracking';
import { logger } from './logger';

const TRACKING_WEBHOOK_URL = 'https://hook.eu1.make.com/3pdccxijyjp3thbjebqy67irhiy45cb2';
const WEBHOOK_TIMEOUT = 60000;

export const validateContainerNumber = (containerNumber: string): string | null => {
  if (!/^[A-Z0-9]{11}$/.test(containerNumber)) {
    return 'Le numéro de conteneur doit contenir exactement 11 caractères (lettres et chiffres)';
  }
  return null;
};

export const parseContainerInfo = (data: string): ContainerInfo | null => {
  if (!data || !data.includes('conteneur')) {
    return null;
  }

  // Clean up encoding issues in the response
  const cleanData = data
    .replace(/Ã©/g, 'é')
    .replace(/Ã¨/g, 'è')
    .replace(/Ã‰/g, 'É')
    .replace(/Ã€/g, 'À')
    .replace(/Ã¢/g, 'â')
    .replace(/Ã®/g, 'î')
    .replace(/Ã´/g, 'ô')
    .replace(/Ã»/g, 'ù')
    .replace(/Ã§/g, 'ç')
    .replace(/Ã«/g, 'ë')
    .replace(/Ã¯/g, 'ï')
    .replace(/Ã¶/g, 'ö')
    .replace(/Ã¼/g, 'ü')
    .replace(/\\/g, '');

  return {
    containerNumber: cleanData.match(/conteneur ([A-Z0-9]+)/)?.[1] || '',
    terminalExit: cleanData.match(/Date sortie \/ entrée du terminal : (.*?)(?:\n|$)/)?.[1]?.trim() || '',
    portDate: cleanData.match(/Date de entrée\/ sortie du port :[\s\n]+(.*?)(?:\n|$)/)?.[1]?.trim() || '',
    loadingDate: cleanData.match(/date de c?chargement\/déchargement :[\s\n]+(.*?)(?:\n|$)/)?.[1]?.trim() || '',
    billOfLading: cleanData.match(/Le connaissement : (.*?)(?:\n|$)/)?.[1]?.trim() || '',
    customsStatus: cleanData.includes('VALIDÉ') ? 'VALIDÉ' : 'EN ATTENTE',
    blockageInfo: {
      port: cleanData.includes('position de blocage à la capitainerie est : Non') ? 'Non' : 'Oui',
      customs: cleanData.includes('position de blocage à la douane est : Non') ? 'Non' : 'Oui'
    }
  };
};

export const fetchContainerInfo = async (containerNumber: string): Promise<TrackingResponse> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT);

  try {
    logger.addLog('webhook', {
      type: 'request',
      url: TRACKING_WEBHOOK_URL,
      containerNumber
    }, {
      direction: 'outgoing',
      endpoint: TRACKING_WEBHOOK_URL
    });

    const response = await fetch(TRACKING_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: containerNumber }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error('Erreur de communication avec le serveur');
    }

    const data = await response.text();

    try {
      const jsonResponse = JSON.parse(data);
      logger.addLog('webhook', {
        type: 'raw_response',
        data: jsonResponse,
        containerNumber
      }, {
        direction: 'incoming',
        endpoint: TRACKING_WEBHOOK_URL,
        status: response.status
      });

      if (Array.isArray(jsonResponse) && jsonResponse.length > 0) {
        // Get the raw body text directly without trying to parse it as JSON
        const rawBody = jsonResponse[0].body || '';
        const cleanBody = rawBody
          .replace(/^"|"$/g, '')  // Remove surrounding quotes
          .replace(/\\"/g, '"')   // Fix escaped quotes
          .replace(/\\n/g, '\n'); // Fix newlines
        
        // Log the parsed response body
        logger.addLog('webhook', {
          type: 'parsed_response',
          data: cleanBody,
          containerNumber,
          parsed: true
        }, {
          direction: 'incoming',
          endpoint: TRACKING_WEBHOOK_URL,
          status: response.status
        });
        
        return {
          status: 'success',
          message: cleanBody,
          rawResponse: jsonResponse,
          containerInfo: null // We'll handle structured data later if needed
        };
      }
      
      return {
        status: 'error',
        message: 'Format de réponse invalide. Veuillez réessayer.'
      };
    } catch (error) {
      logger.addLog('error', {
        type: 'parse_error',
        error: `${error.name}: ${error.message}`,
        rawData: data,
        containerNumber
      });
      return {
        status: 'error',
        message: data || 'Impossible de traiter la réponse du serveur. Veuillez réessayer.'
      };
    }
  } catch (error) {
    console.error('Tracking error:', error);
    logger.addLog('error', {
      type: 'fetch_error',
      error: error.message,
      containerNumber
    });
    return {
      status: 'error',
      message: error.name === 'AbortError'
        ? 'Le serveur met trop de temps à répondre. Veuillez réessayer.'
        : 'Impossible de récupérer les informations du conteneur. Veuillez réessayer.'
    };
  } finally {
    clearTimeout(timeoutId);
  }
};