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
            aria-label="White Water Method — home"
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
          <h1 className="hero-title">START WITH YOUR FREE ASSESSMENT</h1>
          <p className="hero-subtitle">
            Complete the movement assessment first—you&apos;ll see a clear report of how mobility and
            tightness may relate to your stroke. Then book a meeting to align on your goals and program
            fit.
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
          />
          <img 
            src="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop&q=80" 
            alt="Swimmer training" 
            className="hero-image"
          />
          <img 
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop&q=80" 
            alt="Competitive swimmer diving" 
            className="hero-image"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-container">
          <h2 className="section-title">Created for swimmers by a swimmer.</h2>
          <p className="section-description">
            White Water Method isn't a one-size-fits-all program. We understand that every swimmer 
            has unique limitations, imbalances, and goals. Through comprehensive assessment and 
            movement analysis, we identify the root causes of your problems—whether that's chronic 
            shoulder pain, technique issues, or performance plateaus—and design a program that 
            specifically addresses what YOU need to improve.
          </p>
        </div>
      </section>

      {/* How We Help Section - Point A to Point B */}
      <section id="how-we-help" className="how-we-help-section">
        <div className="section-container">
          <h2 className="section-title">How it works: point A to point B</h2>
          <p className="section-description">
            A simple three-step loop—assessment, targeted programming, and progression—so you always know
            where you stand and what comes next.
          </p>
          <div className="process-steps">
            <div className="process-step">
              <div className="process-number">1</div>
              <div className="process-content">
                <h3>Identify movement issues</h3>
                <p>
                  We identify possible physiological movement issues that may be hindering technique,
                  diminishing force output, and causing aches or pains.
                </p>
              </div>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="process-number">2</div>
              <div className="process-content">
                <h3>Build your program</h3>
                <p>
                  We create a program to improve current movement issues to alleviate discomfort, improve
                  efficiency in the water, and ultimately facilitate faster swimming.
                </p>
              </div>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="process-number">3</div>
              <div className="process-content">
                <h3>Progress with you</h3>
                <p>
                  We continue to build on each program so each swimmer keeps improving according to their
                  skill level and physiological needs—no matter the goal.
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
            Individual and team training for swimmers. Expand a card for what&apos;s included, how it works,
            and monthly pricing. Complete the assessment first so recommendations match your movement
            profile; the call is for alignment and next steps—not a pricing ambush.
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
                  <p>One-on-one programming built around your assessment, goals, and schedule.</p>
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
                        <li>Movement analysis to target root causes, not symptoms</li>
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
          <h2 className="section-title">Pricing &amp; transparency</h2>
          <p className="section-description transparency-lead">
            We want you fully informed before the call: what the program is, what benefits to expect, and
            what it costs. No hidden fees—just clear options so you can decide if White Water Method fits.
          </p>
          <ul className="transparency-list">
            <li>
              <strong>What you get:</strong> Swim-specific strength, mobility, and conditioning—not a generic
              gym template—with progression and support tailored after your assessment.
            </li>
            <li>
              <strong>Benefits:</strong> Better movement quality in the water, reduced nagging pain from
              compensations, and training that respects pool schedule and your event focus.
            </li>
            <li>
              <strong>Cost:</strong> Individual programming is <strong>$200/month</strong>. Team programs
              start at <strong>$500/month per team</strong> depending on roster size and scope (details in
              the cards above).
            </li>
            <li>
              <strong>After the assessment:</strong> Book a meeting to review your report, confirm fit,
              and onboard—already knowing the investment and what&apos;s included.
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
              <p className="testimonial-author">Carla Gonzalez — Venezuelan National Team</p>
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
              <p className="testimonial-author">Kurt Niehaus — KN Swim Academy</p>
            </div>
          </div>
        </div>
      </section>

      <section id="join" className="join-section">
        <div className="section-container">
          <h2 className="section-title">Stay Updated</h2>
          <div className="newsletter-section">
            <p className="newsletter-description">Subscribe to our newsletter for training tips, updates, and exclusive content.</p>
            <form className="newsletter-form" onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to our newsletter!');
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
