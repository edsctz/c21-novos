// Direct webhook submission - bypasses CORS completely
export function submitToWebhookDirect(formData, propertyId = 'squaredesign') {
  return new Promise((resolve, reject) => {
    try {
      // Get UTM data
      const utmData = JSON.parse(localStorage.getItem('utmData') || '{}');
      
      // Get property ID from URL if not provided
      if (!propertyId || propertyId === 'default') {
        const pathSegments = window.location.pathname.split('/').filter(segment => segment);
        propertyId = pathSegments.length > 0 ? pathSegments[0] : 'squaredesign';
      }
      
      // Prepare complete data
      const submitData = {
        // User data
        nome: formData.nome,
        telefone: formData.telefone || formData.whatsapp,
        
        // Property information
        property_id: propertyId,
        property_name: propertyId === 'squaredesign' ? 'Square Design Residence' : propertyId,
        property_full_name: propertyId === 'squaredesign' ? 'Square Design Residence Alphaville' : propertyId,
        
        // UTM and tracking data
        ...utmData,
        
        // Form metadata
        form_type: formData.form_type || 'lead_form',
        form_id: formData.form_id || 'default',
        
        // Technical data
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        referrer: document.referrer || '',
        browser_language: navigator.language,
        screen_resolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        submitted_via: 'direct_form'
      };
      
      // Create hidden form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://workflowwebhook.prospectz.com.br/webhook/lp-novos';
      form.target = '_blank';
      form.style.display = 'none';
      
      // Add all data as hidden inputs
      Object.keys(submitData).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(submitData[key] || '');
        form.appendChild(input);
      });
      
      // Add to document and submit
      document.body.appendChild(form);
      form.submit();
      
      // Clean up and resolve
      setTimeout(() => {
        try {
          document.body.removeChild(form);
        } catch (e) {
          // Form might already be removed
        }
        resolve({ success: true, method: 'direct_form' });
      }, 1000);
      
    } catch (error) {
      console.error('Direct webhook submission error:', error);
      reject(error);
    }
  });
}

// Main submission function
export async function submitFormData(formData, options = {}) {
  const propertyId = options.propertyId || 'squaredesign';
  const formType = options.formType || 'lead_form';
  const formId = options.formId || 'default';
  
  try {
    const result = await submitToWebhookDirect({
      ...formData,
      form_type: formType,
      form_id: formId
    }, propertyId);
    
    console.log('Form submitted successfully via direct method');
    return result;
  } catch (error) {
    console.error('Form submission failed:', error);
    throw new Error('Unable to submit form. Please try again or contact support.');
  }
}
