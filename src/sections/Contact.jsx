import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage(null);

    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setResponseMessage({ type: 'success', text: data.message });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setResponseMessage({ type: 'error', text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <h2 className={styles.title}>Let's Build the Future</h2>
        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          <div className={styles.info}>
            <h3>Contact Information</h3>
            <p>Email: contact@annorak.com</p>
            <p>Phone: +1 (234) 567-890</p>
          </div>
        </div>
        {responseMessage && (
          <p className={responseMessage.type === 'success' ? styles.successMessage : styles.errorMessage}>
            {responseMessage.text}
          </p>
        )}
      </div>
    </section>
  );
};

export default Contact; 