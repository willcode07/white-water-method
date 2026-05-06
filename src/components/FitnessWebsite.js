import React, { useEffect, useState } from 'react';
import './FitnessWebsite.css';
import FitnessAssessment from './FitnessAssessment';
import CalendlyWidget from './CalendlyWidget';

const logoSrc = `${process.env.PUBLIC_URL || ''}/wwm-logo.png`;
const heroImgSwimmer = `${process.env.PUBLIC_URL || ''}/hero-swimmer-butterfly.png`;
const heroImgKettlebell = `${process.env.PUBLIC_URL || ''}/hero-kettlebell.png`;
const heroImgDumbbell = `${process.env.PUBLIC_URL || ''}/hero-dumbbell.png`;
const founderPhotoSrc = `${process.env.PUBLIC_URL || ''}/founder-carlos-omana.png`;

const THEME_KEY = 'wwm-theme';
const CONTACT_EMAIL = 'whitewatermethod@gmail.com';
const INSTAGRAM_URL = (
  process.env.REACT_APP_INSTAGRAM_URL || 'https://www.instagram.com'
).trim();

function InstagramIcon() {
  return (
    <svg
      className="footer-instagram__icon"
      width={22}
      height={22}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 110 2.881 1.44 1.44 0 010-2.881z"
      />
    </svg>
  );
}

