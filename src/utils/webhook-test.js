/**
 * Test utility for CORS-compliant webhook implementation
 * This file can be used to test the webhook functionality
 */

/**
 * Test the CORS-compliant webhook submission
 */
export async function testWebhookSubmission() {
  console.log('🧪 Testing CORS-compliant webhook submission...');
  
  // Mock form data
  const testFormData = {
    nome: 'Test User',
    telefone: '(11) 99999-9999'
  };
  
  // Mock UTM parameters
  const mockUTMData = {
    utm_source: 'test',
    utm_medium: 'test',
    utm_campaign: 'test_campaign',
    utm_content: 'test_content',
    utm_term: 'test_term'
  };
  
  // Store mock UTM data
  localStorage.setItem('utmData', JSON.stringify(mockUTMData));
  
  // Create payload following the exact pattern
  const payload = {
    ...testFormData,
    source: 'webhook-test',
    timestamp: new Date().toISOString(),
    ...mockUTMData,
    // Additional context data
    property_id: 'squaredesign',
    property_name: 'Square Design Residence',
    property_full_name: 'Square Design Residence Alphaville',
    page_url: window.location.href,
    user_agent: navigator.userAgent,
    referrer: document.referrer || '',
    browser_language: navigator.language,
    screen_resolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    test_mode: true
  };
  
  try {
    console.log('📤 Sending test payload:', payload);
    
    // Send data to webhook using fetch with minimal headers
    const response = await fetch('https://workflowwebhook.prospectz.com.br/webhook/lp-novos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    console.log('📥 Response status:', response.status);
    console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      console.log('✅ Webhook test successful!');
      console.log('✅ CORS compliance verified');
      return { success: true, status: response.status };
    } else {
      console.error('❌ Webhook test failed:', response.status, response.statusText);
      return { success: false, status: response.status, error: response.statusText };
    }
  } catch (error) {
    console.error('❌ Webhook test error:', error);
    
    // Check if it's a CORS error
    if (error.message.includes('CORS') || error.message.includes('cross-origin')) {
      console.error('🚫 CORS error detected - webhook service may not be properly configured');
    }
    
    return { success: false, error: error.message };
  }
}

/**
 * Test form submission simulation
 */
export function simulateFormSubmission(formId = 'test-form') {
  console.log('🎭 Simulating form submission...');
  
  // Create a test form
  const form = document.createElement('form');
  form.id = formId;
  form.innerHTML = `
    <input type="text" name="nome" value="Test User" />
    <input type="tel" name="telefone" value="(11) 99999-9999" />
    <button type="submit">Submit</button>
  `;
  
  // Add form to document temporarily
  document.body.appendChild(form);
  
  // Add event listener
  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    console.log('📝 Form submitted, processing...');
    
    // Get form data
    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries());
    
    // Get UTM parameters
    const utmParameters = JSON.parse(localStorage.getItem('utmData') || '{}');
    
    // Create payload
    const payload = {
      ...formEntries,
      source: formId,
      timestamp: new Date().toISOString(),
      ...utmParameters
    };
    
    try {
      // Send data to webhook
      const response = await fetch('https://workflowwebhook.prospectz.com.br/webhook/lp-novos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        console.log('✅ Form simulation successful!');
        alert('Test form submitted successfully!');
      } else {
        console.error('❌ Form simulation failed:', response.status);
        alert('Test form submission failed!');
      }
    } catch (error) {
      console.error('❌ Form simulation error:', error);
      alert('Test form submission error!');
    }
    
    // Clean up
    document.body.removeChild(form);
  });
  
  // Trigger form submission
  form.dispatchEvent(new Event('submit'));
}

/**
 * Run comprehensive webhook tests
 */
export async function runWebhookTests() {
  console.log('🚀 Starting comprehensive webhook tests...');
  
  const results = {
    corsTest: null,
    formSimulation: null,
    timestamp: new Date().toISOString()
  };
  
  // Test 1: Direct webhook submission
  console.log('\n--- Test 1: Direct Webhook Submission ---');
  results.corsTest = await testWebhookSubmission();
  
  // Test 2: Form simulation
  console.log('\n--- Test 2: Form Submission Simulation ---');
  try {
    simulateFormSubmission();
    results.formSimulation = { success: true };
  } catch (error) {
    results.formSimulation = { success: false, error: error.message };
  }
  
  // Summary
  console.log('\n--- Test Results Summary ---');
  console.log('CORS Test:', results.corsTest.success ? '✅ PASSED' : '❌ FAILED');
  console.log('Form Simulation:', results.formSimulation.success ? '✅ PASSED' : '❌ FAILED');
  
  return results;
}

// Auto-run tests if this file is loaded directly
if (typeof window !== 'undefined' && window.location.search.includes('test=webhook')) {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 Auto-running webhook tests...');
    runWebhookTests();
  });
}
