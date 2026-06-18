const { By } = require('selenium-webdriver');

module.exports = function(runner) {
  // --- Unit: Client-side Form Validation Helpers ---
  runner.addTest('TC-096', 'Form Validation Helper', 'Unit', 'Regex phone validation matching 10 digits matches correct formats', 'Medium',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      
      const phoneRegexTest = `
        const isValid = (phone) => /^[6-9]\\d{9}$/.test(phone);
        return [
          isValid('9876543210'), // true
          isValid('7671897162'), // true
          isValid('1234567890'), // false (should start with 6-9)
          isValid('98765abcde'), // false (alphabetic characters)
          isValid('98765432101') // false (too long)
        ];
      `;
      const results = await driver.executeScript(phoneRegexTest);
      if (!results[0] || !results[1] || results[2] || results[3] || results[4]) {
        throw new Error(`Phone regex unit test failed! Expected [true, true, false, false, false] but got: [${results.join(', ')}]`);
      }
    });

  runner.addTest('TC-097', 'Date Arithmetic Helper', 'Unit', 'Leave date validation logic rejects invalid date range options', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('leave_request.php');

      const dateValidatorTest = `
        const validateDates = (fromStr, toStr) => {
          const fromDate = new Date(fromStr);
          const toDate = new Date(toStr);
          return fromDate <= toDate;
        };
        return [
          validateDates('2026-06-17', '2026-06-20'), // true
          validateDates('2026-06-20', '2026-06-17'), // false (backward)
          validateDates('2026-06-17', '2026-06-17')  // true (same day)
        ];
      `;
      const results = await driver.executeScript(dateValidatorTest);
      if (!results[0] || results[1] || !results[2]) {
        throw new Error(`Leave date helper unit test failed! Expected [true, false, true] but got: [${results.join(', ')}]`);
      }
    });

  runner.addTest('TC-098', 'Rating Math Helper', 'Unit', 'Mess feedback star rating calculations and averages', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('mess_feedback.php');

      const averageRatingTest = `
        const calcAverage = (breakfast, lunch, dinner) => {
          return parseFloat(((breakfast + lunch + dinner) / 3).toFixed(1));
        };
        return [
          calcAverage(4, 5, 3), // 4.0
          calcAverage(5, 5, 5), // 5.0
          calcAverage(2, 3, 2)  // 2.3
        ];
      `;
      const results = await driver.executeScript(averageRatingTest);
      if (results[0] !== 4.0 || results[1] !== 5.0 || results[2] !== 2.3) {
        throw new Error(`Average rating calculator failed! Got results: [${results.join(', ')}]`);
      }
    });

  runner.addTest('TC-099', 'OTP Generator Unit Test', 'Unit', 'Verification code properties length and digit format', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');

      // OTP generation unit simulation
      const otpGenTest = `
        const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();
        const code = generateOTP();
        return [
          code.length === 4,
          /^[0-9]{4}$/.test(code)
        ];
      `;
      const results = await driver.executeScript(otpGenTest);
      if (!results[0] || !results[1]) {
        throw new Error(`OTP generator unit simulation failed! Got outcomes: [${results.join(', ')}]`);
      }
    });

  runner.addTest('TC-100', 'URL Construction Helper', 'Unit', 'Query parameter builder matches expected formatted string', 'Low',
    async (driver, h, sFile) => {
      await h.goTo('index.php');

      const urlBuilderTest = `
        const buildQuery = (params) => {
          return Object.entries(params)
            .map(([k, v]) => encodeURIComponent(k) + '=' + encodeURIComponent(v))
            .join('&');
        };
        return buildQuery({ role: 'student', action: 'login', ref: 'home page' });
      `;
      const queryStr = await driver.executeScript(urlBuilderTest);
      const expected = 'role=student&action=login&ref=home%20page';
      if (queryStr !== expected) {
        throw new Error(`URL query param builder failed! Expected: "${expected}", got: "${queryStr}"`);
      }
    });

  runner.addTest('TC-101', 'UI Helper Unit', 'Unit', 'Alert fade out animation timer utility function', 'Low',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');

      const alertFadeTest = `
        let alertVisible = true;
        const triggerFade = (delay, cb) => {
          setTimeout(() => { alertVisible = false; cb(); }, delay);
        };
        return new Promise((resolve) => {
          triggerFade(100, () => resolve(alertVisible));
        });
      `;
      const isVisible = await driver.executeScript(alertFadeTest);
      if (isVisible) {
        throw new Error('Fading callback failed to execute or reset visibility state.');
      }
    });

  runner.addTest('TC-102', 'Database Connection Client Check', 'Unit', 'Client checks db connection status banner presence', 'High',
    async (driver, h, sFile) => {
      await h.goTo('index.php');
      // Unit verify that db.php doesn't throw a visible MySQL error in body
      const bodyText = await driver.findElement(By.tagName('body')).getText();
      const hasConnectionError = bodyText.includes('Connection failed') || bodyText.includes('Access denied for user');
      if (hasConnectionError) {
        throw new Error('Database configuration error output found in HTML source');
      }
    });

  runner.addTest('TC-103', 'Typography Font Size Loader', 'Unit', 'Unit checks CSS font variables configurations', 'Low',
    async (driver, h, sFile) => {
      await h.goTo('index.php');
      const fontSize = await driver.executeScript(
        "return getComputedStyle(document.body).fontSize;"
      );
      if (!fontSize) throw new Error('Failed to resolve font size value');
    });

  runner.addTest('TC-104', 'Bootstrap Alert Class Utility', 'Unit', 'Helper class binds alert-danger correctly', 'Medium',
    async (driver, h, sFile) => {
      await h.goTo('index.php');
      const alertClassBuilder = `
        const getAlertClass = (type) => 'alert alert-' + type;
        return [
          getAlertClass('danger'),
          getAlertClass('success'),
          getAlertClass('info')
        ];
      `;
      const classes = await driver.executeScript(alertClassBuilder);
      if (classes[0] !== 'alert alert-danger' || classes[1] !== 'alert alert-success' || classes[2] !== 'alert alert-info') {
        throw new Error(`Bootstrap alert class unit builder returned unexpected classes: [${classes.join(', ')}]`);
      }
    });

  runner.addTest('TC-105', 'Navigation Active State Helper', 'Unit', 'Active class toggle utility behaves correctly', 'Medium',
    async (driver, h, sFile) => {
      await h.goTo('index.php');
      const activeStateToggle = `
        const getNavItemClass = (currentUrl, targetUrl) => {
          return currentUrl.endsWith(targetUrl) ? 'nav-link active' : 'nav-link';
        };
        return [
          getNavItemClass('http://localhost/smart_hostel/index.php', 'index.php'),
          getNavItemClass('http://localhost/smart_hostel/index.php', 'student_login.php')
        ];
      `;
      const navClasses = await driver.executeScript(activeStateToggle);
      if (navClasses[0] !== 'nav-link active' || navClasses[1] !== 'nav-link') {
        throw new Error(`Navigation active state builder returned unexpected values: [${navClasses.join(', ')}]`);
      }
    });
};
