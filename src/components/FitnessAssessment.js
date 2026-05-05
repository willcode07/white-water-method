import React, { useEffect, useMemo, useRef, useState } from 'react';
import './FitnessAssessment.css';

const STROKES = ['Butterfly', 'Backstroke', 'Breaststroke', 'Freestyle'];

const ASSESSMENT_VIDEO_BASE = `${process.env.PUBLIC_URL || ''}/assessment-videos`;
const movementVideoMap = {
  'thoracic-extension': {
    label: 'Thoracic extension demo video',
    sources: [
      { src: `${ASSESSMENT_VIDEO_BASE}/thoracic-extension.mp4`, type: 'video/mp4' },
      { src: `${ASSESSMENT_VIDEO_BASE}/thoracic-extension.mov`, type: 'video/quicktime' },
    ],
  },
  'thoracic-rotation': {
    label: 'Thoracic rotation demo video',
    sources: [
      { src: `${ASSESSMENT_VIDEO_BASE}/thoracic-rotation.mp4`, type: 'video/mp4' },
      { src: `${ASSESSMENT_VIDEO_BASE}/thoracic-rotation.mov`, type: 'video/quicktime' },
    ],
  },
  'hip-internal-rotation': {
    label: 'Hip internal rotation demo video',
    sources: [
      { src: `${ASSESSMENT_VIDEO_BASE}/hip-internal-rotation.mp4`, type: 'video/mp4' },
      { src: `${ASSESSMENT_VIDEO_BASE}/hip-internal-rotation.mov`, type: 'video/quicktime' },
    ],
  },
  'shoulder-external': {
    label: 'Shoulder external rotation demo video',
    sources: [
      { src: `${ASSESSMENT_VIDEO_BASE}/shoulder-external-rotation.mp4`, type: 'video/mp4' },
      { src: `${ASSESSMENT_VIDEO_BASE}/shoulder-external-rotation.mov`, type: 'video/quicktime' },
    ],
  },
  'shoulder-internal': {
    label: 'Shoulder internal rotation demo video',
    sources: [
      { src: `${ASSESSMENT_VIDEO_BASE}/shoulder-internal-rotation.mp4`, type: 'video/mp4' },
      { src: `${ASSESSMENT_VIDEO_BASE}/shoulder-internal-rotation.mov`, type: 'video/quicktime' },
    ],
  },
  'pelvic-tilt': {
    label: 'Pelvic tilt demo video',
    sources: [
      { src: `${ASSESSMENT_VIDEO_BASE}/pelvic-tilt.mp4`, type: 'video/mp4' },
      { src: `${ASSESSMENT_VIDEO_BASE}/pelvic-tilt.mov`, type: 'video/quicktime' },
    ],
  },
};

const initialContact = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  strokes: [],
};

const regionStatusLabel = {
  green: 'Looking good',
  amber: 'Mixed',
  red: 'Needs attention',
};

