export const prerender = false;

export async function POST({ request }) {
  try {
    // Get the form data from the request
    const formData = await request.json();
    
    // Add server-side timestamp and additional metadata
    const webhookData = {
      ...formData,
      server_timestamp: new Date().toISOString(),
      submitted_via: 'api_proxy'
    };
    
    // Forward the request to the actual webhook
    const webhookResponse = await fetch('https://workflowwebhook.prospectz.com.br/webhook/lp-novos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'C21-Novos-Proxy/1.0'
      },
      body: JSON.stringify(webhookData)
    });
    
    // Check if the webhook request was successful
    if (!webhookResponse.ok) {
      console.error('Webhook request failed:', webhookResponse.status, webhookResponse.statusText);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Webhook request failed',
          status: webhookResponse.status 
        }), 
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Get the response from the webhook (if any)
    let webhookResponseData = null;
    try {
      webhookResponseData = await webhookResponse.json();
    } catch (e) {
      // Webhook might not return JSON, that's okay
      webhookResponseData = { message: 'Success' };
    }
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully',
        webhook_response: webhookResponseData
      }), 
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
  } catch (error) {
    console.error('API endpoint error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error',
        message: error.message 
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
