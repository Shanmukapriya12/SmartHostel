/**
 * ============================================================
 *  Web Selenium Test Runner (Node.js)
 *  Smart Hostel Management System
 * ============================================================
 */

const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'http://localhost/smart_hostel';
const IS_CI = !!(process.env.CI || process.argv.includes('--headless'));
const TIMEOUT = IS_CI ? 12000 : 10000;  // 12s in CI for stability, 10s locally
const SLEEP = IS_CI ? 100 : 300;         // 100ms in CI vs 300ms locally
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// ─── Colours for Terminal Output ────────────────────────────
const C = {
  reset: '\x1b[0m', green: '\x1b[32m', red: '\x1b[31m',
  yellow: '\x1b[33m', cyan: '\x1b[36m', bold: '\x1b[1m',
};

class WebTestRunner {
  constructor() {
    this.tests = [];
    this.results = [];
    this.driver = null;
    this.helpers = null;
  }

  addTest(id, module, category, name, priority, testFn) {
    this.tests.push({ id, module, category, name, priority, testFn });
  }

  async initDriver() {
    console.log(`${C.cyan}Initializing Selenium WebDriver...${C.reset}`);
    const opts = new chrome.Options();
    
    // Auto-detect CI environment and use headless mode
    if (IS_CI) {
      opts.addArguments(
        '--headless=new',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-extensions',
        '--disable-background-networking',
        '--disable-default-apps',
        '--disable-sync',
        '--no-first-run',
        '--window-size=1366,768'
      );
    } else {
      opts.addArguments('--window-size=1366,768');
    }

    const builder = new Builder().forBrowser('chrome').setChromeOptions(opts);

    // Detect chromedriver from npm package — supports both Windows (.exe) and Linux/macOS
    const chromedriverBase = path.join(__dirname, '..', '..', 'node_modules', 'chromedriver', 'lib', 'chromedriver', 'chromedriver');
    const localChromedriverWin = chromedriverBase + '.exe';
    const localChromedriverUnix = chromedriverBase;
    const localChromedriver = process.platform === 'win32' ? localChromedriverWin : localChromedriverUnix;
    if (fs.existsSync(localChromedriver)) {
      console.log(`Found local chromedriver executable: ${localChromedriver}`);
      const service = new chrome.ServiceBuilder(localChromedriver);
      builder.setChromeService(service);
    } else {
      console.log(`Local chromedriver not found at ${localChromedriver}, relying on PATH/Selenium Manager.`);
    }

    this.driver = await builder.build();
    this.initHelpers();
    console.log(`✅ Chrome driver started successfully. BASE_URL: ${BASE_URL}`);
  }

  initHelpers() {
    const driver = this.driver;
    const runner = this;

    this.helpers = {
      driver,
      goTo: async (page) => {
        await driver.get(`${BASE_URL}/${page}`);
        await driver.sleep(SLEEP);
      },
      findEl: async (locator) => {
        return driver.wait(until.elementLocated(locator), TIMEOUT);
      },
      clickEl: async (locator) => {
        const el = await this.helpers.findEl(locator);
        await driver.wait(until.elementIsVisible(el), TIMEOUT);
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", el);
        try {
          await el.click();
        } catch (e) {
          await driver.executeScript("arguments[0].click();", el);
        }
        await driver.sleep(SLEEP);
      },
      typeIn: async (locator, text) => {
        const el = await this.helpers.findEl(locator);
        try {
          await el.clear();
          await el.sendKeys(text);
          const val = await driver.executeScript("return arguments[0].value;", el);
          if (val !== text) {
            await driver.executeScript("arguments[0].value = arguments[1];", el, text);
          }
        } catch (e) {
          await driver.executeScript("arguments[0].value = arguments[1];", el, text);
        }
      },
      takeScreenshot: async (filename, highlightLocator = null) => {
        let highlightedElement = null;
        let originalStyle = '';
        
        if (highlightLocator) {
          try {
            highlightedElement = await driver.findElement(highlightLocator);
            originalStyle = await driver.executeScript(
              "let el = arguments[0]; let orig = el.style.cssText; el.style.border = '4px solid #EF4444'; el.style.boxShadow = '0 0 15px #EF4444'; return orig;", 
              highlightedElement
            );
          } catch (e) {
            console.error(`Could not highlight element for screenshot: ${e.message}`);
          }
        }

        const screenshot = await driver.takeScreenshot();
        const savePath = path.join(SCREENSHOTS_DIR, filename);
        fs.writeFileSync(savePath, screenshot, 'base64');

        // Restore original style
        if (highlightedElement) {
          try {
            await driver.executeScript(
              "arguments[0].style.cssText = arguments[1];", 
              highlightedElement, originalStyle
            );
          } catch (e) {}
        }
      },
      assertTitle: async (expected) => {
        await driver.wait(async () => {
          try {
            const title = await driver.getTitle();
            return title.toLowerCase().includes(expected.toLowerCase());
          } catch (e) {
            return false;
          }
        }, 5000, `Expected title containing "${expected}"`);
      },
      assertUrlContains: async (part) => {
        await driver.wait(async () => {
          try {
            const url = await driver.getCurrentUrl();
            return url.includes(part);
          } catch (e) {
            return false;
          }
        }, 5000, `Expected URL to contain "${part}"`);
      },
      assertElementExists: async (locator) => {
        const els = await driver.findElements(locator);
        if (els.length === 0) {
          throw new Error(`Element not found: ${locator.toString()}`);
        }
      },
      assertPageContains: async (text) => {
        await driver.wait(async () => {
          try {
            const body = await driver.findElement(By.tagName('body')).getText();
            return body.toLowerCase().includes(text.toLowerCase());
          } catch (e) {
            return false;
          }
        }, 5000, `Page did not contain expected text: "${text}"`);
      },
      assertElementText: async (locator, expectedText) => {
        await driver.wait(async () => {
          try {
            const el = await this.helpers.findEl(locator);
            const text = await el.getText();
            return text.toLowerCase().includes(expectedText.toLowerCase());
          } catch (e) {
            return false;
          }
        }, 5000, `Expected element text containing "${expectedText}"`);
      },
      performStudentLogin: async (phone) => {
        await this.helpers.goTo('student_login.php');
        await this.helpers.typeIn(By.name('phone'), phone);
        await this.helpers.clickEl(By.name('send_otp'));
        await driver.sleep(SLEEP * 2);
        const alertEl = await this.helpers.findEl(By.css('.alert-info'));
        const text = await alertEl.getText();
        const otp = text.split(':')[1].trim();
        await this.helpers.typeIn(By.name('entered_otp'), otp);
        await this.helpers.clickEl(By.name('verify_otp'));
        await driver.sleep(SLEEP * 2);
      },
      performWardenLogin: async () => {
        await this.helpers.goTo('warden_login.php');
        await this.helpers.typeIn(By.css('input[type="email"]'), 'warden@smarthostel.com');
        await this.helpers.typeIn(By.css('input[type="password"]'), 'warden123');
        await this.helpers.clickEl(By.css('button[type="submit"]'));
        await driver.sleep(SLEEP * 2);
      },
      performAdminLogin: async () => {
        await this.helpers.goTo('admin_login.php');
        await driver.sleep(SLEEP);
        await this.helpers.typeIn(By.name('email'), 'admin@gmail.com');
        await this.helpers.typeIn(By.name('password'), 'admin123');
        // Try both name=login button and generic submit button
        try {
          await this.helpers.clickEl(By.css('button[name="login"], button[type="submit"]'));
        } catch(e) {
          await this.helpers.clickEl(By.css('button[type="submit"]'));
        }
        await driver.sleep(1000);  // Wait longer for PHP redirect
      }
    };
  }

