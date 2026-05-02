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
  green: 'Good',
  amber: 'Concerning',
  red: 'Poor',
};

function buildReport(answers) {
  const rows = [];

  const ext = answers['thoracic-extension'];
  rows.push({
    key: 'thoracic-extension',
    title: 'Thoracic Mobility — Extension',
    status: ext === 'yes' ? 'pass' : 'fail',
    body:
      ext === 'yes'
        ? 'PASS!'
        : 'FAIL — Swimmer may struggle to maintain streamline position, and place unnecessary stress on shoulders (higher risk for shoulder pain). The swimmer’s strokes become shorter and less powerful, and breathing can throw off alignment.',
  });

  const rot = answers['thoracic-rotation'];
  rows.push({
    key: 'thoracic-rotation',
    title: 'Thoracic Mobility — Rotation',
    status: rot === 'yes' ? 'pass' : 'fail',
    body:
      rot === 'yes'
        ? 'PASS!'
        : 'FAIL — Swimmer may struggle with rotation in their strokes, especially backstroke and freestyle, possibly causing a wider and inefficient stroke. Breathing may be more difficult and may cause the swimmer to lift their head higher instead of efficiently rotating. The catch and pull lose power because of the inability to properly produce force, and lack of rotation increases the risk for swimmer’s shoulder.',
  });

  const extL = answers['shoulder-external-left'];
  const extR = answers['shoulder-external-right'];
  const extPass = extL === 'yes' && extR === 'yes';
  rows.push({
    key: 'shoulder-external',
    title: 'Active Shoulder External Rotation',
    status: extPass ? 'pass' : 'fail',
    body: extPass
      ? 'PASS! (Left and right)'
      : `FAIL — Swimmer may struggle to get into high elbow position in freestyle, having them not be able to get into a strong catch position. The shoulder joint can become less stable over time, increasing risk of swimmer’s shoulder. Lack of shoulder external rotation can also cause forward shoulder position which places unnecessary tension in front of the shoulder.
Left: ${extL === 'yes' ? 'PASS' : 'FAIL'} · Right: ${extR === 'yes' ? 'PASS' : 'FAIL'}`,
  });

  const intL = answers['shoulder-internal-left'];
  const intR = answers['shoulder-internal-right'];
  const intPass = intL === 'yes' && intR === 'yes';
  rows.push({
    key: 'shoulder-internal',
    title: 'Active Shoulder Internal Rotation',
    status: intPass ? 'pass' : 'fail',
    body: intPass
      ? 'PASS! (Left and right)'
      : `FAIL — Swimmer often cannot finish the pull behind the body, ultimately making the arm recovery look stiff and forced. Swimmer may also struggle to fully contract big muscles like the pecs and lats, leading to decreased force production. Over time, lack of internal rotation can increase risk of swimmer’s shoulder, and a weaker rotator cuff.
Left: ${intL === 'yes' ? 'PASS' : 'FAIL'} · Right: ${intR === 'yes' ? 'PASS' : 'FAIL'}`,
  });

  const pelvis = answers['pelvic-tilt'];
  rows.push({
    key: 'pelvic-tilt',
    title: 'Pelvic Tilt',
    status: pelvis === 'yes' ? 'pass' : 'fail',
    body:
      pelvis === 'yes'
        ? 'PASS!'
        : 'FAIL — Swimmer may struggle to kick from hips and compensate by kicking from the knees. Swimmer may also struggle to properly use their core and instead, rely on lower back muscles, leading to low back and hip flexor tightness or soreness. Hips also may sink in strokes like butterfly or breaststroke, and swing side to side on freestyle and backstroke. An unstable or immobile pelvis leads to inefficient force transfer from the upper body to the lower body, and vice versa.',
  });

  const hip = answers['hip-internal-rotation'];
  rows.push({
    key: 'hip-internal-rotation',
    title: 'Hip Internal Rotation',
    status: hip === 'yes' ? 'pass' : 'fail',
    body:
      hip === 'yes'
        ? 'PASS!'
        : 'FAIL — Swimmer may experience a wide kick during breaststroke and knees coming forward. Swimmer may also complain of knee, low back, foot/ankle or hip discomfort. Lack of hip internal rotation can also limit how well the swimmer can use their hips efficiently in the pool, leading to lackluster performance.',
  });

  const ham = answers['tight-hamstrings'];
  rows.push({
    key: 'tight-hamstrings',
    title: 'Tight hamstrings?',
    status: ham === 'no' ? 'pass' : 'fail',
    body:
      ham === 'no'
        ? 'PASS!'
        : 'Possible lack of pelvic position/stability and overstretched hamstrings, caused by lack of core and glute strength. (Refer to pelvic tilt assessment.)',
  });

  const hf = answers['tight-hip-flexors'];
  rows.push({
    key: 'tight-hip-flexors',
    title: 'Tight hip flexors?',
    status: hf === 'no' ? 'pass' : 'fail',
    body:
      hf === 'no'
        ? 'PASS!'
        : 'Possible lack of pelvic stability and shortened hip flexors, caused by a lack of core and glute strength. Can also be caused by a lack of hip internal rotation. (Refer to pelvic tilt and hip internal rotation assessment.)',
  });

  const lb = answers['tight-lower-back'];
  rows.push({
    key: 'tight-lower-back',
    title: 'Tight lower back?',
    status: lb === 'no' ? 'pass' : 'fail',
    body:
      lb === 'no'
        ? 'PASS!'
        : 'Possible lack of pelvic stability and overstressed spinal stabilizers from poorly aligned pelvis. (Refer to pelvic tilt assessment.)',
  });

  const traps = answers['tight-upper-traps'];
  rows.push({
    key: 'tight-upper-traps',
    title: 'Tight upper traps?',
    status: traps === 'no' ? 'pass' : 'fail',
    body:
      traps === 'no'
        ? 'PASS!'
        : 'Possible lack of shoulder blade and rotator cuff mobility and strength, stemming from possible lack of thoracic mobility or weakness. (Refer to thoracic mobility assessments.)',
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
    title: 'Thoracic Mobility — Extension',
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
    title: 'Thoracic Mobility — Rotation',
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
    title: 'Active Shoulder — External Rotation',
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
    title: 'Active Shoulder — Internal Rotation',
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
    title: 'Mobility & Tightness Check-In',
    question: 'Answer yes if you regularly feel tightness in that area.',
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
        label: 'Pelvis & Hips',
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
      <h2>White Water Method — Movement Assessment</h2>

      {phase !== 'results' && (
        <div className="progress-bar" aria-hidden="true">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      )}

      {phase === 'contact' && (
        <>
          <p className="progress-text">Part 1 of 2 — Your details</p>
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
            Part 2 of 2 — Movement {movementIndex + 1} of {totalMovementSteps}
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
