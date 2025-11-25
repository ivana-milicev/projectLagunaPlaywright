module.exports = {
  // Login credentials
  validEmail: 'your_email@example.com',
  validPassword: 'your_password_here',
  
  invalidEmail: 'invalid@example.com',
  invalidPassword: 'wrongpassword',
  
  // Base URL
  baseUrl: 'https://laguna.rs/',
  
  // Browser configuration
  browser: 'chromium', // chromium, firefox, msedge
  
  // Search data
  searchInput: 'ivo andric',
  productTitle: 'Na Drini',
  
  // Buyer data for checkout
  buyer: {
    name: 'Your Name',
    email: 'your_email@example.com',
    country: 'Srbija',
    phone: '641234567',
    street: 'My Street',
    streetNumber: '10',
    city: '21000 Novi Sad'
  },
  
  // Timeouts (in milliseconds)
  timeout: {
    default: 20000,
    navigation: 30000,
    action: 20000
  }
};