import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitMessage('Thank you for your message! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div className="container">
          <h1 style={styles.title}>Get In Touch</h1>
          <p style={styles.subtitle}>
            Have questions, comments, or interested in collaboration? I'd love to hear from you.
          </p>
        </div>
      </section>

      <section style={styles.contactSection}>
        <div className="container" style={styles.container}>
          {/* Contact Form */}
          <div style={styles.formContainer}>
            <h2 style={styles.formTitle}>Send a Message</h2>
            
            {submitMessage && (
              <div style={styles.successMessage}>
                {submitMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Your name"
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="your.email@example.com"
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="subject" style={styles.label}>Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="What is this regarding?"
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="message" style={styles.label}>Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={styles.textarea}
                  placeholder="Your message here..."
                  rows="6"
                />
              </div>

              <button 
                type="submit" 
                style={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <FaPaperPlane style={styles.sendIcon} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div style={styles.infoContainer}>
            <h2 style={styles.infoTitle}>Contact Information</h2>
            
            <div style={styles.infoItems}>
              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>
                  <FaEnvelope />
                </div>
                <div>
                  <h3 style={styles.infoLabel}>Email</h3>
                  <p style={styles.infoText}>author@example.com</p>
                  <p style={styles.infoNote}>Response within 48 hours</p>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>
                  <FaPhone />
                </div>
                <div>
                  <h3 style={styles.infoLabel}>Phone</h3>
                  <p style={styles.infoText}>+1 (555) 123-4567</p>
                  <p style={styles.infoNote}>Available Mon-Fri, 9AM-5PM</p>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 style={styles.infoLabel}>Location</h3>
                  <p style={styles.infoText}>Portland, Oregon</p>
                  <p style={styles.infoNote}>Available for local events</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div style={styles.socialSection}>
              <h3 style={styles.socialTitle}>Connect Socially</h3>
              <div style={styles.socialLinks}>
                <button style={styles.socialButton} onClick={() => alert('Twitter coming soon!')}>Twitter</button>
                <button style={styles.socialButton} onClick={() => alert('Instagram coming soon!')}>Instagram</button>
                <button style={styles.socialButton} onClick={() => alert('LinkedIn coming soon!')}>LinkedIn</button>
                <button style={styles.socialButton} onClick={() => alert('Goodreads coming soon!')}>Goodreads</button>
              </div>
            </div>

            {/* FAQ/Common Questions */}
            <div style={styles.faqSection}>
              <h3 style={styles.faqTitle}>Frequently Asked</h3>
              <div style={styles.faqItem}>
                <h4>Do you accept speaking engagements?</h4>
                <p>Yes, I'm available for book talks, workshops, and conferences.</p>
              </div>
              <div style={styles.faqItem}>
                <h4>Can you review my manuscript?</h4>
                <p>I offer limited manuscript consultations. Please email for details.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    paddingTop: '80px'
  },
  hero: {
    backgroundColor: '#f8f9fa',
    padding: '80px 0',
    textAlign: 'center'
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px'
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#666',
    maxWidth: '600px',
    margin: '0 auto'
  },
  contactSection: {
    padding: '80px 0'
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    alignItems: 'start'
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
  },
  formTitle: {
    marginBottom: '30px',
    color: '#2c3e50'
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '20px',
    border: '1px solid #c3e6cb'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '8px',
    fontWeight: '500',
    color: '#333'
  },
  input: {
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    transition: 'border-color 0.3s'
  },
  textarea: {
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  submitButton: {
    padding: '15px 30px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'background-color 0.3s'
  },
  sendIcon: {
    fontSize: '18px'
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px'
  },
  infoTitle: {
    color: '#2c3e50',
    marginBottom: '20px'
  },
  infoItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  infoItem: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start'
  },
  infoIcon: {
    backgroundColor: '#f8f9fa',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    color: '#e74c3c'
  },
  infoLabel: {
    marginBottom: '5px',
    color: '#333'
  },
  infoText: {
    fontSize: '18px',
    color: '#2c3e50',
    marginBottom: '5px'
  },
  infoNote: {
    fontSize: '14px',
    color: '#666'
  },
  socialSection: {
    paddingTop: '20px',
    borderTop: '1px solid #eee'
  },
  socialTitle: {
    marginBottom: '15px',
    color: '#333'
  },
  socialLinks: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  socialButton: {
    background: 'none',
    border: 'none',
    color: '#3498db',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0',
    textDecoration: 'underline'
  },
  socialLink: {
    color: '#3498db'
  },
  faqSection: {
    paddingTop: '20px',
    borderTop: '1px solid #eee'
  },
  faqTitle: {
    marginBottom: '15px',
    color: '#333'
  },
  faqItem: {
    marginBottom: '20px'
  }
};

export default Contact;