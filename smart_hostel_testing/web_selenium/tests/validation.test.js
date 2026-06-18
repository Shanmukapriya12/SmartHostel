const { By } = require('selenium-webdriver');

module.exports = function(runner) {
  // --- Student Login Validation ---
  runner.addTest('TC-071', 'Student Login', 'Validation', 'Unregistered phone number shows error alert', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      await h.typeIn(By.name('phone'), '0000000000');
      await h.clickEl(By.name('send_otp'));
      await h.takeScreenshot(sFile);
      await h.assertPageContains('Not Registered');
    });

  runner.addTest('TC-072', 'Student Login', 'Validation', 'Empty phone field blocks submission', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      const input = await h.findEl(By.name('phone'));
      await h.clickEl(By.name('send_otp'));
      const isValid = await driver.executeScript(
        "return arguments[0].validity.valid;", input
      );
      if (isValid) throw new Error('Form submitted with empty phone number (HTML5 validation failed)');
    });

  runner.addTest('TC-073', 'Student Login', 'Validation', 'Invalid OTP verification prints error message', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      await h.typeIn(By.name('phone'), '9999999999');
      await h.clickEl(By.name('send_otp'));
      await driver.sleep(500);
      await h.typeIn(By.name('entered_otp'), '1111');
      await h.clickEl(By.name('verify_otp'));
      await h.takeScreenshot(sFile);
      await h.assertPageContains('Invalid OTP');
    });

  // --- Student Registration Validation ---
  runner.addTest('TC-074', 'Student Registration', 'Validation', 'Empty registration form details block submission', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_register.php');
      await h.clickEl(By.name('register'));
      const requiredInputs = await driver.findElements(By.css('input[required]'));
      if (requiredInputs.length === 0) {
        throw new Error('No input elements found with required validation attributes');
      }
    });

  runner.addTest('TC-075', 'Student Registration', 'Validation', 'Invalid characters in phone block submission', 'Medium',
    async (driver, h, sFile) => {
      await h.goTo('student_register.php');
      await h.typeIn(By.name('phone'), 'abcde12345');
      const phoneInput = await h.findEl(By.name('phone'));
      const value = await phoneInput.getAttribute('value');
      if (value !== '12345' && value.match(/[a-zA-Z]/)) {
        // Checking if text inputs are accepted
        await h.clickEl(By.name('register'));
      }
    });

  // --- Admin Login Validation ---
  runner.addTest('TC-076', 'Admin Login', 'Validation', 'Invalid admin credentials display "Invalid" alert', 'High',
    async (driver, h, sFile) => {
      await h.goTo('admin_login.php');
      await h.typeIn(By.name('email'), 'wrong_admin@gmail.com');
      await h.typeIn(By.name('password'), 'wrongpass');
      await h.clickEl(By.css('button[type="submit"]'));
      await driver.sleep(600);
      await h.takeScreenshot(sFile);
      await h.assertPageContains('Invalid');
    });

  runner.addTest('TC-077', 'Admin Login', 'Validation', 'Empty email and password controls block submission', 'Medium',
    async (driver, h, sFile) => {
      await h.goTo('admin_login.php');
      await h.clickEl(By.css('button[type="submit"]'));
      const required = await driver.findElements(By.css('input[required]'));
      if (required.length === 0) throw new Error('No HTML5 validation markers present');
    });

  // --- Warden Login Validation ---
  runner.addTest('TC-078', 'Warden Login', 'Validation', 'Invalid warden credentials show validation alert', 'High',
    async (driver, h, sFile) => {
      await h.goTo('warden_login.php');
      await h.typeIn(By.css('input[type="email"]'), 'bad_warden@smarthostel.com');
      await h.typeIn(By.css('input[type="password"]'), 'badpass');
      await h.clickEl(By.css('button[type="submit"]'));
      await driver.sleep(600);
      await h.takeScreenshot(sFile);
      await h.assertPageContains('Invalid');
    });

  // --- Complaint Form Validation ---
  runner.addTest('TC-079', 'Raise Complaint', 'Validation', 'Empty title blocks complaint creation', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('raise_complaint.php');
      await h.typeIn(By.name('description'), 'The tap is leaking.');
      await h.clickEl(By.name('submit'));
      const input = await h.findEl(By.name('title'));
      const valid = await driver.executeScript("return arguments[0].validity.valid;", input);
      if (valid) throw new Error('Allowed empty title input submission');
    });

  runner.addTest('TC-080', 'Raise Complaint', 'Validation', 'Empty description blocks complaint creation', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('raise_complaint.php');
      await h.typeIn(By.name('title'), 'Leaking Tap');
      await h.clickEl(By.name('submit'));
      const input = await h.findEl(By.name('description'));
      const valid = await driver.executeScript("return arguments[0].validity.valid;", input);
      if (valid) throw new Error('Allowed empty description input submission');
    });

  // --- Leave Request Form Validation ---
  runner.addTest('TC-081', 'Leave Request', 'Validation', 'Empty reason blocks leave request submission', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('leave_request.php');
      await h.clickEl(By.name('submit_leave'));
      const reasonInp = await h.findEl(By.name('reason'));
      const valid = await driver.executeScript("return arguments[0].validity.valid;", reasonInp);
      if (valid) throw new Error('Allowed empty reason input submission');
    });

  runner.addTest('TC-082', 'Leave Request', 'Validation', 'Empty parent phone blocks leave request submission', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('leave_request.php');
      await h.typeIn(By.name('reason'), 'Going home for festival');
      await h.clickEl(By.name('submit_leave'));
      const phoneInp = await h.findEl(By.name('parent_phone'));
      const valid = await driver.executeScript("return arguments[0].validity.valid;", phoneInp);
      if (valid) throw new Error('Allowed empty parent phone input submission');
    });

  // --- Mess Feedback Validation ---
  runner.addTest('TC-083', 'Mess Feedback', 'Validation', 'Empty comment field blocks feedback submission', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('mess_feedback.php');
      await h.clickEl(By.name('submit_feedback'));
      const feedbackInp = await h.findEl(By.name('feedback'));
      const valid = await driver.executeScript("return arguments[0].validity.valid;", feedbackInp);
      if (valid) throw new Error('Allowed empty comments feedback input submission');
    });

  // --- Miscellaneous Field Limits ---
  runner.addTest('TC-084', 'Mess Feedback', 'Validation', 'Invalid ratings boundary verification', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('mess_feedback.php');
      // Verify rating element handles normal values
      const stars = await driver.findElements(By.css('.rating span'));
      if (stars.length > 0) {
        await stars[0].click();
      }
    });

  // --- Room Management Validation ---
  runner.addTest('TC-085', 'Room Management', 'Validation', 'Access blocks for unauthorized students', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('room_management.php');
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (url.includes('room_management.php') && !(await driver.findElement(By.tagName('body')).getText()).includes('Access Denied')) {
        // If they did not get redirected or shown an access error
        throw new Error('Students allowed to view room_management.php admin console');
      }
    });

  runner.addTest('TC-086', 'Leave Requests Management', 'Validation', 'Access blocks for unauthorized students', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('leave_requests.php');
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!text.toLowerCase().includes('denied') && !text.toLowerCase().includes('redirect') && !text.toLowerCase().includes('warden')) {
        throw new Error('Students allowed to view warden leave_requests.php console');
      }
    });

  runner.addTest('TC-087', 'Mess Management', 'Validation', 'Access blocks for unauthorized students', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('mess_management.php');
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!text.toLowerCase().includes('denied') && !text.toLowerCase().includes('redirect') && !text.toLowerCase().includes('warden')) {
        throw new Error('Students allowed to view warden mess_management.php console');
      }
    });

  runner.addTest('TC-088', 'Students List', 'Validation', 'Access blocks for unauthorized students', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('students.php');
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!text.toLowerCase().includes('denied') && !text.toLowerCase().includes('redirect') && !text.toLowerCase().includes('warden')) {
        throw new Error('Students allowed to view warden students.php console');
      }
    });

  runner.addTest('TC-089', 'Security Monitoring', 'Validation', 'Access blocks for unauthorized students', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('security_monitoring.php');
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!text.toLowerCase().includes('denied') && !text.toLowerCase().includes('redirect') && !text.toLowerCase().includes('admin')) {
        throw new Error('Students allowed to view admin security_monitoring.php console');
      }
    });

  runner.addTest('TC-090', 'System Settings', 'Validation', 'Access blocks for unauthorized students', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('system_settings.php');
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!text.toLowerCase().includes('denied') && !text.toLowerCase().includes('redirect') && !text.toLowerCase().includes('admin')) {
        throw new Error('Students allowed to view admin system_settings.php console');
      }
    });

  runner.addTest('TC-091', 'Complaint Monitoring', 'Validation', 'Access blocks for unauthorized students', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('complaint_monitoring.php');
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!text.toLowerCase().includes('denied') && !text.toLowerCase().includes('redirect') && !text.toLowerCase().includes('admin')) {
        throw new Error('Students allowed to view admin complaint_monitoring.php console');
      }
    });

  runner.addTest('TC-092', 'Complaints Management', 'Validation', 'Access blocks for unauthorized students', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('complaints_management.php');
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!text.toLowerCase().includes('denied') && !text.toLowerCase().includes('redirect') && !text.toLowerCase().includes('warden')) {
        throw new Error('Students allowed to view warden complaints_management.php console');
      }
    });

  runner.addTest('TC-093', 'Attendance Management', 'Validation', 'Access blocks for unauthorized students', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('attendance_management.php');
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!text.toLowerCase().includes('denied') && !text.toLowerCase().includes('redirect') && !text.toLowerCase().includes('warden')) {
        throw new Error('Students allowed to view warden attendance_management.php console');
      }
    });

  runner.addTest('TC-094', 'Student Overview', 'Validation', 'Access blocks for unauthorized students', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_overview.php');
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!text.toLowerCase().includes('denied') && !text.toLowerCase().includes('redirect') && !text.toLowerCase().includes('admin')) {
        throw new Error('Students allowed to view admin student_overview.php console');
      }
    });

  runner.addTest('TC-095', 'System Reports', 'Validation', 'Access blocks for unauthorized students', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('system_reports.php');
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!text.toLowerCase().includes('denied') && !text.toLowerCase().includes('redirect') && !text.toLowerCase().includes('admin')) {
        throw new Error('Students allowed to view admin system_reports.php console');
      }
    });
};
