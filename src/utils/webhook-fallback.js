// Fallback webhook submission using form POST to avoid CORS
export async function submitToWebhookFallback(formData, propertyId = 'squaredesign') {
  return new Promise((resolve, reject) => {
    try {
      // Create a hidden form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://workflowwebhook.prospectz.com.br/webhook/lp-novos';
      form.target = '_blank'; // Open in new tab to avoid navigation
      form.style.display = 'none';
      
      // Get UTM data
      const utmData = JSON.parse(localStorage.getItem('utmData') || '{}');
      
      // Prepare complete data
      const submitData = {
        ...formData,
        ...utmData,
        property_id: propertyId,
        property_name: propertyId === 'squaredesign' ? 'Square Design Residence' : propertyId,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        referrer: document.referrer || '',
        browser_language: navigator.language,
        screen_resolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        submitted_via: 'form_fallback'
      };
      
      // Add form fields
      Object.keys(submitData).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = submitData[key] || '';
        form.appendChild(input);
      });
      
      // Add form to document and submit
      document.body.appendChild(form);
      
      // Submit form
      form.submit();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(form);
        resolve({ success: true });
      }, 1000);
      
    } catch (error) {
      console.error('Fallback submission error:', error);
      reject(error);
    }
  });
}

// Alternative: Use JSONP-style approach
export async function submitToWebhookJSONP(formData, propertyId = 'squaredesign') {
  return new Promise((resolve, reject) => {
    try {
      // Get UTM data
      const utmData = JSON.parse(localStorage.getItem('utmData') || '{}');
      
      // Prepare complete data
      const submitData = {
        ...formData,
        ...utmData,
        property_id: propertyId,
        property_name: propertyId === 'squaredesign' ? 'Square Design Residence' : propertyId,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        referrer: document.referrer || '',
        browser_language: navigator.language,
        screen_resolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        submitted_via: 'jsonp_fallback'
      };
      
      // Create callback function
      const callbackName = 'webhookCallback_' + Date.now();
      window[callbackName] = function(response) {
        // Clean up
        delete window[callbackName];
        document.head.removeChild(script);
        resolve({ success: true, response });
      };
      
      // Create script tag for JSONP
      const script = document.createElement('script');
      const params = new URLSearchParams(submitData);
      script.src = `https://workflowwebhook.prospectz.com.br/webhook/lp-novos?callback=${callbackName}&${params.toString()}`;
      
      // Handle errors
      script.onerror = function() {
        delete window[callbackName];
        document.head.removeChild(script);
        reject(new Error('JSONP request failed'));
      };
      
      // Add script to head
      document.head.appendChild(script);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        if (window[callbackName]) {
          delete window[callbackName];
          document.head.removeChild(script);
          reject(new Error('Request timeout'));
        }
      }, 10000);
      
    } catch (error) {
      console.error('JSONP submission error:', error);
      reject(error);
    }
  });
}

// Main fallback function that tries multiple approaches
export async function submitWithFallback(formData, propertyId = 'squaredesign') {
  // First try the API endpoint
  try {
    const response = await fetch('/api/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        property_id: propertyId,
        property_name: propertyId === 'squaredesign' ? 'Square Design Residence' : propertyId,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        form_type: 'lead_form'
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        return { success: true, method: 'api' };
      }
    }
  } catch (error) {
    console.log('API endpoint failed, trying fallback methods...');
  }
  
  // If API fails, try form submission fallback
  try {
    await submitToWebhookFallback(formData, propertyId);
    return { success: true, method: 'form_fallback' };
  } catch (error) {
    console.error('All submission methods failed:', error);
    throw new Error('Unable to submit form. Please try again or contact support.');
  }
}
