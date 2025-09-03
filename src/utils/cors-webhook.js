/**
 * CORS-compliant webhook submission utility
 * Follows the exact pattern for avoiding CORS issues
 */

/**
 * Get UTM parameters from localStorage
 */
function getUTMParameters() {
  try {
    return JSON.parse(localStorage.getItem('utmData') || '{}');
  } catch (error) {
    console.warn('Error parsing UTM data:', error);
    return {};
  }
}

/**
 * Get property information from URL
 */
function getPropertyInfo() {
  const pathSegments = window.location.pathname.split('/').filter(segment => segment);
  const propertyId = pathSegments.length > 0 ? pathSegments[0] : 'squaredesign';
  
  const propertyMap = {
    'squaredesign': {
      id: 'squaredesign',
      name: 'Square Design Residence',
      fullName: 'Square Design Residence Alphaville'
    }
  };
  
  return propertyMap[propertyId] || {
    id: propertyId,
    name: propertyId,
    fullName: propertyId
  };
}

/**
 * Submit form data to webhook without CORS issues
 * @param {Object} formData - Form data object
 * @param {string} source - Form identifier
 * @returns {Promise} - Promise that resolves when submission is complete
 */
export async function submitToWebhook(formData, source = 'lead-form') {
  const utmParameters = getUTMParameters();
  const property = getPropertyInfo();
  
  // Create payload following the exact pattern
  const payload = {
    ...formData,
    source: source,
    timestamp: new Date().toISOString(),
    ...utmParameters,
    // Additional context data
    property_id: property.id,
    property_name: property.name,
    property_full_name: property.fullName,
    page_url: window.location.href,
    user_agent: navigator.userAgent,
    referrer: document.referrer || '',
    browser_language: navigator.language,
    screen_resolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
  
  try {
    // Send data to webhook using fetch with minimal headers
    const response = await fetch('https://workflowwebhook.prospectz.com.br/webhook/lp-novos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    if (response.ok) {
      console.log('Form submitted successfully via CORS-compliant method');
      return { success: true, method: 'cors_compliant' };
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('CORS webhook submission error:', error);
    throw error;
  }
}

/**
 * Handle form submission with success/error feedback
 * @param {Event} event - Form submit event
 * @param {string} source - Form identifier
 * @param {Object} options - Additional options
 */
export async function handleFormSubmission(event, source = 'lead-form', options = {}) {
  event.preventDefault();
  
  // Get form data
  const formData = new FormData(event.target);
  const formEntries = Object.fromEntries(formData.entries());
  
  try {
    // Submit to webhook
    await submitToWebhook(formEntries, source);
    
    // Show success message
    if (options.successCallback) {
      options.successCallback();
    } else {
      const successElement = document.getElementById('success-message');
      if (successElement) {
        successElement.classList.remove('hidden');
      } else {
        alert('Obrigado! Em breve entraremos em contato com todas as informações.');
      }
      event.target.reset();
    }
    
    // Track successful submission
    if (typeof gtag !== 'undefined') {
      gtag('event', 'generate_lead', {
        event_category: 'Lead Form',
        event_label: source,
        value: 1
      });
    }
    
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead', {
        content_name: formEntries.property_name || 'Real Estate Lead',
        content_category: 'Real Estate Lead'
      });
    }
    
  } catch (error) {
    console.error('Error submitting form:', error);
    
    // Show error message
    if (options.errorCallback) {
      options.errorCallback(error);
    } else {
      const errorElement = document.getElementById('error-message');
      if (errorElement) {
        errorElement.classList.remove('hidden');
      } else {
        alert('Erro ao enviar formulário. Tente novamente ou entre em contato via WhatsApp.');
      }
    }
  }
}

/**
 * Initialize form with CORS-compliant webhook submission
 * @param {string} formId - Form element ID
 * @param {string} source - Form identifier
 * @param {Object} options - Additional options
 */
export function initializeForm(formId, source = 'lead-form', options = {}) {
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById(formId);
    
    if (form) {
      form.addEventListener('submit', async function(event) {
        await handleFormSubmission(event, source, options);
      });
    } else {
      console.warn(`Form with ID '${formId}' not found`);
    }
  });
}