function buildReport(answers) {
  const rows = [];

  const ext = answers['thoracic-extension'];
  rows.push({
    key: 'thoracic-extension',
    title: 'Thoracic mobility: extension',
    status: ext === 'yes' ? 'pass' : 'fail',
    body:
      ext === 'yes'
        ? 'Pass!'
        : 'Needs work: swimmers often struggle to hold a clean line, which can load the shoulders and shorten strokes. Breathing can also pull you out of alignment.',
  });

  const rot = answers['thoracic-rotation'];
  rows.push({
    key: 'thoracic-rotation',
    title: 'Thoracic mobility: rotation',
    status: rot === 'yes' ? 'pass' : 'fail',
    body:
      rot === 'yes'
        ? 'Pass!'
        : 'Needs work: limited rotation can widen freestyle or backstroke and make breathing feel like a lift instead of a roll. That often steals power from the catch and can irritate the shoulders over time.',
  });

  const extL = answers['shoulder-external-left'];
  const extR = answers['shoulder-external-right'];
  const extPass = extL === 'yes' && extR === 'yes';
  rows.push({
    key: 'shoulder-external',
    title: 'Active Shoulder External Rotation',
    status: extPass ? 'pass' : 'fail',
    body: extPass
      ? 'Pass! Left and right look good.'
      : `Needs work: tough to reach a high elbow catch when external rotation is limited, which can stress the front of the shoulder over time.
Left: ${extL === 'yes' ? 'Pass' : 'Needs work'}, right: ${extR === 'yes' ? 'Pass' : 'Needs work'}`,
  });

  const intL = answers['shoulder-internal-left'];
  const intR = answers['shoulder-internal-right'];
  const intPass = intL === 'yes' && intR === 'yes';
  rows.push({
    key: 'shoulder-internal',
    title: 'Active Shoulder Internal Rotation',
    status: intPass ? 'pass' : 'fail',
    body: intPass
      ? 'Pass! Left and right look good.'
      : `Needs work: finishing the pull can feel stiff and recovery can look forced. You may leave power on the table in the lats and chest, and the shoulder can feel less supported over time.
Left: ${intL === 'yes' ? 'Pass' : 'Needs work'}, right: ${intR === 'yes' ? 'Pass' : 'Needs work'}`,
  });

  const pelvis = answers['pelvic-tilt'];
  rows.push({
    key: 'pelvic-tilt',
    title: 'Pelvic Tilt',
    status: pelvis === 'yes' ? 'pass' : 'fail',
    body:
      pelvis === 'yes'
        ? 'Pass!'
        : 'Needs work: hip driven kick can turn knee heavy, and the low back may do more than the core. Hips can sink on fly or breast, or sway on free and back, which makes it harder to connect power from top to bottom.',
  });

  const hip = answers['hip-internal-rotation'];
  rows.push({
    key: 'hip-internal-rotation',
    title: 'Hip Internal Rotation',
    status: hip === 'yes' ? 'pass' : 'fail',
    body:
      hip === 'yes'
        ? 'Pass!'
        : 'Needs work: breaststroke kick can get wide with knees drifting forward, and knees, low back, feet, or hips may nag. Limited internal rotation can dull how well you use your hips across strokes.',
  });

  const ham = answers['tight-hamstrings'];
  rows.push({
    key: 'tight-hamstrings',
    title: 'Tight hamstrings?',
    status: ham === 'no' ? 'pass' : 'fail',
    body:
      ham === 'no'
        ? 'Pass!'
        : 'Often ties to pelvic position or stability and hamstrings that feel tight but may be overstretched, usually with room to strengthen core and glutes. Compare with the pelvic tilt screen.',
  });

  const hf = answers['tight-hip-flexors'];
  rows.push({
    key: 'tight-hip-flexors',
    title: 'Tight hip flexors?',
    status: hf === 'no' ? 'pass' : 'fail',
    body:
      hf === 'no'
        ? 'Pass!'
        : 'Often shows up with less pelvic stability and hip flexors that stay short, with core and glutes needing love. Hip internal rotation can be part of the story too. Compare with pelvic tilt and hip internal rotation.',
  });

  const lb = answers['tight-lower-back'];
  rows.push({
    key: 'tight-lower-back',
    title: 'Tight lower back?',
    status: lb === 'no' ? 'pass' : 'fail',
    body:
      lb === 'no'
        ? 'Pass!'
        : 'Often tracks back to pelvic stability and back muscles working overtime when the pelvis is not stacked. Compare with the pelvic tilt screen.',
  });

  const traps = answers['tight-upper-traps'];
  rows.push({
    key: 'tight-upper-traps',
    title: 'Tight upper traps?',
    status: traps === 'no' ? 'pass' : 'fail',
    body:
      traps === 'no'
        ? 'Pass!'
        : 'Often links to shoulder blade and rotator cuff mobility or strength, sometimes coming from the upper back. Compare with the thoracic mobility screens.',
  });

  return rows;
}

