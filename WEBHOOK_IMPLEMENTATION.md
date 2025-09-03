# CORS-Compliant Webhook Implementation

## Overview
This document describes the CORS-compliant webhook implementation for all forms in the C21 Novos project.

## Webhook Endpoint
```
https://workflowwebhook.prospectz.com.br/webhook/lp-novos
```

## Implementation Pattern

### JavaScript Pattern Used
```javascript
// Get form data
const formData = new FormData(event.target);
const formEntries = Object.fromEntries(formData.entries());

// Get UTM parameters
const utmParameters = JSON.parse(localStorage.getItem('utmData') || '{}');

// Create payload
const payload = {
  ...formEntries,
  source: 'form-identifier',
  timestamp: new Date().toISOString(),
  ...utmParameters
};

// Send data to webhook (CORS-compliant)
const response = await fetch('https://workflowwebhook.prospectz.com.br/webhook/lp-novos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload)
});
```

## CORS Compliance Features

### ✅ What Makes It CORS-Compliant
- **Minimal Headers**: Only uses `Content-Type: application/json`
- **POST Method**: Uses standard POST method with JSON body
- **No Custom Headers**: Avoids custom headers that trigger preflight requests
- **Simple Request**: Follows simple request criteria to avoid CORS preflight

### ❌ What We Avoid
- Custom authentication headers
- Complex content types
- Non-standard HTTP methods
- Additional custom headers

## Implemented Forms

### 1. LeadForm.astro
- **Location**: `src/components/LeadForm.astro`
- **Form ID**: Configurable via props (default: `lead-form`)
- **Source Identifier**: Uses `formId` prop value
- **Features**: 
  - UTM parameter tracking
  - Google Analytics integration
  - Facebook Pixel integration
  - Success/error handling

### 2. LeadFormSticky.jsx
- **Location**: `src/components/LeadFormSticky.jsx`
- **Source Identifier**: `sticky-form`
- **Features**:
  - React-based sticky form
  - WhatsApp number formatting
  - Form validation
  - UTM parameter tracking
  - Analytics integration

## Utility Functions

### cors-webhook.js
- **Location**: `src/utils/cors-webhook.js`
- **Purpose**: Centralized CORS-compliant webhook submission
- **Function**: `submitToWebhook(data, source)`

### webhook-test.js
- **Location**: `src/utils/webhook-test.js`
- **Purpose**: Testing utilities for webhook functionality

## Test Page

### webhook-test.astro
- **Location**: `src/pages/webhook-test.astro`
- **URL**: `/webhook-test`
- **Features**:
  - Manual form testing
  - Automated test suite
  - Direct webhook testing
  - Console logging for debugging
  - Visual feedback for test results

## Data Structure

### Payload Format
```json
{
  "nome": "User Name",
  "telefone": "(11) 99999-9999",
  "source": "form-identifier",
  "timestamp": "2025-03-09T19:23:00.000Z",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "campaign_name",
  "utm_content": "ad_content",
  "utm_term": "keyword"
}
```

### Required Fields
- `nome`: User's name
- `telefone`: User's WhatsApp/phone number
- `source`: Form identifier
- `timestamp`: ISO timestamp

### Optional Fields
- UTM parameters (automatically included if available)
- Additional form fields

## Testing

### Manual Testing
1. Visit `/webhook-test` page
2. Fill out the test form
3. Submit and check console logs
4. Verify success/error messages

### Automated Testing
1. Use the test buttons on `/webhook-test` page
2. Run direct webhook tests
3. Run form simulation tests
4. Check browser console for detailed logs

## Error Handling

### Success Response
- HTTP 200-299 status codes
- Success message displayed to user
- Form reset
- Analytics tracking fired

### Error Response
- HTTP 400+ status codes
- Error message displayed to user
- Console error logging
- Form remains filled for retry

## Analytics Integration

### Google Analytics
```javascript
gtag('event', 'generate_lead', {
  event_category: 'Lead Form',
  event_label: trackingLabel,
  value: 1
});
```

### Facebook Pixel
```javascript
fbq('track', 'Lead', {
  content_name: 'Square Design Residence',
  content_category: 'Real Estate Lead'
});
```

## Security Considerations

- No sensitive data in client-side code
- Webhook endpoint handles CORS properly
- UTM data stored in localStorage (client-side only)
- Form validation on both client and server side

## Troubleshooting

### Common Issues
1. **CORS Errors**: Ensure webhook endpoint has proper CORS headers
2. **Network Errors**: Check internet connection and endpoint availability
3. **Validation Errors**: Verify required fields are filled
4. **UTM Data Missing**: Check if UTM tracking script is loaded

### Debug Steps
1. Open browser console
2. Check network tab for request/response
3. Verify payload structure
4. Test with `/webhook-test` page
5. Check server logs if available

## Maintenance

### Regular Checks
- Test webhook endpoint availability
- Verify CORS configuration
- Check analytics integration
- Monitor error rates
- Update UTM parameter handling as needed

### Updates
- Keep webhook endpoint URL updated
- Maintain consistent payload structure
- Update form validation rules
- Enhance error handling as needed
