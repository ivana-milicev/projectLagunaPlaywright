class BasePage {
  constructor(page) {
    this.page = page;
  }

  // Navigation
  async navigateTo(url) {
    await this.page.goto(url);
  }

  // Element actions with built-in auto-waiting
  async click(locator) {
    await this.page.locator(locator).click();
  }

  async fill(locator, text) {
    await this.page.locator(locator).clear();
    await this.page.locator(locator).fill(text);
  }

  async type(locator, text) {
    await this.page.locator(locator).fill(text);
  }

  async getText(locator) {
    return await this.page.locator(locator).textContent();
  }

  async isVisible(locator) {
    try {
      await this.page.locator(locator).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async isPresent(locator) {
    const count = await this.page.locator(locator).count();
    return count > 0;
  }

  // Waits
  async waitForVisible(locator, timeout = 20000) {
    await this.page.locator(locator).waitFor({ state: 'visible', timeout });
  }

  async waitForHidden(locator, timeout = 20000) {
    await this.page.locator(locator).waitFor({ state: 'hidden', timeout });
  }

  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }

  // Scrolling
  async scrollToElement(locator) {
    await this.page.locator(locator).scrollIntoViewIfNeeded();
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  // JavaScript execution
  async jsClick(locator) {
    await this.page.locator(locator).evaluate(element => element.click());
  }

  // Dropdowns/Select
  async selectByText(locator, text) {
    await this.page.locator(locator).selectOption({ label: text });
  }

  async selectByValue(locator, value) {
    await this.page.locator(locator).selectOption(value);
  }

  // Alerts/Dialogs
  async handleAlert(accept = true) {
    this.page.on('dialog', async dialog => {
      if (accept) {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
  }

  // GDPR handling
  async closeGdprIfVisible() {
    try {
      const gdprBox = this.page.locator('#gdpr-box');
      if (await gdprBox.isVisible({ timeout: 2000 })) {
        await gdprBox.locator('.close-gdpr').click();
        await gdprBox.waitFor({ state: 'hidden' });
      }
    } catch {
      // GDPR not present, continue
    }
  }

  // Utility
  async sleep(milliseconds) {
    await this.page.waitForTimeout(milliseconds);
  }

  // Screenshot
  async takeScreenshot(name) {
    await this.page.screenshot({ 
      path: `screenshots/${name}_${Date.now()}.png`,
      fullPage: true 
    });
  }
}

module.exports = BasePage;