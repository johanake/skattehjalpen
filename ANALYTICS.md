# Analytics Implementation

This document describes the analytics system that tracks user visits and interactions on the Skattehjalpen website.

## Features

### Visit Tracking
- **Page visits**: Automatically tracks when users visit any page
- **IP hashing**: User IP addresses are hashed with a salt for privacy
- **User agents**: Tracks browser/device information
- **Referrer tracking**: Tracks where users came from
- **Session tracking**: Groups visits by user session

### Event Tracking
- **Button clicks**: Tracks clicks on important buttons like "Kom igång nu"
- **Form interactions**: Tracks tax form starts, steps, completions, and abandons
- **User journey**: Tracks progression through the tax declaration process
- **Conversion funnel**: Measures conversion rates at each step

### Analytics Dashboard
- **Admin access**: Protected admin page at `/admin/stats`
- **Date range filtering**: View analytics for specific time periods
- **Conversion metrics**: See conversion rates from visits to completions
- **Real-time activity**: View recent visits and events

## Environment Variables

Add these to your `.env` file:

```env
# Analytics configuration
IP_SALT=your-secret-salt-for-hashing-ips-change-in-production
ADMIN_ANALYTICS_KEY=your-admin-key-for-analytics-access
```

## Database Collections

### visits
- `ipHash`: Hashed IP address for privacy
- `userAgent`: Browser/device information
- `pagePath`: The page that was visited
- `referrer`: Where the user came from
- `timestamp`: When the visit occurred
- `sessionId`: Session identifier

### events
- `ipHash`: Hashed IP address for privacy
- `sessionId`: Session identifier
- `eventType`: Type of event (button_click, form_start, etc.)
- `eventCategory`: Category (navigation, tax_declaration, etc.)
- `eventData`: Additional event metadata
- `pagePath`: Page where the event occurred
- `userAgent`: Browser/device information
- `timestamp`: When the event occurred

## Usage

### Accessing Analytics Dashboard

1. Navigate to `/admin/stats`
2. Enter the admin key (set via `ADMIN_ANALYTICS_KEY` environment variable)
3. View analytics dashboard with:
   - Total visits and unique visitors
   - Conversion funnel from main page to form completion
   - Popular pages
   - Recent activity

### Default Admin Key
- Development: `admin123-change-in-production`
- **IMPORTANT**: Change this in production!

### Tracked Events

#### Main Page Interactions
- **Hero section button**: `start_tax_declaration` with location `hero_section`
- **Pricing section button**: `start_tax_declaration` with location `pricing_section`

#### Tax Declaration Journey
1. **Form start**: When user navigates to tax declaration
2. **Form steps**: Progress through declaration wizard
3. **Form completion**: When declaration is submitted
4. **Form abandonment**: When user leaves without completing

### Conversion Funnel Metrics

1. **Main Page Visits**: Total visits to landing page
2. **Button Clicks**: Users who clicked "Kom igång nu"
3. **Form Starts**: Users who started the tax declaration
4. **Form Completions**: Users who completed the tax declaration

Conversion rates are calculated between each step.

## Privacy & Security

### Data Protection
- **IP Hashing**: User IP addresses are SHA-256 hashed with a salt
- **No PII**: No personally identifiable information is stored
- **GDPR Compliant**: Anonymous usage data only
- **Session-based**: Tracking uses temporary session IDs

### Security Measures
- **Admin authentication**: Dashboard requires admin key
- **Rate limiting**: Prevent analytics spam (recommended in production)
- **Data retention**: Consider implementing data cleanup after X days

## Adding New Tracking

### Frontend Tracking
Use the `useAnalytics` hook in React components:

```tsx
import { useAnalytics } from '../hooks/useAnalytics';

const MyComponent = () => {
  const { trackButtonClick, trackTaxFormStep } = useAnalytics();
  
  const handleClick = () => {
    trackButtonClick('my_button', { location: 'header' });
  };
  
  return <button onClick={handleClick}>Click me</button>;
};
```

### Available Tracking Methods
- `trackEvent(event)`: Generic event tracking
- `trackButtonClick(buttonId, data?)`: Track button clicks
- `trackTaxFormStart()`: Track form start
- `trackTaxFormStep(step, stepName?)`: Track form progress
- `trackTaxFormComplete()`: Track form completion
- `trackFormAbandon(step?, stepName?)`: Track form abandonment

## Production Considerations

1. **Change default credentials**:
   - Set strong `ADMIN_ANALYTICS_KEY`
   - Set unique `IP_SALT`

2. **Database indexes**: The analytics models include proper indexes for performance

3. **Rate limiting**: Consider adding rate limits to prevent spam

4. **Data cleanup**: Implement periodic cleanup of old analytics data

5. **Monitoring**: Monitor database size and performance with analytics enabled