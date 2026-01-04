import { useState, useRef } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import emailjs from 'emailjs-com';

function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // ====== EMAILJS CREDENTIALS ======
  // REPLACE THESE WITH YOUR ACTUAL CREDENTIALS FROM EMAILJS DASHBOARD!
  const EMAILJS_SERVICE_ID = 'service_b9dof4r';      // From "Email Services" tab
  const EMAILJS_TEMPLATE_ID = 'template_dx346oj';    // From "Email Templates" tab
  const EMAILJS_USER_ID = 'XtWSv4n9hA4JHiOU1';  // From "API Keys" tab (Public Key)
  // =================================

  // Handle input changes - FIXED VERSION
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setIsError(false);

    console.log('Form submitted with data:', formData);

    // Check if form has required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setIsError(true);
      setSubmitMessage('Please fill in all required fields (Name, Email, Message).');
      setIsSubmitting(false);
      return;
    }

    // Check if EmailJS credentials are properly set
    if (EMAILJS_USER_ID.includes('user_your_user_id_here')) {
      console.warn('EmailJS credentials not configured. Using demo mode.');
      setIsError(false);
      setSubmitMessage('Demo: Message would be sent to author@example.com. Please configure EmailJS for real emails.');
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      return;
    }

    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      subject: formData.subject || 'Website Contact Form',
      message: formData.message,
      to_email: 'author@example.com' // Your actual email
    };

    console.log('Sending email with params:', templateParams);

    // Send email using EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_USER_ID)
      .then((result) => {
        console.log('✅ Email sent successfully:', result.text);
        setSubmitMessage('Thank you for your message! I\'ll get back to you within 24-48 hours.');
        
        // Reset form data
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      })
      .catch((error) => {
        console.error('❌ Email send failed:', error);
        setIsError(true);
        setSubmitMessage(`Failed to send message. Error: ${error.text || 'Unknown error'}. Please try again or email me directly at author@example.com.`);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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
              <div style={isError ? styles.errorMessage : styles.successMessage}>
                <div style={styles.messageIcon}>
                  {isError ? '❌' : '✅'}
                </div>
                <div style={styles.messageText}>
                  {submitMessage}
                  {isError && (
                    <div style={styles.errorDetails}>
                      <br />
                      <strong>Troubleshooting:</strong>
                      <ul style={styles.troubleshootList}>
                        <li>Check EmailJS credentials in Contact.js (lines 15-17)</li>
                        <li>Verify you have an EmailJS account</li>
                        <li>Try emailing directly: <strong>author@example.com</strong></li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <form ref={form} onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>
                  Name <span style={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"  // This matches state key
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Your name"
                  disabled={isSubmitting}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>
                  Email <span style={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"  // This matches state key
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="subject" style={styles.label}>Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"  // This matches state key
                  value={formData.subject}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="What is this regarding?"
                  disabled={isSubmitting}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="message" style={styles.label}>
                  Message <span style={styles.required}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"  // This matches state key
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={styles.textarea}
                  placeholder="Your message here..."
                  rows="6"
                  disabled={isSubmitting}
                />
              </div>

              <button 
                type="submit" 
                style={isSubmitting ? styles.submitButtonDisabled : styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane style={styles.sendIcon} />
                    Send Message
                  </>
                )}
              </button>
              
              <div style={styles.formStatus}>
                <p style={styles.formNote}>
                  <strong>Status:</strong> {
                    EMAILJS_USER_ID.includes('user_your_user_id_here') 
                      ? '⚡ Demo Mode (configure EmailJS for real emails)' 
                      : '✅ EmailJS Configured'
                  }
                </p>
                <p style={styles.formNote}>
                  Your message will be sent directly to my email inbox.
                  I typically respond within 24-48 hours.
                </p>
              </div>
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

            {/* EmailJS Setup Guide */}
            <div style={styles.setupGuide}>
              <h3 style={styles.guideTitle}>📧 EmailJS Setup</h3>
              <p style={styles.guideText}>
                To enable real email sending:
              </p>
              <ol style={styles.guideSteps}>
                <li>Sign up at <a href="https://emailjs.com" target="_blank" rel="noopener noreferrer">EmailJS.com</a></li>
                <li>Get your <strong>Service ID</strong>, <strong>Template ID</strong>, and <strong>User ID</strong></li>
                <li>Update lines 15-17 in Contact.js with your credentials</li>
              </ol>
            </div>

            {/* Social Media */}
            <div style={styles.socialSection}>
              <h3 style={styles.socialTitle}>Connect Socially</h3>
              <div style={styles.socialLinks}>
                <button style={styles.socialButton} onClick={() => window.open('https://twitter.com', '_blank')}>Twitter</button>
                <button style={styles.socialButton} onClick={() => window.open('https://instagram.com', '_blank')}>Instagram</button>
                <button style={styles.socialButton} onClick={() => window.open('https://linkedin.com', '_blank')}>LinkedIn</button>
                <button style={styles.socialButton} onClick={() => window.open('https://goodreads.com', '_blank')}>Goodreads</button>
              </div>
            </div>

            {/* FAQ/Common Questions */}
            <div style={styles.faqSection}>
              <h3 style={styles.faqTitle}>Frequently Asked</h3>
              <div style={styles.faqItem}>
                <h4 style={styles.faqQuestion}>Do you accept speaking engagements?</h4>
                <p style={styles.faqAnswer}>Yes, I'm available for book talks, workshops, and conferences.</p>
              </div>
              <div style={styles.faqItem}>
                <h4 style={styles.faqQuestion}>Can you review my manuscript?</h4>
                <p style={styles.faqAnswer}>I offer limited manuscript consultations. Please email for details.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ===== STYLES =====
const styles = {
  page: {
    paddingTop: '80px',
    fontFamily: 'Arial, sans-serif'
  },
  hero: {
    background: '#f8f9fa',
    padding: '80px 0',
    textAlign: 'center',
    color: 'white'
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
    fontWeight: '800'
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#666',
    maxWidth: '600px',
    margin: '0 auto'
  },
  contactSection: {
    padding: '80px 0',
    background: '#f8fafc'
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
  },
  formTitle: {
    marginBottom: '30px',
    color: '#2c3e50',
    fontSize: '1.8rem'
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '25px',
    border: '1px solid #c3e6cb',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px'
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '25px',
    border: '1px solid #f5c6cb',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px'
  },
  messageIcon: {
    fontSize: '24px',
    flexShrink: 0
  },
  messageText: {
    flex: 1
  },
  errorDetails: {
    marginTop: '10px',
    fontSize: '0.9rem'
  },
  troubleshootList: {
    margin: '10px 0 0 20px',
    padding: 0
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '8px',
    fontWeight: '600',
    color: '#2c3e50',
    fontSize: '14px'
  },
  required: {
    color: '#e74c3c'
  },
  input: {
    padding: '14px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'all 0.3s',
    backgroundColor: '#f8fafc'
  },
  textarea: {
    padding: '14px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '16px',
    resize: 'vertical',
    fontFamily: 'inherit',
    minHeight: '150px',
    transition: 'all 0.3s',
    backgroundColor: '#f8fafc'
  },
  inputFocus: {
    borderColor: '#667eea',
    backgroundColor: 'white',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
    outline: 'none'
  },
  submitButton: {
    padding: '16px 30px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'all 0.3s',
    marginTop: '10px'
  },
  submitButtonDisabled: {
    padding: '16px 30px',
    background: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'not-allowed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px',
    opacity: '0.7'
  },
  sendIcon: {
    fontSize: '18px'
  },
  formStatus: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f0f7ff',
    borderRadius: '8px',
    borderLeft: '4px solid #667eea'
  },
  formNote: {
    fontSize: '0.9rem',
    color: '#4a5568',
    margin: '5px 0',
    lineHeight: '1.5'
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px'
  },
  infoTitle: {
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '1.8rem'
  },
  infoItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  infoItem: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
    padding: '25px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
    transition: 'all 0.3s'
  },
  infoIcon: {
    backgroundColor: '#667eea',
    color: 'white',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    flexShrink: 0
  },
  infoLabel: {
    marginBottom: '8px',
    color: '#2c3e50',
    fontSize: '16px'
  },
  infoText: {
    fontSize: '18px',
    color: '#2c3e50',
    fontWeight: '600',
    marginBottom: '5px'
  },
  infoNote: {
    fontSize: '14px',
    color: '#718096'
  },
  setupGuide: {
    padding: '25px',
    backgroundColor: '#fff3cd',
    borderRadius: '12px',
    border: '1px solid #ffeaa7'
  },
  guideTitle: {
    color: '#856404',
    marginBottom: '15px',
    fontSize: '18px'
  },
  guideText: {
    color: '#856404',
    marginBottom: '15px',
    fontSize: '14px'
  },
  guideSteps: {
    color: '#856404',
    margin: '10px 0 0 20px',
    padding: 0,
    fontSize: '14px',
    lineHeight: '1.8'
  },
  socialSection: {
    paddingTop: '30px',
    borderTop: '2px solid #e2e8f0'
  },
  socialTitle: {
    marginBottom: '20px',
    color: '#2c3e50',
    fontSize: '18px'
  },
  socialLinks: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap'
  },
  socialButton: {
    padding: '10px 20px',
    backgroundColor: '#f8f9fa',
    color: '#2c3e50',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  faqSection: {
    paddingTop: '30px',
    borderTop: '2px solid #e2e8f0'
  },
  faqTitle: {
    marginBottom: '20px',
    color: '#2c3e50',
    fontSize: '18px'
  },
  faqItem: {
    marginBottom: '25px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px'
  },
  faqQuestion: {
    color: '#2c3e50',
    marginBottom: '10px',
    fontSize: '16px'
  },
  faqAnswer: {
    color: '#4a5568',
    fontSize: '14px',
    lineHeight: '1.6'
  }
};

// Add focus styles dynamically
Object.assign(styles.input, { ':focus': styles.inputFocus });
Object.assign(styles.textarea, { ':focus': styles.inputFocus });
Object.assign(styles.submitButton, { ':hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)' } });
Object.assign(styles.infoItem, { ':hover': { transform: 'translateY(-5px)', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' } });
Object.assign(styles.socialButton, { ':hover': { backgroundColor: '#667eea', color: 'white', borderColor: '#667eea' } });

export default Contact;