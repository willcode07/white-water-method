import React, { useEffect, useState } from 'react';
import './CalendlyWidget.css';

const CalendlyWidget = () => {
  const [calendlyUrl] = useState(
    process.env.REACT_APP_CALENDLY_URL || 'https://calendly.com/your-username/consultation'
  );

  useEffect(() => {
    // Check if Calendly script is already loaded
    if (document.querySelector('script[src*="calendly.com"]')) {
      return;
    }

    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Load Calendly CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      // Cleanup
      const scriptElement = document.querySelector('script[src*="calendly.com"]');
      const linkElement = document.querySelector('link[href*="calendly.com"]');
      if (scriptElement) document.body.removeChild(scriptElement);
      if (linkElement) document.head.removeChild(linkElement);
    };
  }, []);

  const showNote = calendlyUrl.includes('your-username');

  return (
    <div className="calendly-widget">
      <div 
        className="calendly-inline-widget" 
        data-url={calendlyUrl}
        style={{ minWidth: '320px', height: '700px' }}
      />
      {showNote && (
        <p className="calendly-note">
          <strong>Setup Required:</strong> Replace "your-username" with your actual Calendly username.
          You can set this by creating a <code>.env</code> file with <code>REACT_APP_CALENDLY_URL=https://calendly.com/your-actual-username/consultation</code>
          or update the URL directly in <code>CalendlyWidget.js</code>
        </p>
      )}
    </div>
  );
};

export default CalendlyWidget;

