import React, { useMemo } from 'react';
import './CalendlyWidget.css';

const CalendlyWidget = () => {
  const acuityUrl = useMemo(
    () =>
      process.env.REACT_APP_ACUITY_URL ||
      'https://app.acuityscheduling.com/schedule.php?owner=33240484&appointmentType=67811930',
    []
  );

  const showNote = acuityUrl.includes('owner=00000000');

  return (
    <div className="calendly-widget">
      <iframe
        title="Schedule your consultation"
        className="calendly-inline-widget"
        src={acuityUrl}
        frameBorder="0"
        style={{ minWidth: '320px', height: '700px' }}
      />
      {showNote && (
        <p className="calendly-note">
          <strong>Setup Required:</strong> Replace the Acuity owner placeholder in the URL.
          You can set this by creating a <code>.env</code> file with{' '}
          <code>
            REACT_APP_ACUITY_URL=
            {'https://app.acuityscheduling.com/schedule.php?owner=YOUR_OWNER_ID&appointmentType=YOUR_TYPE_ID'}
          </code>{' '}
          or update the URL directly in <code>CalendlyWidget.js</code>
        </p>
      )}
    </div>
  );
};

export default CalendlyWidget;

