# Laguna.rs Automation Testing - Playwright/JavaScript

Automated testing project for laguna.rs e-commerce website using Playwright and JavaScript.

## 📋 Project Overview

This project automates testing of key user flows on the Laguna.rs website:
- User login (valid/invalid/empty credentials)
- Product search functionality
- Shopping cart operations (add/remove items)
- Complete purchase flow (end-to-end)

## 🛠️ Technologies

- **Playwright** - Modern automation framework
- **JavaScript** - Programming language
- **Node.js** - Runtime environment
- **Page Object Model** - Design pattern

## 📁 Project Structure

```
projectLagunaPlaywright/
├── pages/              # Page Object classes
├── tests/              # Test specifications
├── config/             # Configuration files
├── screenshots/        # Test failure screenshots
├── playwright.config.js
└── package.json
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ivana-milicev/projectLagunaPlaywright.git
cd projectLagunaPlaywright
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Playwright browsers**
```bash
npx playwright install
```

4. **Configure test data**
```bash
cp config/config.example.js config/config.js
# Edit config/config.js and add your credentials
```

## 🚀 Running Tests

### Run all tests
```bash
npm test
```

### Run tests with browser visible (headed mode)
```bash
npm run test:headed
```

### Run tests on specific browser
```bash
npm run test:chrome
npm run test:firefox
npm run test:edge
```

### Run specific test suite
```bash
npm run test:login
npm run test:search
npm run test:cart
npm run test:buyflow
```

### View test report
```bash
npm run report
```

## 📊 Test Reports

Playwright automatically generates HTML reports after test execution:
- Location: `playwright-report/index.html`
- Open with: `npm run report`

Reports include:
- Test execution summary
- Screenshots on failure
- Video recordings (if enabled)
- Detailed error logs

## 📸 Screenshots

Screenshots are automatically captured on test failure and saved to `screenshots/` folder.

## 🎯 Test Coverage

### Login Tests (`login.spec.js`)
- ✅ Valid credentials login
- ✅ Invalid credentials login
- ✅ Empty fields login

### Search Tests (`search.spec.js`)
- ✅ Product search functionality

### Cart Tests (`cart.spec.js`)
- ✅ Add product to cart with count validation
- ✅ Remove product from cart

### Buy Flow Test (`buyFlow.spec.js`)
- ✅ Complete end-to-end purchase flow
  - Login
  - Search product
  - Add to cart
  - Fill buyer information
  - Select payment method
  - Complete checkout

## 🔧 Configuration

Edit `config/config.js` to customize:
- Test credentials
- Browser preferences
- Timeouts
- Test data

**⚠️ Never commit `config/config.js` - it contains sensitive data!**

## 📝 Writing New Tests

Create a new test file in `tests/` folder:

```javascript
const { test, expect } = require('@playwright/test');
const YourPage = require('../pages/YourPage');
const config = require('../config/config');

test.describe('Your Test Suite', () => {
  test('Your test case', async ({ page }) => {
    // Your test code here
  });
});
```

## 🐛 Debugging

### Debug mode
```bash
npx playwright test --debug
```

### Headed mode (see browser)
```bash
npx playwright test --headed
```

### Specific test with debug
```bash
npx playwright test login --headed --debug
```

## 📦 Key Features

- ✅ Page Object Model architecture
- ✅ Automatic screenshots on failure
- ✅ Multi-browser support (Chrome, Firefox, Edge)
- ✅ Parallel test execution
- ✅ Built-in HTML reports
- ✅ Auto-waiting for elements
- ✅ Configuration management
- ✅ GDPR popup handling

## 🔄 CI/CD Integration

This project is ready for CI/CD integration. Example GitHub Actions workflow:

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)

## 👤 Author

**Ivana Milicev**
- GitHub: [@ivana-milicev](https://github.com/ivana-milicev)

## 📄 License

This project is for educational purposes.