function getRegionStatus(rows, keys) {
  const scoped = rows.filter((row) => keys.includes(row.key));
  if (!scoped.length) return 'amber';
  const passCount = scoped.filter((row) => row.status === 'pass').length;
  if (passCount === scoped.length) return 'green';
  if (passCount === 0) return 'red';
  return 'amber';
}

const movementConfigs = [
  {
    slug: 'thoracic-extension',
    title: 'Thoracic mobility: extension',
    question: 'Can you achieve a minimum of 45 degrees of upper back extension?',
    instructions: [
      'Start in seated position with arms across the chest and hands on opposite shoulders.',
      'Take a big inhale, and when you exhale, without leaning back, drive your shoulders back and chest up while simultaneously lifting elbows up.',
      'You can lift your elbows as high as you’d like, but hands stay on the shoulders.',
    ],
    type: 'yesno',
    field: 'thoracic-extension',
  },
  {
    slug: 'thoracic-rotation',
    title: 'Thoracic mobility: rotation',
    question: 'Can you achieve a minimum of 45 degrees of torso rotation on both sides?',
    instructions: [
      'Start in seated position with knees tight together, arms across the chest, and hands on opposite shoulders.',
      'Keeping your knees tight together, take a big inhale, and when you exhale, rotate torso as far as you can to one side.',
      'Only rotate as far as you can without separating knees.',
    ],
    type: 'yesno',
    field: 'thoracic-rotation',
  },
  {
    slug: 'shoulder-external',
    title: 'Active shoulder: external rotation',
    question: 'Can you touch your same-side shoulder blade with your hand?',
    instructions: [
      'Start in standing position with arms to the side.',
      'Completing one side at a time, reach overhead and behind the back to try to touch the same side shoulder blade.',
    ],
    type: 'leftRight',
    fields: { left: 'shoulder-external-left', right: 'shoulder-external-right' },
  },
  {
    slug: 'shoulder-internal',
    title: 'Active shoulder: internal rotation',
    question: 'Can you touch your opposite-side shoulder blade with your hand? (Keep palm facing back, not towards your back.)',
    instructions: [
      'Start in standing position with arms to the side.',
      'Completing one side at a time, reach down and behind the back to try to touch the opposite side shoulder blade.',
    ],
    type: 'leftRight',
    fields: { left: 'shoulder-internal-left', right: 'shoulder-internal-right' },
  },
  {
    slug: 'pelvic-tilt',
    title: 'Pelvic Tilt',
    question:
      'Can you achieve movement of pelvis without involving lower or upper back, and without losing body position?',
    instructions: [
      'Start in standing position with arms across the chest.',
      'Get into a slight hinge position by pushing hip back, but keeping a neutral posture.',
      'Without losing body position, tuck your hips in and out.',
    ],
    type: 'yesno',
    field: 'pelvic-tilt',
  },
  {
    slug: 'hip-internal-rotation',
    title: 'Hip Internal Rotation',
    question: 'Did you achieve a minimum of 45 degrees internal rotation when measuring at the knee?',
    instructions: [
      'Start in seated position, with knees apart and in front of the hips, and hands to the side off the knees.',
      'Gently lift one foot off the ground, but keep the knee in front of the hip.',
      'Without moving the knee around or lifting hips off the chair, rotate your foot out to the side as far as possible.',
    ],
    type: 'yesno',
    field: 'hip-internal-rotation',
  },
  {
    slug: 'tightness',
    title: 'Mobility and tightness check in',
    question: 'Say yes if that area feels tight on you most days.',
    instructions: [],
    type: 'tightness',
    fields: [
      { field: 'tight-hamstrings', label: 'Tight hamstrings?' },
      { field: 'tight-hip-flexors', label: 'Tight hip flexors?' },
      { field: 'tight-lower-back', label: 'Tight lower back?' },
      { field: 'tight-upper-traps', label: 'Tight upper traps?' },
    ],
  },
];

