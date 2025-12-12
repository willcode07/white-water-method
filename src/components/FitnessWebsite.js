import React, { useState } from 'react';
import './FitnessWebsite.css';
import FitnessAssessment from './FitnessAssessment';
import CalendlyWidget from './CalendlyWidget';

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
            <div className="logo-icon">W</div>
            <span className="logo-text">White Water Method</span>
          </div>
          <ul className="nav-menu">
            <li><a href="#home" onClick={() => scrollToSection('home')} className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
            <li><a href="#about" onClick={() => scrollToSection('about')} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
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
          <h1 className="hero-title">UNLEASH YOUR POTENTIAL</h1>
          <p className="hero-subtitle">
            Painful joints? Want to improve technique? Need more strength and power?
          </p>
          <button className="hero-cta" onClick={() => setShowCalendly(true)}>
            Book Consultation
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
            White Water Method offers personalized online strength and conditioning programs 
            designed to help you reach your peak performance. Whether you're recovering from 
            injury, looking to improve your technique, or building strength and power, 
            we provide customized training solutions tailored to your unique needs.
          </p>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="assessment-button" onClick={() => setShowCalendly(true)}>
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section id="offer" className="offer-section">
        <div className="section-container">
          <h2 className="section-title">What We Offer</h2>
          <p className="section-description">
            Click on any program below to learn more about what's included, how it works, and pricing.
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
                  <p>One-on-one personalized coaching tailored to your specific needs</p>
                </div>
                <div className="expand-icon">{expandedOffer === 'individual' ? '−' : '+'}</div>
              </div>
              {expandedOffer === 'individual' && (
                <div className="offer-details">
                  <div className="offer-detail-section">
                    <h4>What's Included:</h4>
                    <ul>
                      <li>Customized training program designed specifically for you</li>
                      <li>Weekly program updates based on your progress</li>
                      <li>Video form analysis and technique feedback</li>
                      <li>Direct messaging support for questions</li>
                      <li>Monthly progress assessments and goal setting</li>
                      <li>Nutrition guidance and recovery protocols</li>
                    </ul>
                  </div>
                  <div className="offer-detail-section">
                    <h4>How It Works:</h4>
                    <ol>
                      <li>Schedule a consultation call to discuss your goals and current situation</li>
                      <li>Complete a comprehensive fitness assessment</li>
                      <li>Receive your personalized program within 48 hours</li>
                      <li>Follow your program with ongoing support and adjustments</li>
                      <li>Track progress through regular check-ins and assessments</li>
                    </ol>
                  </div>
                  <div className="offer-detail-section">
                    <h4>Investment:</h4>
                    <p className="offer-price">Starting at $XXX/month</p>
                    <p className="offer-price-note">*Pricing varies based on program intensity and support level</p>
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
                  <p>Group programs designed for swim teams and clubs</p>
                </div>
                <div className="expand-icon">{expandedOffer === 'team' ? '−' : '+'}</div>
              </div>
              {expandedOffer === 'team' && (
                <div className="offer-details">
                  <div className="offer-detail-section">
                    <h4>What's Included:</h4>
                    <ul>
                      <li>Team-wide strength and conditioning program</li>
                      <li>Age and skill-appropriate program variations</li>
                      <li>Coach education and support materials</li>
                      <li>Team performance tracking and analytics</li>
                      <li>Regular program updates throughout the season</li>
                      <li>Injury prevention protocols for the team</li>
                    </ul>
                  </div>
                  <div className="offer-detail-section">
                    <h4>How It Works:</h4>
                    <ol>
                      <li>Initial consultation with coaching staff to understand team needs</li>
                      <li>Assessment of team's current fitness levels and goals</li>
                      <li>Custom program design aligned with training schedule</li>
                      <li>Program delivery and coach training session</li>
                      <li>Ongoing support and program adjustments as needed</li>
                    </ol>
                  </div>
                  <div className="offer-detail-section">
                    <h4>Investment:</h4>
                    <p className="offer-price">Starting at $XXX/month per team</p>
                    <p className="offer-price-note">*Pricing based on team size and program scope</p>
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
                  <p>Specialized rehabilitation and return-to-sport programs</p>
                </div>
                <div className="expand-icon">{expandedOffer === 'injury' ? '−' : '+'}</div>
              </div>
              {expandedOffer === 'injury' && (
                <div className="offer-details">
                  <div className="offer-detail-section">
                    <h4>What's Included:</h4>
                    <ul>
                      <li>Injury-specific rehabilitation program</li>
                      <li>Collaboration with your healthcare providers</li>
                      <li>Gradual return-to-sport progression plan</li>
                      <li>Pain management and movement quality focus</li>
                      <li>Prevention strategies to avoid re-injury</li>
                      <li>Priority support and faster response times</li>
                    </ul>
                  </div>
                  <div className="offer-detail-section">
                    <h4>How It Works:</h4>
                    <ol>
                      <li>Initial consultation to understand your injury and recovery goals</li>
                      <li>Review of medical history and current limitations</li>
                      <li>Custom rehabilitation program designed for your specific injury</li>
                      <li>Regular check-ins to monitor progress and adjust program</li>
                      <li>Gradual progression back to full training and competition</li>
                    </ol>
                  </div>
                  <div className="offer-detail-section">
                    <h4>Investment:</h4>
                    <p className="offer-price">Starting at $XXX/month</p>
                    <p className="offer-price-note">*Pricing may vary based on injury complexity and recovery timeline</p>
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
                  <p>Advanced programs for competitive athletes seeking peak performance</p>
                </div>
                <div className="expand-icon">{expandedOffer === 'performance' ? '−' : '+'}</div>
              </div>
              {expandedOffer === 'performance' && (
                <div className="offer-details">
                  <div className="offer-detail-section">
                    <h4>What's Included:</h4>
                    <ul>
                      <li>Elite-level strength and power development</li>
                      <li>Competition-specific periodization planning</li>
                      <li>Advanced technique analysis and optimization</li>
                      <li>Recovery and regeneration protocols</li>
                      <li>Mental performance strategies</li>
                      <li>Priority access and expedited program updates</li>
                    </ul>
                  </div>
                  <div className="offer-detail-section">
                    <h4>How It Works:</h4>
                    <ol>
                      <li>Comprehensive performance assessment and goal setting</li>
                      <li>Analysis of current training and competition schedule</li>
                      <li>Custom periodized program aligned with your competition calendar</li>
                      <li>Weekly program adjustments based on performance data</li>
                      <li>Peak performance planning for key competitions</li>
                    </ol>
                  </div>
                  <div className="offer-detail-section">
                    <h4>Investment:</h4>
                    <p className="offer-price">Starting at $XXX/month</p>
                    <p className="offer-price-note">*Premium pricing for elite-level support and programming</p>
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
          <h2 className="section-title">Fitness Assessment</h2>
          <p className="section-description">
            Take our comprehensive fitness assessment to get personalized recommendations 
            and understand your current fitness level.
          </p>
          <button className="assessment-button" onClick={() => setShowAssessment(true)}>
            Start Assessment
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
