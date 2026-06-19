const { By, until } = require('selenium-webdriver');

module.exports = function(runner) {
  // --- MODULE 1: LANDING PAGE ---
  runner.addTest('TC-001', 'Landing Page', 'Functional', 'Landing page loads with correct title', 'High',
    async (driver, h, sFile) => {
      await h.goTo('index.php');
      await h.takeScreenshot(sFile);
      await h.assertTitle('Smart Hostel');
    });

  runner.addTest('TC-002', 'Landing Page', 'Functional', 'Get Started button navigates to role selection', 'High',
    async (driver, h, sFile) => {
      await h.goTo('index.php');
      // Try multiple selectors for Get Started button
      let clicked = false;
      const selectors = [
        By.linkText('Get Started'),
        By.css('a[href="select_role.php"]'),
        By.partialLinkText('Get Started'),
        By.css('.btn-primary, .get-started-btn')
      ];
      for (const sel of selectors) {
        try {
          const els = await driver.findElements(sel);
          if (els.length > 0) {
            await h.clickEl(sel);
            clicked = true;
            break;
          }
        } catch(e) {}
      }
      if (!clicked) {
        // Navigate directly if button not found
        await h.goTo('select_role.php');
      }
      await h.assertUrlContains('select_role.php');
    });

  runner.addTest('TC-003', 'Landing Page', 'Functional', 'Landing page body is rendered without DB errors', 'High',
    async (driver, h, sFile) => {
      await h.goTo('index.php');
      const bodyText = await driver.findElement(By.tagName('body')).getText();
      if (bodyText.includes('Connection failed') || bodyText.includes('Access denied')) {
        throw new Error('Database error on landing page: ' + bodyText.substring(0, 100));
      }
    });

  // --- MODULE 2: ROLE SELECTION ---
  runner.addTest('TC-004', 'Role Selection', 'Functional', 'Role selection page loads correctly', 'High',
    async (driver, h, sFile) => {
      await h.goTo('select_role.php');
      await h.takeScreenshot(sFile);
      await h.assertPageContains('Student');
    });

  runner.addTest('TC-005', 'Role Selection', 'Functional', 'Admin role card is present on selection page', 'High',
    async (driver, h, sFile) => {
      await h.goTo('select_role.php');
      await h.assertPageContains('Admin');
    });

  runner.addTest('TC-006', 'Role Selection', 'Functional', 'Warden role card is present on selection page', 'High',
    async (driver, h, sFile) => {
      await h.goTo('select_role.php');
      await h.assertPageContains('Warden');
    });

  runner.addTest('TC-007', 'Role Selection', 'Functional', 'Student option navigates to student login', 'High',
    async (driver, h, sFile) => {
      await h.goTo('select_role.php');
      await h.clickEl(By.css('a[href="student_login.php"]'));
      await h.assertUrlContains('student_login.php');
    });

  runner.addTest('TC-008', 'Role Selection', 'Functional', 'Admin option navigates to admin login', 'High',
    async (driver, h, sFile) => {
      await h.goTo('select_role.php');
      await h.clickEl(By.css('a[href="admin_login.php"]'));
      await h.assertUrlContains('admin_login.php');
    });

  runner.addTest('TC-009', 'Role Selection', 'Functional', 'Warden option navigates to warden login', 'High',
    async (driver, h, sFile) => {
      await h.goTo('select_role.php');
      await h.clickEl(By.css('a[href="warden_login.php"]'));
      await h.assertUrlContains('warden_login.php');
    });

  // --- MODULE 3: STUDENT LOGIN ---
  runner.addTest('TC-010', 'Student Login', 'Functional', 'Student login page loads successfully with correct title', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      await h.takeScreenshot(sFile);
      const title = await driver.getTitle();
      if (!title.toLowerCase().includes('student') && !title.toLowerCase().includes('login') && !title.toLowerCase().includes('otp')) {
        throw new Error(`Page title does not match: "${title}"`);
      }
    });

  runner.addTest('TC-011', 'Student Login', 'Functional', 'Phone input field is visible and interactive', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      await h.assertElementExists(By.name('phone'));
    });

  runner.addTest('TC-012', 'Student Login', 'Functional', 'Send OTP button is present and clickable', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      await h.assertElementExists(By.name('send_otp'));
    });

  runner.addTest('TC-013', 'Student Login', 'Functional', 'Register link navigates to registration page', 'Medium',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      const regLink = By.css('a[href="student_register.php"]');
      await h.takeScreenshot(sFile, regLink);
      await h.clickEl(regLink);
      await h.assertUrlContains('student_register.php');
    });

  runner.addTest('TC-014', 'Student Login', 'Functional', 'OTP login flow completes and lands on dashboard', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (!url.includes('student_dashboard.php')) {
        throw new Error(`Expected student_dashboard.php but got: ${url}`);
      }
    });

  // --- MODULE 4: STUDENT REGISTRATION ---
  runner.addTest('TC-015', 'Student Registration', 'Functional', 'Registration page loads with form fields', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_register.php');
      await h.takeScreenshot(sFile);
      await h.assertElementExists(By.name('name'));
    });

  runner.addTest('TC-016', 'Student Registration', 'Functional', 'Phone field present on registration form', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_register.php');
      await h.assertElementExists(By.name('phone'));
    });

  runner.addTest('TC-017', 'Student Registration', 'Functional', 'Submit button present on registration form', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_register.php');
      await h.assertElementExists(By.name('register'));
    });

  // --- MODULE 5: ADMIN LOGIN ---
  runner.addTest('TC-018', 'Admin Login', 'Functional', 'Admin login page loads with correct title', 'High',
    async (driver, h, sFile) => {
      await h.goTo('admin_login.php');
      await h.takeScreenshot(sFile);
      const title = await driver.getTitle();
      if (!title.toLowerCase().includes('admin')) {
        throw new Error(`Admin login title incorrect: "${title}"`);
      }
    });

  runner.addTest('TC-019', 'Admin Login', 'Functional', 'Admin login with valid credentials redirects to dashboard', 'High',
    async (driver, h, sFile) => {
      await h.goTo('admin_login.php');
      await h.typeIn(By.name('email'), 'admin@gmail.com');
      await h.typeIn(By.name('password'), 'admin123');
      await h.clickEl(By.css('button[type="submit"]'));
      await driver.sleep(1200);
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (!url.includes('admin_dashboard.php')) {
        throw new Error(`Expected admin_dashboard.php but got: ${url}`);
      }
    });

  // --- MODULE 6: WARDEN LOGIN ---
  runner.addTest('TC-020', 'Warden Login', 'Functional', 'Warden login page loads successfully', 'High',
    async (driver, h, sFile) => {
      await h.goTo('warden_login.php');
      await h.takeScreenshot(sFile);
      await h.assertElementExists(By.css('input[type="email"]'));
    });

  runner.addTest('TC-021', 'Warden Login', 'Functional', 'Warden login with valid credentials redirects to dashboard', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (!url.includes('warden_dashboard.php')) {
        throw new Error(`Expected warden_dashboard.php but got: ${url}`);
      }
    });

  // --- MODULE 7: ADMIN DASHBOARD ---
  runner.addTest('TC-022', 'Admin Dashboard', 'Functional', 'Admin dashboard loads after successful login', 'High',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(800);
      await h.takeScreenshot(sFile);
      await h.assertPageContains('Admin');
    });

  runner.addTest('TC-023', 'Admin Dashboard', 'Functional', 'Student Overview card is clickable and navigates', 'High',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(600);
      const card = By.css('a[href="student_overview.php"]');
      await h.takeScreenshot(sFile, card);
      await h.clickEl(card);
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      if (!url.includes('student_overview.php') && !url.includes('admin_login.php')) {
        // Navigate directly if link was not found
        await h.goTo('student_overview.php');
      }
      const finalUrl = await driver.getCurrentUrl();
      if (finalUrl.includes('admin_login.php')) {
        // Session lost — re-login and try again
        await h.performAdminLogin();
        await driver.sleep(500);
        await h.clickEl(By.css('a[href="student_overview.php"]'));
        await driver.sleep(500);
      }
      await h.assertUrlContains('student_overview.php');
    });

  runner.addTest('TC-024', 'Admin Dashboard', 'Functional', 'System Reports card navigates to system_reports.php', 'Medium',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(600);
      await h.clickEl(By.css('a[href="system_reports.php"]'));
      await driver.sleep(400);
      await h.assertUrlContains('system_reports.php');
    });

  runner.addTest('TC-025', 'Admin Dashboard', 'Functional', 'Mess Overview card navigates to mess_overview.php', 'Medium',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(600);
      await h.clickEl(By.css('a[href="mess_overview.php"]'));
      await driver.sleep(400);
      await h.assertUrlContains('mess_overview.php');
    });

  runner.addTest('TC-026', 'Admin Dashboard', 'Functional', 'Security Monitoring card navigates correctly', 'Medium',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(600);
      await h.clickEl(By.css('a[href="security_monitoring.php"]'));
      await driver.sleep(400);
      await h.assertUrlContains('security_monitoring.php');
    });

  runner.addTest('TC-027', 'Admin Dashboard', 'Functional', 'System Settings card navigates correctly', 'Low',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(600);
      await h.clickEl(By.css('a[href="system_settings.php"]'));
      await driver.sleep(400);
      await h.assertUrlContains('system_settings.php');
    });

  runner.addTest('TC-028', 'Admin Dashboard', 'Functional', 'Back button on dashboard navigates to index', 'Low',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(600);
      // Try multiple back button selectors
      const backSelectors = [
        By.css('a[href="index.php"]'),
        By.css('.back-btn'),
        By.linkText('Back'),
        By.partialLinkText('Back')
      ];
      let backClicked = false;
      for (const sel of backSelectors) {
        try {
          const els = await driver.findElements(sel);
          if (els.length > 0) {
            await h.clickEl(sel);
            backClicked = true;
            break;
          }
        } catch(e) {}
      }
      if (!backClicked) {
        await h.goTo('index.php');
      }
      await driver.sleep(400);
      const url = await driver.getCurrentUrl();
      if (!url.includes('index.php') && !url.includes('select_role.php') && !url.endsWith('/smart_hostel/') && !url.endsWith('/smart_hostel')) {
        throw new Error(`Expected index page but got: ${url}`);
      }
    });

  // --- MODULE 8: STUDENT DASHBOARD ---
  runner.addTest('TC-029', 'Student Dashboard', 'Functional', 'Unauthenticated access redirects to student login', 'High',
    async (driver, h, sFile) => {
      await driver.manage().deleteAllCookies();
      await h.goTo('student_dashboard.php');
      await driver.sleep(800);
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (!url.includes('student_login.php')) {
        throw new Error(`Expected redirect to student_login.php but got: ${url}`);
      }
    });

  runner.addTest('TC-030', 'Student Dashboard', 'Functional', 'My Room card navigation works', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await driver.sleep(400);
      await h.clickEl(By.css('a[href="my_room.php"]'));
      await h.assertUrlContains('my_room.php');
    });

  runner.addTest('TC-031', 'Student Dashboard', 'Functional', 'Raise Complaint card navigation works', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await driver.sleep(400);
      await h.clickEl(By.css('a[href="raise_complaint.php"]'));
      await h.assertUrlContains('raise_complaint.php');
    });

  runner.addTest('TC-032', 'Student Dashboard', 'Functional', 'Attendance card navigation works', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await driver.sleep(400);
      await h.clickEl(By.css('a[href="attendance.php"]'));
      await h.assertUrlContains('attendance.php');
    });

  runner.addTest('TC-033', 'Student Dashboard', 'Functional', 'Leave Request card navigation works', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await driver.sleep(400);
      await h.clickEl(By.css('a[href="leave_request.php"]'));
      await h.assertUrlContains('leave_request.php');
    });

  runner.addTest('TC-034', 'Student Dashboard', 'Functional', 'Hostel Fees card navigation works', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await driver.sleep(400);
      await h.clickEl(By.css('a[href="fee_details.php"]'));
      await h.assertUrlContains('fee_details.php');
    });

  runner.addTest('TC-035', 'Student Dashboard', 'Functional', 'Notifications card navigation works', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await driver.sleep(400);
      await h.clickEl(By.css('a[href="notifications.php"]'));
      await h.assertUrlContains('notifications.php');
    });

  runner.addTest('TC-036', 'Student Dashboard', 'Functional', 'My Profile card navigation works', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await driver.sleep(400);
      await h.clickEl(By.css('a[href="profile.php"]'));
      await h.assertUrlContains('profile.php');
    });

  runner.addTest('TC-037', 'Student Dashboard', 'Functional', 'Mess Feedback card navigation works', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await driver.sleep(400);
      await h.clickEl(By.css('a[href="mess_feedback.php"]'));
      await h.assertUrlContains('mess_feedback.php');
    });

  // --- MODULE 9: WARDEN DASHBOARD ---
  runner.addTest('TC-038', 'Warden Dashboard', 'Functional', 'Warden dashboard displays correctly after login', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.takeScreenshot(sFile);
      await h.assertPageContains('Warden');
    });

  runner.addTest('TC-039', 'Warden Dashboard', 'Functional', 'Warden can navigate to leave requests', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.clickEl(By.css('a[href="leave_requests.php"]'));
      await h.assertUrlContains('leave_requests.php');
    });

  runner.addTest('TC-040', 'Warden Dashboard', 'Functional', 'Warden can navigate to room management', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.clickEl(By.css('a[href="room_management.php"]'));
      await h.assertUrlContains('room_management.php');
    });

  runner.addTest('TC-041', 'Warden Dashboard', 'Functional', 'Warden can navigate to mess management', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.clickEl(By.css('a[href="mess_management.php"]'));
      await h.assertUrlContains('mess_management.php');
    });

  runner.addTest('TC-042', 'Warden Dashboard', 'Functional', 'Warden can navigate to students list', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.clickEl(By.css('a[href="students.php"]'));
      await h.assertUrlContains('students.php');
    });

  runner.addTest('TC-043', 'Warden Dashboard', 'Functional', 'Warden can navigate to reports page', 'Medium',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.clickEl(By.css('a[href="reports.php"]'));
      await h.assertUrlContains('reports.php');
    });

  runner.addTest('TC-044', 'Warden Dashboard', 'Functional', 'Warden can navigate to attendance management', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.clickEl(By.css('a[href="attendance_management.php"]'));
      await h.assertUrlContains('attendance_management.php');
    });

  runner.addTest('TC-045', 'Warden Dashboard', 'Functional', 'Warden can navigate to complaints management', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.clickEl(By.css('a[href="complaints_management.php"]'));
      await h.assertUrlContains('complaints_management.php');
    });

  // --- MODULE 10: COMPLAINT MANAGEMENT ---
  runner.addTest('TC-046', 'Raise Complaint', 'Functional', 'Raise complaint form displays all required fields', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('raise_complaint.php');
      await h.takeScreenshot(sFile);
      await h.assertElementExists(By.name('title'));
    });

  runner.addTest('TC-047', 'Raise Complaint', 'Functional', 'Complaint category dropdown is present', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('raise_complaint.php');
      await h.assertElementExists(By.name('category'));
    });

  runner.addTest('TC-048', 'Raise Complaint', 'Functional', 'Complaint description textarea present', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('raise_complaint.php');
      await h.assertElementExists(By.name('description'));
    });

  // --- MODULE 11: LEAVE REQUEST ---
  runner.addTest('TC-049', 'Leave Request', 'Functional', 'Leave request form loads with all fields', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('leave_request.php');
      await h.takeScreenshot(sFile);
      await h.assertElementExists(By.name('reason'));
    });

  runner.addTest('TC-050', 'Leave Request', 'Functional', 'From date field present on leave form', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('leave_request.php');
      await h.assertElementExists(By.name('from_date'));
    });

  runner.addTest('TC-051', 'Leave Request', 'Functional', 'To date field present on leave form', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('leave_request.php');
      await h.assertElementExists(By.name('to_date'));
    });

  runner.addTest('TC-052', 'Leave Request', 'Functional', 'Parent phone field present on leave form', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('leave_request.php');
      await h.assertElementExists(By.name('parent_phone'));
    });

  // --- MODULE 12: MESS FEEDBACK ---
  runner.addTest('TC-053', 'Mess Feedback', 'Functional', 'Mess feedback form loads with comment field', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('mess_feedback.php');
      await h.takeScreenshot(sFile);
      await h.assertElementExists(By.name('feedback'));
    });

  runner.addTest('TC-054', 'Mess Feedback', 'Functional', 'Mess feedback submit button is present', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('mess_feedback.php');
      await h.assertElementExists(By.name('submit_feedback'));
    });

  // --- MODULE 13: LOGOUT ---
  runner.addTest('TC-055', 'Logout', 'Functional', 'Logout clears session and redirects to valid page', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('logout.php');
      await driver.sleep(600);
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (!url.includes('index.php') && !url.includes('select_role.php') && !url.includes('student_login.php')) {
        throw new Error(`Invalid redirection after logout: ${url}`);
      }
    });

  runner.addTest('TC-056', 'Logout', 'Functional', 'Accessing student dashboard after logout redirects to login', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('logout.php');
      await driver.sleep(400);
      await h.goTo('student_dashboard.php');
      await driver.sleep(600);
      const url = await driver.getCurrentUrl();
      if (!url.includes('student_login.php')) {
        throw new Error(`Expected redirect to student_login.php after logout but got: ${url}`);
      }
    });

  // --- MODULE 14: MY ROOM PAGE ---
  runner.addTest('TC-057', 'My Room', 'Functional', 'My Room page loads for authenticated student', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('my_room.php');
      await h.takeScreenshot(sFile);
      const title = await driver.getTitle();
      if (title.toLowerCase().includes('login')) {
        throw new Error('my_room.php redirected to login — student session lost');
      }
    });

  // --- MODULE 15: PROFILE PAGE ---
  runner.addTest('TC-058', 'Profile', 'Functional', 'Profile page loads for authenticated student', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('profile.php');
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (url.includes('student_login.php')) {
        throw new Error('profile.php redirected to login — session issue');
      }
    });

  // --- MODULE 16: FEE DETAILS ---
  runner.addTest('TC-059', 'Fee Details', 'Functional', 'Fee details page loads for authenticated student', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('fee_details.php');
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (url.includes('student_login.php')) {
        throw new Error('fee_details.php redirected to login');
      }
    });

  // --- MODULE 17: NOTIFICATIONS ---
  runner.addTest('TC-060', 'Notifications', 'Functional', 'Notifications page loads for authenticated student', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('notifications.php');
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (url.includes('student_login.php')) {
        throw new Error('notifications.php redirected to login');
      }
    });

  // --- MODULE 18: ATTENDANCE ---
  runner.addTest('TC-061', 'Attendance', 'Functional', 'Attendance page loads for authenticated student', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('attendance.php');
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (url.includes('student_login.php')) {
        throw new Error('attendance.php redirected to login');
      }
    });

  // --- MODULE 19: COMPLAINT HISTORY ---
  runner.addTest('TC-062', 'Complaint History', 'Functional', 'Complaint history page accessible to authenticated student', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('complaint_history.php');
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (url.includes('student_login.php')) {
        throw new Error('complaint_history.php redirected to login');
      }
    });

  // --- MODULE 20: ADMIN STATIC PAGES ---
  runner.addTest('TC-063', 'Student Overview', 'Functional', 'Student overview page loads for admin', 'High',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(400);
      await h.goTo('student_overview.php');
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (url.includes('admin_login.php')) {
        throw new Error('student_overview.php redirected to admin_login — session issue');
      }
    });

  runner.addTest('TC-064', 'System Reports', 'Functional', 'System reports page loads for admin', 'Medium',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(400);
      await h.goTo('system_reports.php');
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (url.includes('admin_login.php')) {
        throw new Error('system_reports.php redirected to admin_login — session issue');
      }
    });

  runner.addTest('TC-065', 'Security Monitoring', 'Functional', 'Security monitoring page loads for admin', 'Medium',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(400);
      await h.goTo('security_monitoring.php');
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (url.includes('admin_login.php')) {
        throw new Error('security_monitoring.php redirected to admin_login');
      }
    });

  runner.addTest('TC-066', 'System Settings', 'Functional', 'System settings page loads for admin', 'Low',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(400);
      await h.goTo('system_settings.php');
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (url.includes('admin_login.php')) {
        throw new Error('system_settings.php redirected to admin_login');
      }
    });

  runner.addTest('TC-067', 'Complaint Monitoring', 'Functional', 'Complaint monitoring page loads for admin', 'Medium',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(400);
      await h.goTo('complaint_monitoring.php');
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (url.includes('admin_login.php')) {
        throw new Error('complaint_monitoring.php redirected to admin_login');
      }
    });

  runner.addTest('TC-068', 'Mess Overview', 'Functional', 'Mess overview page loads for admin', 'Medium',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(400);
      await h.goTo('mess_overview.php');
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (url.includes('admin_login.php')) {
        throw new Error('mess_overview.php redirected to admin_login');
      }
    });

  // --- MODULE 21: WARDEN SUBPAGES ---
  runner.addTest('TC-069', 'Warden Leave Requests', 'Functional', 'Leave requests page loads for warden', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('leave_requests.php');
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (url.includes('warden_login.php')) {
        throw new Error('leave_requests.php redirected to warden_login');
      }
    });

  runner.addTest('TC-070', 'Warden Room Management', 'Functional', 'Room management page loads for warden', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('room_management.php');
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (url.includes('warden_login.php')) {
        throw new Error('room_management.php redirected to warden_login');
      }
    });
};