const FitnessAssessment = ({ onClose, onBookConsultation, theme = 'light' }) => {
  const [phase, setPhase] = useState('contact');
  const [movementIndex, setMovementIndex] = useState(0);
  const [contact, setContact] = useState(initialContact);
  const [answers, setAnswers] = useState({});
  const [contactErrors, setContactErrors] = useState({});
  const [showAthleteSummary, setShowAthleteSummary] = useState(false);
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);
  const movementVideoRef = useRef(null);

  const totalMovementSteps = movementConfigs.length;
  const progressPercent = useMemo(() => {
    if (phase === 'contact') return 0;
    if (phase === 'results') return 100;
    return Math.round(((movementIndex + 1) / totalMovementSteps) * 100);
  }, [phase, movementIndex, totalMovementSteps]);

  const reportRows = useMemo(() => {
    if (phase !== 'results') return [];
    return buildReport(answers);
  }, [phase, answers]);

  const regionSummary = useMemo(() => {
    if (phase !== 'results') return [];
    return [
      {
        label: 'Thoracic Spine',
        status: getRegionStatus(reportRows, ['thoracic-extension', 'thoracic-rotation']),
      },
      {
        label: 'Shoulders',
        status: getRegionStatus(reportRows, ['shoulder-external', 'shoulder-internal', 'tight-upper-traps']),
      },
      {
        label: 'Pelvis and hips',
        status: getRegionStatus(reportRows, [
          'pelvic-tilt',
          'hip-internal-rotation',
          'tight-hamstrings',
          'tight-hip-flexors',
          'tight-lower-back',
        ]),
      },
    ];
  }, [phase, reportRows]);

  const validateContact = () => {
    const err = {};
    if (!contact.firstName.trim()) err.firstName = 'Required';
    if (!contact.lastName.trim()) err.lastName = 'Required';
    if (!contact.email.trim()) err.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) err.email = 'Enter a valid email';
    if (!contact.phone.trim()) err.phone = 'Required';
    if (!contact.country.trim()) err.country = 'Required';
    if (!contact.strokes.length) err.strokes = 'Select at least one stroke';
    setContactErrors(err);
    return Object.keys(err).length === 0;
  };

  const startMovements = () => {
    if (!validateContact()) return;
    setPhase('movement');
    setMovementIndex(0);
  };

  const setYesNo = (field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const currentMovement = movementConfigs[movementIndex];
  const currentVideo = currentMovement ? movementVideoMap[currentMovement.slug] : null;
  const nextVideo = useMemo(() => {
    if (phase !== 'movement' || movementIndex >= totalMovementSteps - 1) return null;
    const nextMovement = movementConfigs[movementIndex + 1];
    return movementVideoMap[nextMovement.slug] || null;
  }, [movementIndex, phase, totalMovementSteps]);

  useEffect(() => {
    if (phase !== 'movement') return;
    const videoEl = movementVideoRef.current;
    if (!videoEl) return;
    videoEl.currentTime = 0;
    const playPromise = videoEl.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Autoplay can fail on some devices despite muted/inline settings.
      });
    }
  }, [phase, movementIndex]);

  useEffect(() => {
    if (phase !== 'movement') return;
    const preloadUrls = [
      ...(currentVideo?.sources?.map((source) => source.src) || []),
      ...(nextVideo?.sources?.map((source) => source.src) || []),
    ];
    const links = preloadUrls.map((url) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = url;
      document.head.appendChild(link);
      return link;
    });
    return () => {
      links.forEach((link) => link.remove());
    };
  }, [currentVideo, nextVideo, phase]);

  const canAdvanceMovement = () => {
    if (!currentMovement) return false;
    const m = currentMovement;
    if (m.type === 'yesno') return answers[m.field] === 'yes' || answers[m.field] === 'no';
    if (m.type === 'leftRight') {
      return (
        (answers[m.fields.left] === 'yes' || answers[m.fields.left] === 'no') &&
        (answers[m.fields.right] === 'yes' || answers[m.fields.right] === 'no')
      );
    }
    if (m.type === 'tightness') {
      return m.fields.every(
        (f) => answers[f.field] === 'yes' || answers[f.field] === 'no'
      );
    }
    return false;
  };

  const goNextMovement = () => {
    if (movementIndex < totalMovementSteps - 1) {
      setMovementIndex((i) => i + 1);
    } else {
      setPhase('results');
    }
  };

  const goBack = () => {
    if (phase === 'results') {
      setPhase('movement');
      setMovementIndex(totalMovementSteps - 1);
      return;
    }
    if (phase === 'movement') {
      if (movementIndex > 0) {
        setMovementIndex((i) => i - 1);
      } else {
        setPhase('contact');
      }
      return;
    }
    if (phase === 'contact') {
      onClose();
    }
  };

  const toggleStroke = (stroke) => {
    setContact((c) => ({
      ...c,
      strokes: c.strokes.includes(stroke)
        ? c.strokes.filter((s) => s !== stroke)
        : [...c.strokes, stroke],
    }));
    setContactErrors((e) => ({ ...e, strokes: undefined }));
  };

  const resetAssessment = () => {
    setPhase('contact');
    setMovementIndex(0);
    setContact(initialContact);
    setAnswers({});
    setContactErrors({});
    setShowAthleteSummary(false);
    setShowDetailedBreakdown(false);
  };

  const mediaLabel = (slug) => {
    const labels = {
      'thoracic-extension': 'Photo or GIF: thoracic extension',
      'thoracic-rotation': 'Photo or GIF: thoracic rotation',
      'shoulder-external': 'Photo or GIF: shoulder external rotation',
      'shoulder-internal': 'Photo or GIF: shoulder internal rotation',
      'pelvic-tilt': 'Photo or GIF: pelvic tilt',
      'hip-internal-rotation': 'Photo or GIF: hip internal rotation',
      tightness: 'Photo or GIF (optional): general mobility',
    };
    return labels[slug] || 'Media placeholder';
  };

  return (
    <div className={`fitness-assessment fitness-assessment--theme-${theme}`}>
      <h2>White Water Method movement assessment</h2>

      {phase !== 'results' && (
        <div className="progress-bar" aria-hidden="true">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      )}

      {phase === 'contact' && (
        <>
          <p className="progress-text">Part 1 of 2: Your details</p>
          <form
            className="assessment-form"
            onSubmit={(e) => {
              e.preventDefault();
              startMovements();
            }}
          >
            <div className="assessment-form__grid">
              <label className="assessment-field">
                <span>First name</span>
                <input
                  type="text"
                  value={contact.firstName}
                  onChange={(e) => {
                    setContact({ ...contact, firstName: e.target.value });
                    setContactErrors({ ...contactErrors, firstName: undefined });
                  }}
                  autoComplete="given-name"
                />
                {contactErrors.firstName && (
                  <span className="assessment-field__error">{contactErrors.firstName}</span>
                )}
              </label>
              <label className="assessment-field">
                <span>Last name</span>
                <input
                  type="text"
                  value={contact.lastName}
                  onChange={(e) => {
                    setContact({ ...contact, lastName: e.target.value });
                    setContactErrors({ ...contactErrors, lastName: undefined });
                  }}
                  autoComplete="family-name"
                />
                {contactErrors.lastName && (
                  <span className="assessment-field__error">{contactErrors.lastName}</span>
                )}
              </label>
              <label className="assessment-field assessment-field--full">
                <span>Email</span>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => {
                    setContact({ ...contact, email: e.target.value });
                    setContactErrors({ ...contactErrors, email: undefined });
                  }}
                  autoComplete="email"
                />
                {contactErrors.email && (
                  <span className="assessment-field__error">{contactErrors.email}</span>
                )}
              </label>
              <label className="assessment-field assessment-field--full">
                <span>Phone number</span>
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => {
                    setContact({ ...contact, phone: e.target.value });
                    setContactErrors({ ...contactErrors, phone: undefined });
                  }}
                  autoComplete="tel"
                />
                {contactErrors.phone && (
                  <span className="assessment-field__error">{contactErrors.phone}</span>
                )}
              </label>
              <label className="assessment-field assessment-field--full">
                <span>Country</span>
                <input
                  type="text"
                  value={contact.country}
                  onChange={(e) => {
                    setContact({ ...contact, country: e.target.value });
                    setContactErrors({ ...contactErrors, country: undefined });
                  }}
                  autoComplete="country-name"
                />
                {contactErrors.country && (
                  <span className="assessment-field__error">{contactErrors.country}</span>
                )}
              </label>
            </div>
            <fieldset className="assessment-strokes">
              <legend>Primary stroke (select all that apply)</legend>
              <div className="assessment-strokes__grid">
                {STROKES.map((s) => (
                  <label key={s} className="assessment-checkbox">
                    <input
                      type="checkbox"
                      checked={contact.strokes.includes(s)}
                      onChange={() => toggleStroke(s)}
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
              {contactErrors.strokes && (
                <span className="assessment-field__error">{contactErrors.strokes}</span>
              )}
            </fieldset>
            <div className="assessment-form__actions">
              <button type="submit" className="primary-button">
                Continue
              </button>
            </div>
          </form>
        </>
      )}

      {phase === 'movement' && currentMovement && (
        <>
          <p className="progress-text">
            Part 2 of 2: Movement {movementIndex + 1} of {totalMovementSteps}
          </p>
          <div className="movement-screen">
            {currentMovement.type !== 'tightness' && (
              <div className="movement-media">
                {currentVideo ? (
                  <>
                    <video
                      key={currentMovement.slug}
                      ref={movementVideoRef}
                      className={`movement-media__video ${
                        currentMovement.slug === 'hip-internal-rotation'
                          ? 'movement-media__video--hip-internal-rotation'
                          : currentMovement.slug === 'shoulder-external'
                            ? 'movement-media__video--shoulder-external'
                            : ''
                      }`}
                      preload="metadata"
                      muted
                      playsInline
                      loop
                      autoPlay
                      controls
                      aria-label={currentVideo.label}
                    >
                      {currentVideo.sources.map((source) => (
                        <source key={source.src} src={source.src} type={source.type} />
                      ))}
                    </video>
                    <span className="movement-media__hint">
                      Demo video loops while you complete this movement.
                    </span>
                  </>
                ) : (
                  <>
                    <span className="movement-media__label">{mediaLabel(currentMovement.slug)}</span>
                    <span className="movement-media__hint">Add a movement demo video for this step.</span>
                  </>
                )}
              </div>
            )}
            <h3 className="movement-title">{currentMovement.title}</h3>
            {currentMovement.instructions.length > 0 && (
              <ol className="movement-instructions">
                {currentMovement.instructions.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ol>
            )}
            <p className="movement-question">{currentMovement.question}</p>

            {currentMovement.type === 'yesno' && (
              <div className="yn-row yn-row--single">
                <button
                  type="button"
                  className={`yn-button ${answers[currentMovement.field] === 'yes' ? 'is-selected' : ''}`}
                  onClick={() => setYesNo(currentMovement.field, 'yes')}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`yn-button ${answers[currentMovement.field] === 'no' ? 'is-selected' : ''}`}
                  onClick={() => setYesNo(currentMovement.field, 'no')}
                >
                  No
                </button>
              </div>
            )}

            {currentMovement.type === 'leftRight' && (
              <div className="lr-block">
                {['left', 'right'].map((side) => (
                  <div key={side} className="lr-side">
                    <p className="lr-side__label">{side === 'left' ? 'Left' : 'Right'}</p>
                    <div className="yn-row">
                      <button
                        type="button"
                        className={`yn-button ${
                          answers[currentMovement.fields[side]] === 'yes' ? 'is-selected' : ''
                        }`}
                        onClick={() => setYesNo(currentMovement.fields[side], 'yes')}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`yn-button ${
                          answers[currentMovement.fields[side]] === 'no' ? 'is-selected' : ''
                        }`}
                        onClick={() => setYesNo(currentMovement.fields[side], 'no')}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentMovement.type === 'tightness' && (
              <div className="tightness-list">
                {currentMovement.fields.map((item) => (
                  <div key={item.field} className="tightness-row">
                    <span className="tightness-row__label">{item.label}</span>
                    <div className="yn-row yn-row--compact">
                      <button
                        type="button"
                        className={`yn-button ${answers[item.field] === 'yes' ? 'is-selected' : ''}`}
                        onClick={() => setYesNo(item.field, 'yes')}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`yn-button ${answers[item.field] === 'no' ? 'is-selected' : ''}`}
                        onClick={() => setYesNo(item.field, 'no')}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="movement-nav">
              <button type="button" className="back-button" onClick={goBack}>
                ← Back
              </button>
              <button
                type="button"
                className="primary-button"
                disabled={!canAdvanceMovement()}
                onClick={goNextMovement}
              >
                {movementIndex < totalMovementSteps - 1 ? 'Next movement' : 'See results'}
              </button>
            </div>
          </div>
        </>
      )}

      {phase === 'results' && (
        <div className="results-container">
          <p className="progress-text">Your report</p>
          <h3>Assessment Results</h3>
          <div className="results-region-summary" aria-label="Body region summary">
            {regionSummary.map((region) => (
              <div key={region.label} className="results-region-summary__item">
                <span className="results-region-summary__label">{region.label}</span>
                <span
                  className={`results-region-summary__status results-region-summary__status--${region.status}`}
                  aria-label={`${region.label} status ${regionStatusLabel[region.status]}`}
                >
                  {regionStatusLabel[region.status]}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="results-toggle"
            onClick={() => setShowAthleteSummary((prev) => !prev)}
            aria-expanded={showAthleteSummary}
          >
            <span>Athlete Info Summary</span>
            <span>{showAthleteSummary ? '−' : '+'}</span>
          </button>
          {showAthleteSummary && (
            <div className="results-contact-summary">
              <h4>Your submission</h4>
              <p>
                <strong>Name:</strong> {contact.firstName} {contact.lastName}
              </p>
              <p>
                <strong>Email:</strong> {contact.email}
              </p>
              <p>
                <strong>Phone:</strong> {contact.phone}
              </p>
              <p>
                <strong>Country:</strong> {contact.country}
              </p>
              <p>
                <strong>Primary strokes:</strong> {contact.strokes.join(', ')}
              </p>
            </div>
          )}

          <button
            type="button"
            className="results-toggle"
            onClick={() => setShowDetailedBreakdown((prev) => !prev)}
            aria-expanded={showDetailedBreakdown}
          >
            <span>Detailed Breakdown</span>
            <span>{showDetailedBreakdown ? '−' : '+'}</span>
          </button>
          {showDetailedBreakdown && (
            <div className="results-report">
              {reportRows.map((row) => (
                <article
                  key={row.key}
                  className={`result-block result-block--${row.status}`}
                >
                  <h4>{row.title}</h4>
                  <p className="result-block__body">{row.body}</p>
                </article>
              ))}
            </div>
          )}

          <div className="results-actions">
            <button
              type="button"
              className="primary-button"
              onClick={() => {
                onClose();
                if (onBookConsultation) setTimeout(() => onBookConsultation(), 300);
              }}
            >
              Book a meeting
            </button>
            <button type="button" className="secondary-button" onClick={resetAssessment}>
              Retake assessment
            </button>
            <button type="button" className="secondary-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )}

      {phase === 'contact' && (
        <button type="button" className="back-button back-button--solo" onClick={onClose}>
          Cancel
        </button>
      )}
    </div>
  );
};

export default FitnessAssessment;
