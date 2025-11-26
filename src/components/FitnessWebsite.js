import React, { useState } from 'react';
import './FitnessWebsite.css';
import FitnessAssessment from './FitnessAssessment';
import CalendlyWidget from './CalendlyWidget';

const FitnessWebsite = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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
          <div className="offer-grid">
            <div className="offer-card">
              <div className="offer-icon">💪</div>
              <h3>Personalized Training</h3>
              <p>Customized programs designed specifically for your goals, fitness level, and schedule.</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">🏋️</div>
              <h3>Strength & Conditioning</h3>
              <p>Comprehensive programs to build power, improve technique, and enhance performance.</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">🩺</div>
              <h3>Injury Recovery</h3>
              <p>Specialized programs to help you recover from injuries and prevent future ones.</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>Monitor your progress with detailed assessments and regular check-ins.</p>
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
