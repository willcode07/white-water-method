import React, { useEffect, useState } from 'react';
import './FitnessWebsite.css';
import FitnessAssessment from './FitnessAssessment';
import CalendlyWidget from './CalendlyWidget';

const logoSrc = `${process.env.PUBLIC_URL || ''}/wwm-logo.png`;

const THEME_KEY = 'wwm-theme';
const CONTACT_EMAIL = 'whitewatermethod@gmail.com';

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
            <li><a href="#how-we-help" onClick={() => scrollToSection('how-we-help')} className={activeSection === 'how-we-help' ? 'active' : ''}>How it works</a></li>
            <li><a href="#offer" onClick={() => scrollToSection('offer')} className={activeSection === 'offer' ? 'active' : ''}>What we offer</a></li>
            <li><a href="#transparency" onClick={() => scrollToSection('transparency')} className={activeSection === 'transparency' ? 'active' : ''}>Pricing</a></li>
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
          <h1 className="hero-title">Start with your free assessment</h1>
          <p className="hero-subtitle">
            Take the movement assessment first. You&apos;ll get a clear snapshot of how mobility and
            tightness may relate to your stroke. Then book a call to line up goals and program fit.
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
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&q=80"
            alt="Swimmer in action"
            className="hero-image"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop&q=80"
            alt="Swimmer training"
            className="hero-image"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop&q=80"
            alt="Competitive swimmer diving"
            className="hero-image"
            loading="lazy"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-container">
          <h2 className="section-title">Built for swimmers by a swimmer.</h2>
          <p className="section-description">
            White Water Method is not a one size fits all plan. Every swimmer has their own limits,
            imbalances, and goals. With a full assessment and movement review, we find what is holding
            you back (sore shoulders, stroke habits, or a plateau) and build programming around what you
            need most.
          </p>
        </div>
      </section>

      {/* How We Help Section - Point A to Point B */}
      <section id="how-we-help" className="how-we-help-section">
        <div className="section-container">
          <h2 className="section-title">How it works</h2>
          <p className="section-description">
            Three simple steps: assess, train with purpose, then progress. You always know where you are
            and what is next.
          </p>
          <div className="process-steps">
            <div className="process-step">
              <div className="process-number">1</div>
              <div className="process-content">
                <h3>See what is limiting you</h3>
                <p>
                  We look for movement patterns that may be slowing technique, softening power, or
                  feeding everyday aches.
                </p>
              </div>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="process-number">2</div>
              <div className="process-content">
                <h3>Build your program</h3>
                <p>
                  We shape training to address what we find so you feel better, move cleaner in the water,
                  and swim faster over time.
                </p>
              </div>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="process-number">3</div>
              <div className="process-content">
                <h3>Progress with you</h3>
                <p>
                  We keep updating your plan as you level up, whether you are chasing a big meet or just
                  want to feel strong again.
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
            Training for individuals and teams. Open a card for what is included, how it works, and
            monthly pricing. Finish the assessment first so guidance matches your movement; the call is
            simply to align and plan next steps.
          </p>
          <div className="offer-grid">
            <div 
              className={`offer-card ${expandedOffer === 'individual' ? 'expanded' : ''}`}
              onClick={() => setExpandedOffer(expandedOffer === 'individual' ? null : 'individual')}
            >
              <div className="offer-card-header">
                <div className="offer-icon">👤</div>
                <div className="offer-header-content">
                  <h3>Individual Training</h3>
                  <p>One on one programming built around your assessment, goals, and schedule.</p>
                </div>
                <div className="expand-icon">{expandedOffer === 'individual' ? '−' : '+'}</div>
              </div>
              {expandedOffer === 'individual' && (
                <div className="offer-details">
                  <div className="offer-details-grid">
                    <div className="offer-detail-section">
                      <h4>What&apos;s included</h4>
                      <ul>
                        <li>Program tailored to your limitations, goals, and pool schedule</li>
                        <li>Weekly updates as you progress</li>
                        <li>Movement work aimed at causes, not quick fixes</li>
                        <li>Direct messaging for questions and tweaks</li>
                        <li>Recovery and prehab built into the plan</li>
                      </ul>
                    </div>
                    <div className="offer-detail-section">
                      <h4>How it works</h4>
                      <ol>
                        <li>Take the assessment so we understand your starting point</li>
                        <li>Book a call to align on problems, goals, and program fit</li>
                        <li>Your personalized program is delivered</li>
                        <li>Ongoing check-ins and adjustments</li>
                      </ol>
                    </div>
                  </div>
                  <div className="offer-detail-section offer-detail-investment">
                    <h4>Investment</h4>
                    <p className="offer-price">$200 / month</p>
                    <p className="offer-price-note">Individual programming and support.</p>
                  </div>
                  <div className="offer-cta-group offer-cta-group-single">
                    <button
                      className="offer-primary-cta"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAssessment(true);
                      }}
                    >
                      Take the assessment
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
                <div className="offer-icon">👥</div>
                <div className="offer-header-content">
                  <h3>Team Training</h3>
                  <p>Team-wide programming with variations for age groups, events, and common problem areas.</p>
                </div>
                <div className="expand-icon">{expandedOffer === 'team' ? '−' : '+'}</div>
              </div>
              {expandedOffer === 'team' && (
                <div className="offer-details">
                  <div className="offer-details-grid">
                    <div className="offer-detail-section">
                      <h4>What&apos;s included</h4>
                      <ul>
                        <li>Team plan plus individual variations where needed</li>
                        <li>Coach education on anatomy and the &quot;why&quot; behind each block</li>
                        <li>Progress tracking and regular program updates</li>
                        <li>Prehab protocols for common swim issues</li>
                      </ul>
                    </div>
                    <div className="offer-detail-section">
                      <h4>How it works</h4>
                      <ol>
                        <li>Team lead completes the assessment and shares roster context</li>
                        <li>Book a call to scope program depth, schedule, and age groups</li>
                        <li>Custom program design and staff walkthrough</li>
                        <li>Ongoing support and seasonal adjustments</li>
                      </ol>
                    </div>
                  </div>
                  <div className="offer-detail-section offer-detail-investment">
                    <h4>Investment</h4>
                    <p className="offer-price">From $500 / month per team</p>
                    <p className="offer-price-note">Final rate depends on team size and program scope.</p>
                  </div>
                  <div className="offer-cta-group offer-cta-group-single">
                    <button
                      className="offer-primary-cta"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAssessment(true);
                      }}
                    >
                      Take the assessment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="transparency" className="transparency-section">
        <div className="section-container">
          <h2 className="section-title">Pricing and transparency</h2>
          <p className="section-description transparency-lead">
            You should know what you are getting, what to expect, and what it costs before we chat. No
            surprise fees, just clear options so you can see if we are a fit.
          </p>
          <ul className="transparency-list">
            <li>
              <strong>What you get:</strong> Swim focused strength, mobility, and conditioning (not a
              generic gym plan), with progression and support shaped after your assessment.
            </li>
            <li>
              <strong>Benefits:</strong> Cleaner movement in the water, less everyday ache from
              compensations, and training that respects your pool time and event focus.
            </li>
            <li>
              <strong>Cost:</strong> Individual programming is <strong>$200/month</strong>. Team programs
              start at <strong>$500/month per team</strong> depending on roster size and scope (details in
              the cards above).
            </li>
            <li>
              <strong>After the assessment:</strong> Book a meeting to review your report, confirm fit,
              and get started, already knowing the investment and what is included.
            </li>
          </ul>
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
        <p className="footer-email">
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
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
