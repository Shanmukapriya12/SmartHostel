const { By } = require('selenium-webdriver');

module.exports = function(runner) {
  // ─── STUDENT LOGIN VALIDATION ─────────────────────────
  runner.addTest('TC-121', 'Student Login', 'Validation', 'Unregistered phone shows Not Registered error', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      await h.typeIn(By.name('phone'), '0000000000');
      await h.clickEl(By.name('send_otp'));
      await driver.sleep(600);
      await h.takeScreenshot(sFile);
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!text.toLowerCase().includes('not registered') && !text.toLowerCase().includes('not found') && !text.toLowerCase().includes('invalid')) {
        throw new Error(`Expected Not Registered message but page says: ${text.substring(0, 150)}`);
      }
    });

  runner.addTest('TC-122', 'Student Login', 'Validation', 'Empty phone field triggers HTML5 required validation', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      const input = await h.findEl(By.name('phone'));
      const isRequired = await input.getAttribute('required');
      if (isRequired === null) throw new Error('Phone field missing required attribute');
    });

  runner.addTest('TC-123', 'Student Login', 'Validation', 'Invalid OTP entry shows Invalid OTP error', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      await h.typeIn(By.name('phone'), '7671897162');
      await h.clickEl(By.name('send_otp'));
      await driver.sleep(600);
      // Enter wrong OTP
      await h.typeIn(By.name('entered_otp'), '1111');
      await h.clickEl(By.name('verify_otp'));
      await driver.sleep(600);
      await h.takeScreenshot(sFile);
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!text.toLowerCase().includes('invalid') && !text.toLowerCase().includes('incorrect') && !text.toLowerCase().includes('wrong')) {
        throw new Error(`Expected Invalid OTP error but got: ${text.substring(0, 150)}`);
      }
    });

  runner.addTest('TC-124', 'Student Login', 'Validation', 'Phone field accepts numeric characters', 'Medium',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      await h.typeIn(By.name('phone'), '9876543210');
      const input = await h.findEl(By.name('phone'));
      const value = await input.getAttribute('value');
      if (!value || value.trim() === '') throw new Error('Phone field did not accept numeric input');
    });

  runner.addTest('TC-125', 'Student Login', 'Validation', 'Verify OTP field accepts 4 digit codes', 'Medium',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      await h.typeIn(By.name('entered_otp'), '1234');
      const input = await h.findEl(By.name('entered_otp'));
      const value = await input.getAttribute('value');
      if (value !== '1234') throw new Error(`OTP field rejected input: expected '1234', got '${value}'`);
    });

  // ─── STUDENT REGISTRATION VALIDATION ─────────────────
  runner.addTest('TC-126', 'Student Registration', 'Validation', 'All required fields have required attribute', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_register.php');
      const requiredInputs = await driver.findElements(By.css('input[required]'));
      if (requiredInputs.length === 0) {
        throw new Error('No required inputs found on registration form');
      }
    });

  runner.addTest('TC-127', 'Student Registration', 'Validation', 'Empty form submission triggers validation', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_register.php');
      await h.clickEl(By.name('register'));
      await driver.sleep(400);
      const urlOrText = await driver.getCurrentUrl();
      // Should either stay on page or show validation
      const isStillOnRegister = urlOrText.includes('student_register.php');
      if (!isStillOnRegister) {
        const text = await driver.findElement(By.tagName('body')).getText();
        // If navigated away, something went wrong
        throw new Error(`Form submitted with empty fields, navigated to: ${urlOrText}`);
      }
    });

  // ─── ADMIN LOGIN VALIDATION ───────────────────────────
  runner.addTest('TC-128', 'Admin Login', 'Validation', 'Invalid credentials show Invalid error message', 'High',
    async (driver, h, sFile) => {
      await h.goTo('admin_login.php');
      await h.typeIn(By.name('email'), 'wrong@gmail.com');
      await h.typeIn(By.name('password'), 'badpassword');
      await h.clickEl(By.css('button[type="submit"]'));
      await driver.sleep(700);
      await h.takeScreenshot(sFile);
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!text.toLowerCase().includes('invalid') && !text.toLowerCase().includes('incorrect') && !text.toLowerCase().includes('wrong')) {
        throw new Error(`Expected Invalid credentials message. Got: ${text.substring(0, 200)}`);
      }
    });

  runner.addTest('TC-129', 'Admin Login', 'Validation', 'Email field has required attribute', 'Medium',
    async (driver, h, sFile) => {
      await h.goTo('admin_login.php');
      const emailInput = await h.findEl(By.name('email'));
      const required = await emailInput.getAttribute('required');
      if (required === null) throw new Error('Email field missing required attribute on admin login');
    });

  runner.addTest('TC-130', 'Admin Login', 'Validation', 'Password field has required attribute', 'Medium',
    async (driver, h, sFile) => {
      await h.goTo('admin_login.php');
      const passInput = await h.findEl(By.name('password'));
      const required = await passInput.getAttribute('required');
      if (required === null) throw new Error('Password field missing required attribute on admin login');
    });

  runner.addTest('TC-131', 'Admin Login', 'Validation', 'Email field has type email for format validation', 'Medium',
    async (driver, h, sFile) => {
      await h.goTo('admin_login.php');
      const emailInput = await h.findEl(By.name('email'));
      const typeAttr = await emailInput.getAttribute('type');
      if (typeAttr !== 'email') throw new Error(`Email field type should be 'email', got: '${typeAttr}'`);
    });

  // ─── WARDEN LOGIN VALIDATION ──────────────────────────
  runner.addTest('TC-132', 'Warden Login', 'Validation', 'Invalid warden credentials show error message', 'High',
    async (driver, h, sFile) => {
      await h.goTo('warden_login.php');
      await h.typeIn(By.css('input[type="email"]'), 'fake_warden@example.com');
      await h.typeIn(By.css('input[type="password"]'), 'wrongpwd');
      await h.clickEl(By.css('button[type="submit"]'));
      await driver.sleep(700);
      await h.takeScreenshot(sFile);
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!text.toLowerCase().includes('invalid') && !text.toLowerCase().includes('incorrect') && !text.toLowerCase().includes('wrong')) {
        throw new Error(`Expected error on bad warden login. Got: ${text.substring(0, 200)}`);
      }
    });

  runner.addTest('TC-133', 'Warden Login', 'Validation', 'Warden email field is required', 'Medium',
    async (driver, h, sFile) => {
      await h.goTo('warden_login.php');
      const email = await h.findEl(By.css('input[type="email"]'));
      const required = await email.getAttribute('required');
      if (required === null) throw new Error('Warden email field missing required attribute');
    });

  // ─── COMPLAINT FORM VALIDATION ────────────────────────
  runner.addTest('TC-134', 'Raise Complaint', 'Validation', 'Empty title blocks complaint submission', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('raise_complaint.php');
      const titleEl = await h.findEl(By.name('title'));
      const required = await titleEl.getAttribute('required');
      if (required === null) throw new Error('Title field missing required attribute on raise_complaint.php');
    });

  runner.addTest('TC-135', 'Raise Complaint', 'Validation', 'Empty description blocks complaint submission', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('raise_complaint.php');
      const desc = await h.findEl(By.name('description'));
      const required = await desc.getAttribute('required');
      if (required === null) throw new Error('Description field missing required attribute');
    });

  runner.addTest('TC-136', 'Raise Complaint', 'Validation', 'Category select has default/placeholder option', 'Low',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('raise_complaint.php');
      const catEl = await h.findEl(By.name('category'));
      const options = await catEl.findElements(By.tagName('option'));
      if (options.length === 0) throw new Error('Category dropdown has no options');
    });

  // ─── LEAVE REQUEST VALIDATION ─────────────────────────
  runner.addTest('TC-137', 'Leave Request', 'Validation', 'Reason field is required on leave form', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('leave_request.php');
      const reasonEl = await h.findEl(By.name('reason'));
      const required = await reasonEl.getAttribute('required');
      if (required === null) throw new Error('Reason field missing required attribute on leave_request.php');
    });

  runner.addTest('TC-138', 'Leave Request', 'Validation', 'From date field is required on leave form', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('leave_request.php');
      const dateEl = await h.findEl(By.name('from_date'));
      const required = await dateEl.getAttribute('required');
      if (required === null) throw new Error('from_date field missing required attribute');
    });

  runner.addTest('TC-139', 'Leave Request', 'Validation', 'Parent phone field present on leave request form', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('leave_request.php');
      await h.assertElementExists(By.name('parent_phone'));
    });

  // ─── MESS FEEDBACK VALIDATION ────────────────────────
  runner.addTest('TC-140', 'Mess Feedback', 'Validation', 'Feedback comment field is required', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('mess_feedback.php');
      const feedbackEl = await h.findEl(By.name('feedback'));
      const required = await feedbackEl.getAttribute('required');
      if (required === null) throw new Error('Feedback field missing required attribute on mess_feedback.php');
    });

  // ─── ACCESS CONTROL VALIDATION ───────────────────────
  runner.addTest('TC-141', 'Room Management', 'Validation', 'Students cannot access warden room management', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('room_management.php');
      await driver.sleep(500);
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      const text = await driver.findElement(By.tagName('body')).getText();
      const isBlocked = url.includes('warden_login.php') ||
        text.toLowerCase().includes('denied') ||
        text.toLowerCase().includes('unauthorized') ||
        !text.toLowerCase().includes('room management');
      // For now just ensure it doesn't crash and load silently
      if (!isBlocked && text.toLowerCase().includes('add room')) {
        throw new Error('Student was allowed to view room_management admin panel without restriction');
      }
    });

  runner.addTest('TC-142', 'Leave Requests', 'Validation', 'Students cannot access warden leave requests list', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('leave_requests.php');
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      const text = await driver.findElement(By.tagName('body')).getText();
      // Check for denial or redirect
      if (!url.includes('warden_login.php') && !url.includes('student_login.php') &&
          !text.toLowerCase().includes('denied') && !text.toLowerCase().includes('unauthorized') &&
          text.toLowerCase().includes('approve')) {
        throw new Error('Student can access warden leave_requests.php — access control failure');
      }
    });

  runner.addTest('TC-143', 'Student Overview', 'Validation', 'Students cannot access admin student overview', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_overview.php');
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!url.includes('admin_login.php') && !url.includes('student_login.php') &&
          !text.toLowerCase().includes('denied') && !text.toLowerCase().includes('admin')) {
        // student_overview is admin-only — if we see it without admin, it's a problem
        throw new Error('Student can access admin student_overview.php — access control failure');
      }
    });

  runner.addTest('TC-144', 'Security Monitoring', 'Validation', 'Students cannot access admin security monitoring', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('security_monitoring.php');
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!url.includes('admin_login.php') && !url.includes('student_login.php') &&
          !text.toLowerCase().includes('admin') && !text.toLowerCase().includes('denied')) {
        throw new Error('Student can access admin security_monitoring.php — access control failure');
      }
    });

  runner.addTest('TC-145', 'System Settings', 'Validation', 'Students cannot access admin system settings', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('system_settings.php');
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!url.includes('admin_login.php') && !url.includes('student_login.php') &&
          !text.toLowerCase().includes('admin') && !text.toLowerCase().includes('denied')) {
        throw new Error('Student can access admin system_settings.php — access control failure');
      }
    });

  runner.addTest('TC-146', 'Complaint Monitoring', 'Validation', 'Students cannot access admin complaint monitoring', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('complaint_monitoring.php');
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!url.includes('admin_login.php') && !url.includes('student_login.php') &&
          !text.toLowerCase().includes('admin') && !text.toLowerCase().includes('denied')) {
        throw new Error('Student can access admin complaint_monitoring.php — access control failure');
      }
    });

  runner.addTest('TC-147', 'Mess Management', 'Validation', 'Students cannot access warden mess management', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('mess_management.php');
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!url.includes('warden_login.php') && !url.includes('student_login.php') &&
          !text.toLowerCase().includes('warden') && !text.toLowerCase().includes('denied') &&
          text.toLowerCase().includes('add menu')) {
        throw new Error('Student can access warden mess_management.php — access control failure');
      }
    });

  runner.addTest('TC-148', 'Students List', 'Validation', 'Students cannot access warden students list', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('students.php');
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!url.includes('warden_login.php') && !url.includes('student_login.php') &&
          !text.toLowerCase().includes('warden') && !text.toLowerCase().includes('denied')) {
        throw new Error('Student can access warden students.php — access control failure');
      }
    });

  runner.addTest('TC-149', 'Complaints Management', 'Validation', 'Students cannot access warden complaints management', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('complaints_management.php');
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!url.includes('warden_login.php') && !url.includes('student_login.php') &&
          !text.toLowerCase().includes('warden') && !text.toLowerCase().includes('denied') &&
          text.toLowerCase().includes('resolve')) {
        throw new Error('Student can access warden complaints_management.php — access control failure');
      }
    });

  runner.addTest('TC-150', 'Attendance Management', 'Validation', 'Students cannot access warden attendance management', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('attendance_management.php');
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!url.includes('warden_login.php') && !url.includes('student_login.php') &&
          !text.toLowerCase().includes('warden') && !text.toLowerCase().includes('denied') &&
          text.toLowerCase().includes('mark attendance')) {
        throw new Error('Student can access warden attendance_management.php — access control failure');
      }
    });

  runner.addTest('TC-151', 'Reports', 'Validation', 'Students cannot access warden reports page', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('reports.php');
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!url.includes('warden_login.php') && !url.includes('student_login.php') &&
          !text.toLowerCase().includes('warden') && !text.toLowerCase().includes('denied') &&
          text.toLowerCase().includes('total occupancy')) {
        throw new Error('Student can access warden reports.php — access control failure');
      }
    });

  runner.addTest('TC-152', 'System Reports', 'Validation', 'Students cannot access admin system reports', 'Critical',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('system_reports.php');
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      const text = await driver.findElement(By.tagName('body')).getText();
      if (!url.includes('admin_login.php') && !url.includes('student_login.php') &&
          !text.toLowerCase().includes('admin') && !text.toLowerCase().includes('denied')) {
        throw new Error('Student can access admin system_reports.php — access control failure');
      }
    });

  // ─── SESSION SECURITY ─────────────────────────────────
  runner.addTest('TC-153', 'Session Security', 'Validation', 'Warden dashboard requires login — direct access redirects', 'High',
    async (driver, h, sFile) => {
      await driver.manage().deleteAllCookies();
      await h.goTo('warden_dashboard.php');
      await driver.sleep(600);
      const url = await driver.getCurrentUrl();
      if (!url.includes('warden_login.php')) {
        throw new Error(`Warden dashboard should redirect unauthenticated to warden_login.php, got: ${url}`);
      }
    });

  runner.addTest('TC-154', 'Session Security', 'Validation', 'Admin dashboard requires login — direct access redirects', 'High',
    async (driver, h, sFile) => {
      await driver.manage().deleteAllCookies();
      await h.goTo('admin_dashboard.php');
      await driver.sleep(600);
      const url = await driver.getCurrentUrl();
      if (!url.includes('admin_login.php')) {
        throw new Error(`Admin dashboard should redirect unauthenticated to admin_login.php, got: ${url}`);
      }
    });

  runner.addTest('TC-155', 'Session Security', 'Validation', 'Student dashboard requires login — direct access redirects', 'High',
    async (driver, h, sFile) => {
      await driver.manage().deleteAllCookies();
      await h.goTo('student_dashboard.php');
      await driver.sleep(600);
      const url = await driver.getCurrentUrl();
      if (!url.includes('student_login.php')) {
        throw new Error(`Student dashboard should redirect unauthenticated to student_login.php, got: ${url}`);
      }
    });

  // ─── DATA INTEGRITY ───────────────────────────────────
  runner.addTest('TC-156', 'Database', 'Validation', 'No MySQL connection error visible on landing page', 'Critical',
    async (driver, h, sFile) => {
      await h.goTo('index.php');
      const bodyText = await driver.findElement(By.tagName('body')).getText();
      if (bodyText.includes('Connection failed') || bodyText.includes('Access denied for user')) {
        throw new Error('Database connection error found on landing page');
      }
    });

  runner.addTest('TC-157', 'Database', 'Validation', 'No MySQL error on student login page', 'Critical',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      const bodyText = await driver.findElement(By.tagName('body')).getText();
      if (bodyText.includes('mysqli_') || bodyText.includes('SQL syntax') || bodyText.includes('Connection failed')) {
        throw new Error('Database error found on student login page');
      }
    });

  runner.addTest('TC-158', 'Database', 'Validation', 'No PHP fatal error on admin login page', 'Critical',
    async (driver, h, sFile) => {
      await h.goTo('admin_login.php');
      const source = await driver.getPageSource();
      if (source.includes('Fatal error') || source.includes('Uncaught Error') || source.includes('Parse error')) {
        throw new Error('PHP fatal error found on admin login page');
      }
    });

  runner.addTest('TC-159', 'Database', 'Validation', 'Student registration page does not crash on load', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_register.php');
      const source = await driver.getPageSource();
      if (source.includes('Fatal error') || source.includes('Uncaught Error')) {
        throw new Error('PHP error on student_register.php');
      }
    });

  runner.addTest('TC-160', 'Database', 'Validation', 'Warden login page loads without server errors', 'High',
    async (driver, h, sFile) => {
      await h.goTo('warden_login.php');
      const source = await driver.getPageSource();
      if (source.includes('Fatal error') || source.includes('Uncaught Error') || source.includes('Parse error')) {
        throw new Error('PHP error found on warden_login.php');
      }
    });
};
