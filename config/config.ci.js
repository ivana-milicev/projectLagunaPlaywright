module.exports = {
  validEmail: process.env.TEST_EMAIL || 'test@example.com',
  validPassword: process.env.TEST_PASSWORD || 'test_password',
  
  invalidEmail: 'invalid@example.com',
  invalidPassword: 'wrongpassword',
  
  baseUrl: 'https://laguna.rs/',
  browser: 'chromium',
  
  searchInput: 'ivo andric',
  productTitle: 'Na Drini',
  
  buyer: {
    name: 'Bugs Bunny',
    email: process.env.TEST_EMAIL || 'test@example.com',
    country: 'Srbija',
    phone: '641234567',
    street: 'My Street',
    streetNumber: '10',
    city: '21000 Novi Sad'
  },
  
  timeout: {
    default: 20000,
    navigation: 30000,
    action: 20000
  }
};