  async runAll() {
    await this.initDriver();
    console.log(`\n${C.bold}Running ${this.tests.length} Web Selenium E2E Tests...${C.reset}\n`);

    let passed = 0, failed = 0;

    for (const test of this.tests) {
      const startTime = Date.now();
      let status = 'PASS';
      let remarks = 'Success';
      let errorDetails = '';
      let screenshotFile = `${test.id.toLowerCase()}_screenshot.png`;

      try {
        await test.testFn(this.driver, this.helpers, screenshotFile);
        passed++;
        console.log(`${C.green}✔ [${test.id}] ${test.module} - ${test.name}${C.reset}`);
      } catch (err) {
        status = 'FAIL';
        failed++;
        remarks = err.message ? err.message.split('\n')[0] : String(err);
        errorDetails = err.stack || String(err);
        console.log(`${C.red}✘ [${test.id}] ${test.module} - ${test.name}${C.reset}`);
        console.log(`  ${C.yellow}→ ${remarks}${C.reset}`);
        
        // Take diagnostic screenshot on failure
        try {
          const screenshot = await this.driver.takeScreenshot();
          fs.writeFileSync(path.join(SCREENSHOTS_DIR, screenshotFile), screenshot, 'base64');
        } catch (e) {
          console.error(`Could not save error screenshot: ${e.message}`);
        }

        // Recover: navigate back to index to keep session stable for subsequent tests
        try {
          await this.driver.get(`${BASE_URL}/index.php`);
          await this.driver.sleep(SLEEP);
        } catch (_) {}
      }

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      this.results.push({
        id: test.id,
        module: test.module,
        category: test.category,
        testName: test.name,
        priority: test.priority,
        status,
        duration: parseFloat(duration),
        remarks,
        errorDetails,
        screenshot: fs.existsSync(path.join(SCREENSHOTS_DIR, screenshotFile)) ? screenshotFile : null
      });
    }

    await this.driver.quit();
    
    // Write temporary JSON results
    const resultsPath = path.join(__dirname, 'web_results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(this.results, null, 2));

    console.log(`\n${C.bold}Web E2E Complete: ${C.green}${passed} Passed${C.reset}, ${C.red}${failed} Failed${C.reset}. Results dumped to web_results.json${C.reset}\n`);
  }
}

// Instantiate and load modular test cases
const runner = new WebTestRunner();

// Load modules
const modules = ['functional.test.js', 'ui_ux.test.js', 'validation.test.js', 'unit.test.js', 'integration.test.js', 'advanced.test.js'];
modules.forEach(file => {
  const filePath = path.join(__dirname, 'tests', file);
  if (fs.existsSync(filePath)) {
    const registerTests = require(filePath);
    registerTests(runner);
  }
});

if (require.main === module) {
  runner.runAll().catch(err => {
    console.error('Fatal error in Web E2E runner:', err);
    process.exit(1);
  });
}

module.exports = runner;