function ThemeIconSun() {
  return (
    <svg
      className="theme-toggle__icon"
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function ThemeIconMoon() {
  return (
    <svg
      className="theme-toggle__icon"
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

const FitnessWebsite = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [expandedOffer, setExpandedOffer] = useState(null);
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {
      /* ignore */
    }
    if (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="fitness-website" data-theme={theme}>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <a
            href="#home"
            className="logo logo-link"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            aria-label="White Water Method home"
          >
            <img
              src={logoSrc}
              alt=""
              className="logo-mark"
              width={36}
              height={36}
              decoding="async"
            />
            <span className="logo-text">White Water Method</span>
          </a>
          <ul className="nav-menu">
            <li><a href="#about" onClick={() => scrollToSection('about')} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
            <li><a href="#founder" onClick={() => scrollToSection('founder')} className={activeSection === 'founder' ? 'active' : ''}>Founder</a></li>
            <li><a href="#how-we-help" onClick={() => scrollToSection('how-we-help')} className={activeSection === 'how-we-help' ? 'active' : ''}>How it works</a></li>
            <li><a href="#offer" onClick={() => scrollToSection('offer')} className={activeSection === 'offer' ? 'active' : ''}>What we offer</a></li>
            <li><a href="#testimonials" onClick={() => scrollToSection('testimonials')} className={activeSection === 'testimonials' ? 'active' : ''}>Testimonials</a></li>
            <li><a href="#join" onClick={() => scrollToSection('join')} className={activeSection === 'join' ? 'active' : ''}>Stay Updated</a></li>
          </ul>
          <div className="nav-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <ThemeIconSun /> : <ThemeIconMoon />}
            </button>
            <button className="cta-button" onClick={() => setShowAssessment(true)}>
              Take the assessment
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <img
            src={logoSrc}
            alt="White Water Method"
            className="hero-logo"
            width={320}
            height={320}
            decoding="async"
          />
          <h1 className="hero-title">Start With Your Free Assessment:</h1>
          <p className="hero-subtitle">
            Take the FREE Movement Assessment to better understand how movement limitations may be
            connected to your stroke and current symptoms!
          </p>
          <div className="hero-cta-group">
            <button
              className="hero-cta hero-cta-primary"
              onClick={() => setShowAssessment(true)}
            >
              Take the assessment
            </button>
            <button
              className="hero-cta hero-cta-secondary"
              onClick={() => setShowCalendly(true)}
            >
              Book a meeting
            </button>
          </div>
        </div>
        <div className="hero-images">
          <img
            src={heroImgSwimmer}
            alt="Swimmer at the surface during butterfly stroke, black and white"
            className="hero-image"
            width={400}
            height={300}
            decoding="async"
            loading="lazy"
          />
          <img
            src={heroImgKettlebell}
            alt="Athlete gripping a kettlebell on the gym floor with chalk dust in the air, black and white"
            className="hero-image"
            width={400}
            height={300}
            decoding="async"
            loading="lazy"
          />
          <img
            src={heroImgDumbbell}
            alt="Adjustable dumbbell with chalk dust in dramatic lighting, black and white"
            className="hero-image"
            width={400}
            height={300}
            decoding="async"
            loading="lazy"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-container">
          <h2 className="section-title">Built For Swimmers By A Swimmer</h2>
          <p className="section-description">
            White Water Method helps swimmers perform at their best by improving movement in the water
            and building the physical qualities they need to succeed. It&apos;s not a one size fits all
            approach. Each swimmer is trained based on their individual needs.
          </p>
          <p className="section-description">
            Swimmers are often told to adjust their technique, improve their turns, or pull harder. But
            without the prerequisite mobility, stability, strength, and power, those changes can be
            difficult to achieve. White Water Method bridges the gap between what coaches are asking for
            and what swimmers are able to do.
          </p>
          <p className="section-description">
            By developing a strong physical foundation, it leads to more effective practices, better
            technique, and reduced risk of pain or injury, supporting long-term success in the sport.
          </p>
        </div>
      </section>

      <section id="founder" className="founder-section">
        <div className="section-container">
          <h2 className="section-title">About the Founder</h2>
          <div className="founder-layout">
            <div className="founder-image-wrap">
              <img
                src={founderPhotoSrc}
                alt="Carlos Omana at the pool by a lane line, wearing a University of Florida swim cap, black and white portrait"
                className="founder-image"
                width={520}
                height={520}
                decoding="async"
                loading="lazy"
              />
            </div>
            <div className="founder-copy">
              <p className="founder-text">
                Carlos Omana is the owner of White Water Method. Omana trained under Coach Kirk Peppas
                and at the University of Florida during his swimming career. He also represented
                Venezuela internationally after his collegiate career.
              </p>
              <p className="founder-text">
                After swimming, Carlos pursued a career in strength and conditioning. He graduated with
                his M.S. in Human Performance and received certifications as a Certified Strength and
                Conditioning Specialist, USAW Level 1 Performance Coach, Performance Enhancement
                Specialist, and Certified Physical Preparation Specialist.
              </p>
              <p className="founder-text">
                In 2024, he started White Water Method which aims to help swimmers and coaches tackle
                physiological obstacles such as joint discomfort, technique issues, strength, power,
                mobility, etc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help Section - Point A to Point B */}
      <section id="how-we-help" className="how-we-help-section">
        <div className="section-container">
          <h2 className="section-title">How It Works</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="process-number">1</div>
              <div className="process-content">
                <p>
                  Identify possible physiological movement issues that may be hindering technique,
                  diminishing force output, and causing aches or pains.
                </p>
              </div>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="process-number">2</div>
              <div className="process-content">
                <p>
                  Create a program to improve current movement issues to alleviate discomfort, improve
                  efficiency in the water, and ultimately facilitate faster swimming.
                </p>
              </div>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="process-number">3</div>
              <div className="process-content">
                <p>
                  Continue to build on each program to ensure each swimmer continues to improve according
                  to their skill level and physiological needs, no matter the goal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section id="offer" className="offer-section">
        <div className="section-container">
          <h2 className="section-title">What We Offer</h2>
          <p className="section-description offer-section-lead">
            Open a program for what&apos;s included and monthly investment. New here? The FREE movement
            assessment is a great way to see how movement ties to your stroke. Ready to start? Book a
            meeting to sign up or talk next steps.
          </p>
          <div className="offer-grid">
            <div 
              className={`offer-card ${expandedOffer === 'individual' ? 'expanded' : ''}`}
              onClick={() => setExpandedOffer(expandedOffer === 'individual' ? null : 'individual')}
            >
              <div className="offer-card-header">
                <div className="offer-card-logo-wrap">
                  <img src={logoSrc} alt="" className="offer-card-logo" width={56} height={56} decoding="async" />
                </div>
                <div className="offer-header-content">
                  <h3>Individual Program</h3>
                  <p>Personal support, assessments, and training built around your goals.</p>
                </div>
                <div className="expand-icon">{expandedOffer === 'individual' ? '−' : '+'}</div>
              </div>
              {expandedOffer === 'individual' && (
                <div className="offer-details">
                  <div className="offer-card-media">
                    <img
                      src={logoSrc}
                      alt="White Water Method"
                      className="offer-card-media-img"
                      width={200}
                      height={200}
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <div className="offer-details-grid offer-details-grid--single">
                    <div className="offer-detail-section">
                      <h4>What&apos;s included</h4>
                      <ul>
                        <li>Monthly full body movement assessment</li>
                        <li>Bi-weekly check in through Zoom</li>
                        <li>Movement Prep</li>
                        <li>Strength Program</li>
                        <li>Performance Strategy Guidance PDF</li>
                        <li>Direct messaging through EverFit</li>
                        <li>Stroke biomechanical analysis through video</li>
                      </ul>
                    </div>
                  </div>
                  <div className="offer-detail-section offer-detail-investment">
                    <h4>Investment</h4>
                    <p className="offer-price">$200 / month</p>
                    <p className="offer-price-note">Individual programming and support.</p>
                  </div>
                  <div className="offer-cta-group">
                    <button
                      type="button"
                      className="offer-primary-cta"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCalendly(true);
                      }}
                    >
                      Book a meeting
                    </button>
                    <button
                      type="button"
                      className="offer-secondary-cta"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAssessment(true);
                      }}
                    >
                      Take the free assessment
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div 
              className={`offer-card ${expandedOffer === 'team' ? 'expanded' : ''}`}
              onClick={() => setExpandedOffer(expandedOffer === 'team' ? null : 'team')}
            >
              <div className="offer-card-header">
                <div className="offer-card-logo-wrap">
                  <img src={logoSrc} alt="" className="offer-card-logo" width={56} height={56} decoding="async" />
                </div>
                <div className="offer-header-content">
                  <h3>Team Program</h3>
                  <p>Team-wide training, coach support, and seasonal alignment.</p>
                </div>
                <div className="expand-icon">{expandedOffer === 'team' ? '−' : '+'}</div>
              </div>
              {expandedOffer === 'team' && (
                <div className="offer-details">
                  <div className="offer-card-media">
                    <img
                      src={logoSrc}
                      alt="White Water Method"
                      className="offer-card-media-img"
                      width={200}
                      height={200}
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <div className="offer-details-grid offer-details-grid--single">
                    <div className="offer-detail-section">
                      <h4>What&apos;s included</h4>
                      <ul>
                        <li>Bi-weekly check in through Zoom</li>
                        <li>Movement Prep</li>
                        <li>Strength Program</li>
                        <li>Performance Strategy Guidance</li>
                        <li>Direct messaging through EverFit</li>
                        <li>Stroke biomechanical analysis through video</li>
                        <li>Seasonal planning and coordination with swim coach</li>
                      </ul>
                    </div>
                  </div>
                  <div className="offer-detail-section offer-detail-investment">
                    <h4>Investment</h4>
                    <p className="offer-price">From $500 / month per team</p>
                    <p className="offer-price-note">Final rate depends on team size and program scope.</p>
                  </div>
                  <div className="offer-cta-group">
                    <button
                      type="button"
                      className="offer-primary-cta"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCalendly(true);
                      }}
                    >
                      Book a meeting
                    </button>
                    <button
                      type="button"
                      className="offer-secondary-cta"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAssessment(true);
                      }}
                    >
                      Take the free assessment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">Testimonials</h2>
          <div className="testimonials-grid testimonials-grid--two">
            <div className="testimonial-card">
              <div className="testimonial-avatar">CG</div>
              <p className="testimonial-text">
                I chose the White Water Method because I wanted a gym program specifically tailored to
                swimming and my unique needs. Knowing that Carlos has firsthand experience as an elite
                athlete gave me confidence in his approach. He designed a program that targeted my
                limitations, and within just one month, I saw noticeable improvements in the water and out
                of the water. Beyond the gym, Carlos provided advice on recovery and nutrition. I highly
                recommend this program to any swimmer looking for a personalized and results-driven program.
              </p>
              <p className="testimonial-author">Carla Gonzalez, Venezuelan National Team</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-avatar">KN</div>
              <p className="testimonial-text">
                I highly recommend the White Water Method physical preparation program. As a Master swimmer,
                I have personally followed this program and experienced its benefits firsthand. What stands
                out is its well-structured approach, combining strength, mobility, and sport-specific
                conditioning in a very effective way. The program does an excellent job of balancing
                intensity with proper technique. The sessions are engaging, progressive, and adaptable,
                making them ideal for athletes at different stages, including Master swimmers. Overall, the
                White Water Method is a professional, results-driven program that I would confidently
                recommend to any swimmer or athlete looking to elevate their physical preparation.
              </p>
              <p className="testimonial-author">Kurt Niehaus, KN Swim Academy</p>
            </div>
          </div>
        </div>
      </section>

      <section id="join" className="join-section">
        <div className="section-container">
          <h2 className="section-title">Stay Updated</h2>
          <div className="newsletter-section">
            <p className="newsletter-description">
              Join the list for training tips and occasional updates.
            </p>
            <form className="newsletter-form" onSubmit={(e) => {
              e.preventDefault();
              alert('Thanks! You are on the list.');
            }}>
              <div className="newsletter-input-group">
                <input type="text" placeholder="First name" className="newsletter-input" />
                <input type="email" placeholder="Email address*" className="newsletter-input" required />
                <button type="submit" className="newsletter-button">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-line">© 2026 White Water Method. All rights reserved.</p>
        <div className="footer-social">
          <p className="footer-email">
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
          <a
            href={INSTAGRAM_URL}
            className="footer-instagram"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="White Water Method on Instagram"
          >
            <InstagramIcon />
          </a>
        </div>
      </footer>

      {/* Calendly Modal */}
      {showCalendly && (
        <div className="modal-overlay" onClick={() => setShowCalendly(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowCalendly(false)}>×</button>
            <CalendlyWidget />
          </div>
        </div>
      )}

      {/* Assessment Modal */}
      {showAssessment && (
        <div className="modal-overlay" onClick={() => setShowAssessment(false)}>
          <div className="modal-content assessment-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowAssessment(false)}>×</button>
            <FitnessAssessment
              theme={theme}
              onClose={() => setShowAssessment(false)}
              onBookConsultation={() => setShowCalendly(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FitnessWebsite;
