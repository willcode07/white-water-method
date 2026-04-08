import React, { useState } from 'react';
import './FitnessWebsite.css';
import FitnessAssessment from './FitnessAssessment';
import CalendlyWidget from './CalendlyWidget';

const logoSrc = `${process.env.PUBLIC_URL || ''}/wwm-logo.png`;

const FitnessWebsite = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [expandedOffer, setExpandedOffer] = useState(null);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="fitness-website">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img
              src={logoSrc}
              alt=""
              className="logo-mark"
              width={40}
              height={40}
              decoding="async"
            />
            <span className="logo-text">White Water Method</span>
          </div>
          <ul className="nav-menu">
            <li><a href="#home" onClick={() => scrollToSection('home')} className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
            <li><a href="#about" onClick={() => scrollToSection('about')} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
            <li><a href="#how-we-help" onClick={() => scrollToSection('how-we-help')} className={activeSection === 'how-we-help' ? 'active' : ''}>How We Help</a></li>
            <li><a href="#offer" onClick={() => scrollToSection('offer')} className={activeSection === 'offer' ? 'active' : ''}>What We Offer</a></li>
            <li><a href="#assessment" onClick={() => { setShowAssessment(true); scrollToSection('assessment'); }} className={activeSection === 'assessment' ? 'active' : ''}>Assessment</a></li>
            <li><a href="#testimonials" onClick={() => scrollToSection('testimonials')} className={activeSection === 'testimonials' ? 'active' : ''}>Testimonials</a></li>
          </ul>
          <button className="cta-button" onClick={() => setShowCalendly(true)}>
            Get Started
          </button>
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
          <h1 className="hero-title">NOT ANOTHER GENERIC STRENGTH PROGRAM</h1>
          <p className="hero-subtitle">
            We solve your specific swimming problems. From painful shoulders to technique breakdowns, 
            we identify what's holding you back and create a personalized program to get you from where 
            you are to where you need to be.
          </p>
          <button className="hero-cta" onClick={() => setShowCalendly(true)}>
            Get Your Personalized Solution
          </button>
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
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="assessment-button" onClick={() => setShowCalendly(true)}>
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* How We Help Section - Point A to Point B */}
      <section id="how-we-help" className="how-we-help-section">
        <div className="section-container">
          <h2 className="section-title">How We Get You From Point A to Point B</h2>
          <p className="section-description">
            Our problem-solving approach starts with understanding where you are and creating a clear, 
            individualized path to where you want to be.
          </p>
          <div className="process-steps">
            <div className="process-step">
              <div className="process-number">1</div>
              <div className="process-content">
                <h3>Identify Your Specific Problems</h3>
                <p>
                  Through detailed movement assessment and conversation, we identify exactly what's 
                  limiting your performance. Is it shoulder mobility? Core instability? Muscle imbalances? 
                  We find the root cause, not just the symptoms.
                </p>
              </div>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="process-number">2</div>
              <div className="process-content">
                <h3>Design Your Personalized Program</h3>
                <p>
                  No cookie-cutter workouts. Your program is built specifically to address YOUR 
                  identified issues and move YOU toward YOUR goals. Every exercise is chosen for 
                  a purpose, based on anatomy, movement science, and your individual needs.
                </p>
              </div>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="process-number">3</div>
              <div className="process-content">
                <h3>Track Progress & Adjust</h3>
                <p>
                  As you progress, we continuously assess and refine your program. What worked 
                  last month might need adjustment next month. Your program evolves with you, 
                  ensuring you're always moving toward your goals.
                </p>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="assessment-button" onClick={() => setShowAssessment(true)}>
              Start Your Assessment
            </button>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section id="offer" className="offer-section">
        <div className="section-container">
          <h2 className="section-title">What We Offer</h2>
          <p className="section-description offer-section-lead">
            Custom programming for swimmers and teams. Expand a card for what&apos;s included, how it
            works, and pricing—then book a consultation or start with an assessment.
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
                        <li>Consultation to align on problems and goals</li>
                        <li>Movement and fitness assessment</li>
                        <li>Your personalized program is delivered</li>
                        <li>Ongoing check-ins and adjustments</li>
                      </ol>
                    </div>
                  </div>
                  <div className="offer-detail-section offer-detail-investment">
                    <h4>Investment</h4>
                    <p className="offer-price">From $XXX / month</p>
                    <p className="offer-price-note">Final rate depends on intensity and support level.</p>
                  </div>
                  <div className="offer-cta-group">
                    <button 
                      className="offer-primary-cta" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCalendly(true);
                      }}
                    >
                      Schedule Consultation
                    </button>
                    <button 
                      className="offer-secondary-cta" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAssessment(true);
                      }}
                    >
                      Take Assessment First
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
                        <li>Consultation on team issues, roster, and schedule</li>
                        <li>Assessments to map group and individual needs</li>
                        <li>Custom program design and staff walkthrough</li>
                        <li>Ongoing support and seasonal adjustments</li>
                      </ol>
                    </div>
                  </div>
                  <div className="offer-detail-section offer-detail-investment">
                    <h4>Investment</h4>
                    <p className="offer-price">From $XXX / month per team</p>
                    <p className="offer-price-note">Based on roster size and program scope.</p>
                  </div>
                  <div className="offer-cta-group">
                    <button 
                      className="offer-primary-cta" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCalendly(true);
                      }}
                    >
                      Schedule Team Consultation
                    </button>
                    <button 
                      className="offer-secondary-cta" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAssessment(true);
                      }}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div 
              className={`offer-card ${expandedOffer === 'injury' ? 'expanded' : ''}`}
              onClick={() => setExpandedOffer(expandedOffer === 'injury' ? null : 'injury')}
            >
              <div className="offer-card-header">
                <div className="offer-icon">🩺</div>
                <div className="offer-header-content">
                  <h3>Injury Recovery</h3>
                  <p>Rehab and return-to-swim planning, coordinated with your care team when appropriate.</p>
                </div>
                <div className="expand-icon">{expandedOffer === 'injury' ? '−' : '+'}</div>
              </div>
              {expandedOffer === 'injury' && (
                <div className="offer-details">
                  <div className="offer-details-grid">
                    <div className="offer-detail-section">
                      <h4>What&apos;s included</h4>
                      <ul>
                        <li>Injury-specific rehab progression</li>
                        <li>Coordination with your providers when needed</li>
                        <li>Gradual return-to-training plan</li>
                        <li>Movement quality and re-injury prevention</li>
                        <li>Priority messaging for faster turnaround</li>
                      </ul>
                    </div>
                    <div className="offer-detail-section">
                      <h4>How it works</h4>
                      <ol>
                        <li>Consultation, goals, and medical history review</li>
                        <li>Custom rehab program for your injury and stage</li>
                        <li>Check-ins to progress load safely</li>
                        <li>Build back to full training and competition</li>
                      </ol>
                    </div>
                  </div>
                  <div className="offer-detail-section offer-detail-investment">
                    <h4>Investment</h4>
                    <p className="offer-price">From $XXX / month</p>
                    <p className="offer-price-note">Varies with injury complexity and timeline.</p>
                  </div>
                  <div className="offer-cta-group">
                    <button 
                      className="offer-primary-cta" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCalendly(true);
                      }}
                    >
                      Schedule Recovery Consultation
                    </button>
                    <button 
                      className="offer-secondary-cta" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAssessment(true);
                      }}
                    >
                      Start Assessment
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div 
              className={`offer-card ${expandedOffer === 'performance' ? 'expanded' : ''}`}
              onClick={() => setExpandedOffer(expandedOffer === 'performance' ? null : 'performance')}
            >
              <div className="offer-card-header">
                <div className="offer-icon">🏆</div>
                <div className="offer-header-content">
                  <h3>Performance Optimization</h3>
                  <p>Elite strength, periodization, and peaking aligned to your competition calendar.</p>
                </div>
                <div className="expand-icon">{expandedOffer === 'performance' ? '−' : '+'}</div>
              </div>
              {expandedOffer === 'performance' && (
                <div className="offer-details">
                  <div className="offer-details-grid">
                    <div className="offer-detail-section">
                      <h4>What&apos;s included</h4>
                      <ul>
                        <li>Strength and power development for your events</li>
                        <li>Meet-calendar periodization and peaking</li>
                        <li>Technique and recovery protocols</li>
                        <li>Mental performance tools where useful</li>
                        <li>Priority updates and fast program turns</li>
                      </ul>
                    </div>
                    <div className="offer-detail-section">
                      <h4>How it works</h4>
                      <ol>
                        <li>Performance assessment and goal setting</li>
                        <li>Review training load and competition schedule</li>
                        <li>Periodized plan tied to key meets</li>
                        <li>Weekly adjustments from training feedback and data</li>
                        <li>Peaking strategy for championship targets</li>
                      </ol>
                    </div>
                  </div>
                  <div className="offer-detail-section offer-detail-investment">
                    <h4>Investment</h4>
                    <p className="offer-price">From $XXX / month</p>
                    <p className="offer-price-note">Premium tier for elite support and programming depth.</p>
                  </div>
                  <div className="offer-cta-group">
                    <button 
                      className="offer-primary-cta" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCalendly(true);
                      }}
                    >
                      Schedule Performance Consultation
                    </button>
                    <button 
                      className="offer-secondary-cta" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAssessment(true);
                      }}
                    >
                      Take Performance Assessment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Fitness Assessment Section */}
      <section id="assessment" className="assessment-section">
        <div className="section-container">
          <h2 className="section-title">Identify Your Starting Point</h2>
          <p className="section-description">
            Our assessment helps us understand exactly where you are right now—your strengths, 
            limitations, and specific areas that need attention. This is the first step in creating 
            your personalized solution.
          </p>
          <button className="assessment-button" onClick={() => setShowAssessment(true)}>
            Start Your Assessment
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">Testimonials</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-avatar">JD</div>
              <p className="testimonial-text">
                "The personalized program helped me recover from my shoulder injury and 
                get back to training stronger than ever."
              </p>
              <p className="testimonial-author">- John D.</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-avatar">SM</div>
              <p className="testimonial-text">
                "I've seen incredible improvements in my strength and technique. The 
                program is challenging but achievable."
              </p>
              <p className="testimonial-author">- Sarah M.</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-avatar">MR</div>
              <p className="testimonial-text">
                "The best investment I've made in my fitness journey. The support and 
                guidance are unmatched."
              </p>
              <p className="testimonial-author">- Mike R.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="section-container">
          <h2 className="section-title">CONTACT US</h2>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <button className="assessment-button" onClick={() => setShowCalendly(true)}>
              Book Consultation
            </button>
          </div>
          <div className="newsletter-section">
            <h3 className="newsletter-title">Stay Updated</h3>
            <p className="newsletter-description">Subscribe to our newsletter for training tips, updates, and exclusive content.</p>
            <form className="newsletter-form" onSubmit={(e) => {
              e.preventDefault();
              // In a real app, you would submit the form data to a backend
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
        <p>© 2024 by White Water Method. All Rights Reserved.</p>
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
