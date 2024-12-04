import axios from 'axios';

const SIMPA_BASE_URL = 'https://simpa.guichetunique.cm';
const LOCAL_PROXY = '/api/simpa';

export const fetchSimpaContent = async (path: string) => {
  try {
    const response = await axios.get(`${LOCAL_PROXY}${path}`, {
      headers: {
        'Accept': 'text/html',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    
    // Extract only the main content area
    const mainContent = extractMainContent(response.data);
    return mainContent;
  } catch (error) {
    console.error('Error fetching SIMPA content:', error);
    throw error;
  }
};

const extractMainContent = (html: string): string => {
  try {
    // Create a temporary div to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Handle Thymeleaf fragments
    doc.querySelectorAll('[th\\:fragment]').forEach(el => {
      el.removeAttribute('th:fragment');
    });
    
    doc.querySelectorAll('[th\\:text]').forEach(el => {
      const textExpr = el.getAttribute('th:text');
      if (textExpr) {
        // Convert Thymeleaf expressions to actual content
        el.textContent = textExpr.replace(/\$\{([^}]+)\}/g, '$1');
        el.removeAttribute('th:text');
      }
    });

    // Find the main content area
    const mainContent = doc.querySelector('.main-content, main, #main-content, #content');
    
    if (mainContent) {
      // Add necessary event handlers to the content
      mainContent.querySelectorAll('form').forEach(form => {
        form.setAttribute('onsubmit', 'return false;');
      });

      mainContent.querySelectorAll('[onclick]').forEach(el => {
        el.removeAttribute('onclick');
      });

      return mainContent.innerHTML;
    }
    
    // Fallback: return a cleaned version of the body content
    const body = doc.body;
    // Remove header, footer, and navigation elements
    body.querySelectorAll('header, footer, nav').forEach(el => el.remove());
    
    // Clean up inline scripts and event handlers
    body.querySelectorAll('script').forEach(el => el.remove());
    body.querySelectorAll('[onclick], [onsubmit], [onchange]').forEach(el => {
      el.removeAttribute('onclick');
      el.removeAttribute('onsubmit');
      el.removeAttribute('onchange');
    });

    // Add custom classes
    body.querySelectorAll('.btn, button[type="submit"]').forEach(el => {
      el.classList.add('simpa-button');
    });

    body.querySelectorAll('.grid, .row').forEach(el => {
      el.classList.add('simpa-grid');
    });

    return body.innerHTML;
  } catch (error) {
    console.error('Error extracting main content:', error);
    return html;
  }
};

export const submitSimpaForm = async (formData: FormData, path: string) => {
  try {
    const response = await axios.post(`${LOCAL_PROXY}${path}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};