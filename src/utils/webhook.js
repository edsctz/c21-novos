// Webhook utility functions for form submissions

/**
 * Get property information from the current URL and property config
 */
export function getPropertyInfo() {
  // Get property ID from URL path
  const pathSegments = window.location.pathname.split('/').filter(segment => segment);
  const propertyId = pathSegments.length > 0 ? pathSegments[0] : 'squaredesign';
  
  // Property mapping - extend this as new properties are added
  const propertyMap = {
    'squaredesign': {
      id: 'squaredesign',
      name: 'Square Design Residence',
      fullName: 'Square Design Residence Alphaville'
    }
  };
  
  const property = propertyMap[propertyId] || {
    id: propertyId,
    name: propertyId,
    fullName: propertyId
  };
  
  return property;
}

/**
 * Prepare form data for webhook submission
 */
export function prepareWebhookData(formData, formType = 'lead_form', formId = 'default') {
  const property = getPropertyInfo();
  const utmData = JSON.parse(localStorage.getItem('utmData') || '{}');
  
  return {
    // User data
    nome: formData.nome,
    telefone: formData.telefone || formData.whatsapp,
    
    // Property information
    property_id: property.id,
    property_name: property.name,
    property_full_name: property.fullName,
    
    // UTM and tracking data
    ...utmData,
    
    // Form metadata
    form_type: formType,
    form_id: formId,
    
    // Technical data
    timestamp: new Date().toISOString(),
    page_url: window.location.href,
    user_agent: navigator.userAgent,
    referrer: document.referrer || '',
    
    // Additional context
    browser_language: navigator.language,
    screen_resolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
}

/**
 * Send data to webhook
 */
export async function sendToWebhook(data) {
  const webhookUrl = 'https://workflowwebhook.prospectz.com.br/webhook/lp-novos';
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`Webhook responded with status: ${response.status}`);
    }
    
    return { success: true, response };
  } catch (error) {
    console.error('Webhook submission error:', error);
    throw error;
  }
}

/**
 * Complete form submission workflow
 */
export async function submitFormToWebhook(formData, formType = 'lead_form', formId = 'default') {
  try {
    const webhookData = prepareWebhookData(formData, formType, formId);
    const result = await sendToWebhook(webhookData);
    
    // Log successful submission for debugging
    console.log('Form submitted successfully:', {
      property: webhookData.property_name,
      form_type: formType,
      timestamp: webhookData.timestamp
    });
    
    return result;
  } catch (error) {
    console.error('Form submission failed:', error);
    throw error;
  }
}
