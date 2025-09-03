# WhatsApp Click Tracking for GTM

This implementation provides comprehensive tracking of all WhatsApp button clicks across the website, sending structured events to Google Tag Manager (GTM).

## 🎯 Event Details

When a WhatsApp button is clicked, the following event is fired to GTM:

```javascript
{
  event: 'whatsapp_click',
  whatsapp_action: 'schedule_visit', // Action type
  whatsapp_location: 'hero_section', // Button location
  whatsapp_url: 'https://wa.me/...', // Full WhatsApp URL
  whatsapp_text: 'Olá! Quero agendar...' // Message text
}
```

## 📍 Tracked Locations

The system tracks WhatsApp buttons in the following locations:

| Location | Action | Description |
|----------|--------|-------------|
| `cta_buttons` | `receive_price_table` | Main CTA buttons component |
| `navigation_mobile` | `get_info` | Mobile navigation menu |
| `hero_section` | `get_info` | Property hero sections |
| `final_cta` | `schedule_visit` | Final call-to-action sections |
| `final_cta_home` | `schedule_visit` | Home page final CTA |
| `galeria` | `schedule_visit` | Gallery page buttons |
| `plantas` | `schedule_visit` | Floor plans page buttons |
| `compre_ganhe` | `get_offer` | Special offer page buttons |

## 🔧 GTM Configuration

### 1. Create Custom Event Trigger

In GTM, create a new trigger:

- **Trigger Type**: Custom Event
- **Event Name**: `whatsapp_click`
- **This trigger fires on**: All Custom Events

### 2. Create Data Layer Variables

Create the following variables to capture event data:

#### WhatsApp Action Variable
- **Variable Type**: Data Layer Variable
- **Data Layer Variable Name**: `whatsapp_action`
- **Variable Name**: `WhatsApp Action`

#### WhatsApp Location Variable
- **Variable Type**: Data Layer Variable
- **Data Layer Variable Name**: `whatsapp_location`
- **Variable Name**: `WhatsApp Location`

#### WhatsApp URL Variable
- **Variable Type**: Data Layer Variable
- **Data Layer Variable Name**: `whatsapp_url`
- **Variable Name**: `WhatsApp URL`

#### WhatsApp Text Variable
- **Variable Type**: Data Layer Variable
- **Data Layer Variable Name**: `whatsapp_text`
- **Variable Name**: `WhatsApp Text`

### 3. Create Tags

#### Google Analytics 4 Event Tag
- **Tag Type**: Google Analytics: GA4 Event
- **Event Name**: `whatsapp_click`
- **Event Parameters**:
  - `action`: `{{WhatsApp Action}}`
  - `location`: `{{WhatsApp Location}}`
  - `url`: `{{WhatsApp URL}}`
  - `message_text`: `{{WhatsApp Text}}`
- **Triggering**: WhatsApp Click Trigger

#### Facebook Pixel Event Tag (Optional)
- **Tag Type**: Facebook Pixel
- **Event Type**: Custom Event
- **Event Name**: `WhatsAppClick`
- **Event Parameters**:
  - `action`: `{{WhatsApp Action}}`
  - `location`: `{{WhatsApp Location}}`
- **Triggering**: WhatsApp Click Trigger

## 🎨 Implementation Details

### Automatic Detection
The tracking script automatically detects:
- All links containing `wa.me` in the href
- All elements with the `whatsapp-button` class
- Dynamically added WhatsApp buttons (via MutationObserver)

### Manual Button Setup
To manually add tracking to a WhatsApp button:

```html
<a 
  href="https://wa.me/5511999999999?text=Hello"
  class="whatsapp-button"
  data-whatsapp-action="custom_action"
  data-whatsapp-location="custom_location"
>
  📱 WhatsApp
</a>
```

### Context-Based Detection
If `data-whatsapp-location` is not provided, the script automatically detects location based on parent elements:
- Elements with `hero` in class name → `hero`
- Elements with `cta` in class name → `cta`
- Elements with `nav` in class name → `navigation`
- Elements with `footer` in class name → `footer`
- Elements with `sticky` in class name → `sticky`

## 📊 Analytics Benefits

This implementation provides:

1. **Comprehensive Tracking**: All WhatsApp interactions are captured
2. **Detailed Context**: Know exactly where users click WhatsApp buttons
3. **Message Content**: Track what messages users are sending
4. **Conversion Funnel**: Understand the customer journey
5. **A/B Testing**: Compare performance of different button placements

## 🔍 Debugging

### Console Logging
All WhatsApp clicks are logged to the browser console for debugging:

```javascript
console.log('WhatsApp click tracked:', {
  event: 'whatsapp_click',
  action: 'schedule_visit',
  location: 'hero_section',
  url: 'https://wa.me/...',
  text: 'Message text'
});
```

### GTM Preview Mode
Use GTM's Preview mode to verify events are firing correctly:
1. Enable Preview mode in GTM
2. Navigate to your website
3. Click WhatsApp buttons
4. Check the GTM debugger for `whatsapp_click` events

## 🚀 Advanced Usage

### Custom Event Parameters
You can add additional tracking parameters by modifying the tracking script in `src/utils/whatsapp-tracking.js`.

### Integration with Other Analytics
The script also fires gtag events for direct Google Analytics integration:

```javascript
gtag('event', 'whatsapp_click', {
  event_category: 'WhatsApp',
  event_label: 'hero_section_get_info',
  value: 1
});
```

## 📝 Files Modified

The following files were updated to implement WhatsApp tracking:

- `src/utils/whatsapp-tracking.js` - Main tracking script
- `src/layouts/Layout.astro` - Global script inclusion
- `src/components/CTAButtons.astro` - CTA button tracking
- `src/components/Navigation.jsx` - Navigation tracking
- `src/components/PropertyPage.astro` - Property page tracking
- `src/components/property/HeroSection.astro` - Hero section tracking
- `src/pages/squaredesign.astro` - Home page tracking

## 🎯 GTM Trigger Examples

### Track All WhatsApp Clicks
```
Trigger Type: Custom Event
Event Name: whatsapp_click
```

### Track Only Schedule Visit Actions
```
Trigger Type: Custom Event
Event Name: whatsapp_click
Some Custom Events
whatsapp_action equals schedule_visit
```

### Track Hero Section Clicks Only
```
Trigger Type: Custom Event
Event Name: whatsapp_click
Some Custom Events
whatsapp_location equals hero_section
```

This comprehensive tracking system ensures you never miss a WhatsApp interaction and can optimize your conversion funnel based on real user behavior data.
