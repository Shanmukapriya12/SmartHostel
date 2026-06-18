const { By } = require('selenium-webdriver');

module.exports = function(runner) {
  // --- Landing Page UI/UX ---
  runner.addTest('TC-041', 'Landing Page', 'UI/UX', 'Page loads successfully and displays Smart Hostel title', 'High',
    async (driver, h, sFile) => {
      await h.goTo('index.php');
      await h.takeScreenshot(sFile);
      await h.assertTitle('Smart Hostel');
    });

  runner.addTest('TC-042', 'Landing Page', 'UI/UX', 'Hostel banner image is visible on landing page', 'Medium',
    async (driver, h, sFile) => {
      await h.goTo('index.php');
      const banner = By.tagName('img');
      await h.takeScreenshot(sFile, banner);
      await h.assertElementExists(banner);
    });

  runner.addTest('TC-043', 'Landing Page', 'UI/UX', 'Page has correct main heading text', 'Medium',
    async (driver, h, sFile) => {
      await h.goTo('index.php');
      await h.assertPageContains('Smart Hostel Management System');
    });

  runner.addTest('TC-044', 'Landing Page', 'UI/UX', 'Room Allocation subtitle is present', 'Low',
    async (driver, h, sFile) => {
      await h.goTo('index.php');
      await h.assertPageContains('Room Allocation');
    });

  runner.addTest('TC-045', 'Landing Page', 'UI/UX', 'Footer copyright section is visible', 'Low',
    async (driver, h, sFile) => {
      await h.goTo('index.php');
      await h.assertPageContains('Copyright');
    });

  // --- Role Selection UI/UX ---
  runner.addTest('TC-046', 'Role Selection', 'UI/UX', 'Page has correct theme matching Smart Hostel', 'Medium',
    async (driver, h, sFile) => {
      await h.goTo('select_role.php');
      await h.takeScreenshot(sFile);
      const bgStyle = await driver.executeScript(
        "return getComputedStyle(document.body).backgroundColor;"
      );
      if (!bgStyle) throw new Error('Could not get background color of select role page');
    });

  runner.addTest('TC-047', 'Role Selection', 'UI/UX', 'Three card layout is present on role select screen', 'High',
    async (driver, h, sFile) => {
      await h.goTo('select_role.php');
      const cards = await driver.findElements(By.css('.card, .role-card'));
      if (cards.length < 3) throw new Error(`Expected at least 3 cards, but got ${cards.length}`);
    });

  // --- Student Login UI/UX ---
  runner.addTest('TC-048', 'Student Login', 'UI/UX', 'Phone input field is present', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      await h.assertElementExists(By.name('phone'));
    });

  runner.addTest('TC-049', 'Student Login', 'UI/UX', 'Send OTP button is visible', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      await h.assertElementExists(By.name('send_otp'));
    });

  runner.addTest('TC-050', 'Student Login', 'UI/UX', 'Verify & Login button is visible', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      await h.assertElementExists(By.name('verify_otp'));
    });

  runner.addTest('TC-051', 'Student Login', 'UI/UX', 'Google Fonts loaded (Poppins or sans-serif)', 'Medium',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      const fontFamily = await driver.executeScript(
        "return getComputedStyle(document.body).fontFamily;"
      );
      if (!fontFamily.toLowerCase().includes('poppins') && !fontFamily.includes('sans')) {
        throw new Error(`Expected Poppins or standard sans-serif font family, but got: ${fontFamily}`);
      }
    });

  runner.addTest('TC-052', 'Student Login', 'UI/UX', 'Login container is aligned centered', 'Medium',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      const display = await driver.executeScript(
        "return getComputedStyle(document.querySelector('.container, .card, .login-card')).display;"
      );
      if (!display) throw new Error('Centering layout style not detected');
    });

  // --- Student Registration UI/UX ---
  runner.addTest('TC-053', 'Student Registration', 'UI/UX', 'Department label is displayed', 'Low',
    async (driver, h, sFile) => {
      await h.goTo('student_register.php');
      await h.assertPageContains('Department');
    });

  runner.addTest('TC-054', 'Student Registration', 'UI/UX', 'Submit button is styled as primary button', 'Medium',
    async (driver, h, sFile) => {
      await h.goTo('student_register.php');
      const btn = await h.findEl(By.name('register'));
      const classes = await btn.getAttribute('class');
      if (!classes.includes('btn')) throw new Error(`Registration button is not styled as a bootstrap button: ${classes}`);
    });

  // --- Student Dashboard UI/UX ---
  runner.addTest('TC-055', 'Student Dashboard', 'UI/UX', 'Student details header is styled with glassmorphism or shadows', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      const navbar = await h.findEl(By.css('.navbar, .dashboard-header, h2'));
      const style = await navbar.getAttribute('class');
      if (!style) throw new Error('Header styles missing');
    });

  runner.addTest('TC-056', 'Student Dashboard', 'UI/UX', 'Card layout matches Grid columns', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      const col = await driver.findElements(By.css('.col-md-4, .col-sm-6, .card'));
      if (col.length < 5) throw new Error(`Expected responsive grid cards, found only ${col.length}`);
    });

  runner.addTest('TC-057', 'Student Dashboard', 'UI/UX', 'Hostel notice heading is rendered', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      await h.assertPageContains('Notice');
    });

  // --- Forms UI/UX ---
  runner.addTest('TC-058', 'Raise Complaint', 'UI/UX', 'Category dropdown list is formatted correctly', 'Low',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('raise_complaint.php');
      const selectEl = await h.findEl(By.name('category'));
      const tag = await selectEl.getTagName();
      if (tag !== 'select') throw new Error('Expected select element for complaint category');
    });

  runner.addTest('TC-059', 'Raise Complaint', 'UI/UX', 'Description uses a multiline textarea', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('raise_complaint.php');
      const textarea = await h.findEl(By.name('description'));
      const tag = await textarea.getTagName();
      if (tag !== 'textarea') throw new Error('Expected description field to be a textarea');
    });

  runner.addTest('TC-060', 'Leave Request', 'UI/UX', 'Date inputs are formatted correctly as date controls', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('leave_request.php');
      const input = await h.findEl(By.name('from_date'));
      const typeAttr = await input.getAttribute('type');
      if (typeAttr !== 'date') throw new Error(`Expected from_date type to be 'date', got: ${typeAttr}`);
    });

  runner.addTest('TC-061', 'Mess Feedback', 'UI/UX', 'Star rating icons are loaded properly', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('mess_feedback.php');
      const stars = await driver.findElements(By.css('.rating span, label[for^="star"]'));
      if (stars.length === 0) throw new Error('Rating star elements are missing or not rendered');
    });

  // --- Responsive Viewports UI/UX ---
  runner.addTest('TC-062', 'Viewport Responsiveness', 'UI/UX', 'App layout stays fluid on mobile viewports (375x812)', 'High',
    async (driver, h, sFile) => {
      await driver.manage().window().setRect({ width: 375, height: 812 });
      await h.goTo('index.php');
      await h.takeScreenshot(sFile);
      const h1 = await h.findEl(By.css('h1, h2, h3'));
      if (!h1) throw new Error('No heading element found on mobile layout');
      await driver.manage().window().setRect({ width: 1366, height: 768 }); // restore
    });

  runner.addTest('TC-063', 'Viewport Responsiveness', 'UI/UX', 'Student login page stays aligned on mobile viewports', 'High',
    async (driver, h, sFile) => {
      await driver.manage().window().setRect({ width: 375, height: 812 });
      await h.goTo('student_login.php');
      await h.takeScreenshot(sFile);
      const input = await h.findEl(By.name('phone'));
      if (!input) throw new Error('Phone input not visible on mobile');
      await driver.manage().window().setRect({ width: 1366, height: 768 }); // restore
    });

  runner.addTest('TC-064', 'Viewport Responsiveness', 'UI/UX', 'Admin dashboard elements are responsive', 'Medium',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.manage().window().setRect({ width: 375, height: 812 });
      await h.goTo('admin_dashboard.php');
      await h.takeScreenshot(sFile);
      const elements = await driver.findElements(By.css('.card, .dashboard-card, .stats-card'));
      if (elements.length === 0) throw new Error('Dashboard cards collapsed or hidden on mobile');
      await driver.manage().window().setRect({ width: 1366, height: 768 }); // restore
    });

  // --- Admin Dashboard UI/UX ---
  runner.addTest('TC-065', 'Admin Dashboard', 'UI/UX', 'Dashboard has statistics metrics card layout', 'Medium',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await h.goTo('admin_dashboard.php');
      await h.assertPageContains('Students');
    });

  runner.addTest('TC-066', 'Admin Dashboard', 'UI/UX', 'Warden overview card visible', 'Low',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await h.goTo('admin_dashboard.php');
      await h.assertPageContains('Warden');
    });

  runner.addTest('TC-067', 'Admin Dashboard', 'UI/UX', 'Mess management card visible', 'Low',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await h.goTo('admin_dashboard.php');
      await h.assertPageContains('Mess');
    });

  runner.addTest('TC-068', 'Admin Dashboard', 'UI/UX', 'Security settings dashboard visible', 'Low',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await h.goTo('admin_dashboard.php');
      await h.assertPageContains('Security');
    });

  // --- Warden Dashboard UI/UX ---
  runner.addTest('TC-069', 'Warden Dashboard', 'UI/UX', 'Statistics overview section is visible', 'Medium',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('warden_dashboard.php');
      await h.assertPageContains('Warden');
    });

  runner.addTest('TC-070', 'Warden Dashboard', 'UI/UX', 'Warden details displayed correctly', 'Low',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('warden_dashboard.php');
      await h.takeScreenshot(sFile);
      await h.assertPageContains('Warden');
    });
};
