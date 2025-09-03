/**
 * WhatsApp Click Tracking for GTM
 * This script automatically tracks all WhatsApp button clicks and sends events to GTM
 */

// Initialize WhatsApp tracking
function initWhatsAppTracking() {
  // Track existing buttons
  trackExistingButtons();
  
  // Set up observer for dynamically added buttons
  observeNewButtons();
}

// Track existing WhatsApp buttons
function trackExistingButtons() {
  const whatsappButtons = document.querySelectorAll('a[href*="wa.me"], .whatsapp-button');
  
  whatsappButtons.forEach(button => {
    addWhatsAppTracking(button);
  });
}

// Add tracking to a specific button
function addWhatsAppTracking(button) {
  // Avoid adding multiple listeners
  if (button.hasAttribute('data-whatsapp-tracked')) {
    return;
  }
  
  button.setAttribute('data-whatsapp-tracked', 'true');
  
  button.addEventListener('click', function(e) {
    const action = this.getAttribute('data-whatsapp-action') || 'click';
    const location = this.getAttribute('data-whatsapp-location') || getLocationFromContext(this);
    const url = this.href;
    
    // Fire GTM event
    if (typeof window.dataLayer !== 'undefined') {
      window.dataLayer.push({
        event: 'whatsapp_click',
        whatsapp_action: action,
        whatsapp_location: location,
        whatsapp_url: url,
        whatsapp_text: extractWhatsAppText(url)
      });
    }
    
    // Also fire gtag event if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'whatsapp_click', {
        event_category: 'WhatsApp',
        event_label: `${location}_${action}`,
        value: 1
      });
    }
    
    // Console log for debugging
    console.log('WhatsApp click tracked:', {
      event: 'whatsapp_click',
      action: action,
      location: location,
      url: url,
      text: extractWhatsAppText(url)
    });
  });
}

// Get location from button context if not explicitly set
function getLocationFromContext(button) {
  // Check parent elements for context clues
  const parentClasses = button.closest('[class*="hero"]') ? 'hero' :
                       button.closest('[class*="cta"]') ? 'cta' :
                       button.closest('[class*="nav"]') ? 'navigation' :
                       button.closest('[class*="footer"]') ? 'footer' :
                       button.closest('[class*="sticky"]') ? 'sticky' :
                       'unknown';
  
  return parentClasses;
}

// Extract WhatsApp message text from URL
function extractWhatsAppText(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('text') || '';
  } catch (e) {
    return '';
  }
}

// Observe for dynamically added WhatsApp buttons
function observeNewButtons() {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Check if the added node is a WhatsApp button
          if (node.matches && (node.matches('a[href*="wa.me"]') || node.matches('.whatsapp-button'))) {
            addWhatsAppTracking(node);
          }
          
          // Check for WhatsApp buttons within the added node
          const whatsappButtons = node.querySelectorAll ? node.querySelectorAll('a[href*="wa.me"], .whatsapp-button') : [];
          whatsappButtons.forEach(button => {
            addWhatsAppTracking(button);
          });
        }
      });
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWhatsAppTracking);
} else {
  initWhatsAppTracking();
}

// Export for manual initialization if needed
window.initWhatsAppTracking = initWhatsAppTracking;
window.addWhatsAppTracking = addWhatsAppTracking;
