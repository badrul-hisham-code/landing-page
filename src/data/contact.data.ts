export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

export const contactInfo: ContactInfo = {
  email: 'contact@lunaris.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
};

export const contactContent = {
  title: 'Get In Touch',
  description: 'Ready to transform your business? Contact us today to discuss your project.',
  submitButtonText: 'Send Message',
  successMessage: 'Thank you for your message! We will get back to you soon.',
};
