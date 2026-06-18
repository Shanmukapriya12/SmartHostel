const { By } = require('selenium-webdriver');

module.exports = function(runner) {
  // --- MODULE 1: LANDING PAGE ---
  runner.addTest('TC-001', 'Landing Page', 'Functional', 'Get Started button navigates to role selection', 'High',
    async (driver, h, sFile) => {
      await h.goTo('index.php');
      await h.takeScreenshot(sFile, By.linkText('Get Started'));
      await h.clickEl(By.linkText('Get Started'));
      await h.assertUrlContains('select_role.php');
    });

  // --- MODULE 2: ROLE SELECTION ---
  runner.addTest('TC-002', 'Role Selection', 'Functional', 'Role selection page loads options', 'High',
    async (driver, h, sFile) => {
      await h.goTo('select_role.php');
      await h.takeScreenshot(sFile, By.css('.container'));
      await h.assertPageContains('Student');
      await h.assertPageContains('Admin');
      await h.assertPageContains('Warden');
    });

  runner.addTest('TC-003', 'Role Selection', 'Functional', 'Student option navigates to student login', 'High',
    async (driver, h, sFile) => {
      await h.goTo('select_role.php');
      const studentCard = By.css('a[href="student_login.php"]');
      await h.takeScreenshot(sFile, studentCard);
      await h.clickEl(studentCard);
      await h.assertUrlContains('student_login.php');
    });

  runner.addTest('TC-004', 'Role Selection', 'Functional', 'Admin option navigates to admin login', 'High',
    async (driver, h, sFile) => {
      await h.goTo('select_role.php');
      const adminCard = By.css('a[href="admin_login.php"]');
      await h.clickEl(adminCard);
      await h.assertUrlContains('admin_login.php');
    });

  runner.addTest('TC-005', 'Role Selection', 'Functional', 'Warden option navigates to warden login', 'High',
    async (driver, h, sFile) => {
      await h.goTo('select_role.php');
      const wardenCard = By.css('a[href="warden_login.php"]');
      await h.clickEl(wardenCard);
      await h.assertUrlContains('warden_login.php');
    });

  // --- MODULE 3: STUDENT LOGIN ---
  runner.addTest('TC-006', 'Student Login', 'Functional', 'Student login page loads successfully', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      await h.takeScreenshot(sFile, By.name('phone'));
      await h.assertTitle('Student');
    });

  runner.addTest('TC-007', 'Student Login', 'Functional', 'Register link navigates to registration page', 'Medium',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      await h.takeScreenshot(sFile, By.linkText('Register'));
      await h.clickEl(By.linkText('Register'));
      await h.assertUrlContains('student_register.php');
    });

  runner.addTest('TC-008', 'Student Login', 'Functional', 'Student OTP flow verifies login and enters dashboard', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.takeScreenshot(sFile, By.css('.dashboard-container, .card'));
      await h.assertUrlContains('student_dashboard.php');
    });

  // --- MODULE 4: STUDENT REGISTRATION ---
  runner.addTest('TC-009', 'Student Registration', 'Functional', 'Registration form displays input fields', 'High',
    async (driver, h, sFile) => {
      await h.goTo('student_register.php');
      await h.takeScreenshot(sFile, By.name('name'));
      await h.assertElementExists(By.name('name'));
      await h.assertElementExists(By.name('phone'));
      await h.assertElementExists(By.name('register'));
    });

  // --- MODULE 5: ADMIN LOGIN ---
  runner.addTest('TC-010', 'Admin Login', 'Functional', 'Admin login page loads successfully', 'High',
    async (driver, h, sFile) => {
      await h.goTo('admin_login.php');
      await h.takeScreenshot(sFile, By.css('button[type="submit"]'));
      await h.assertTitle('Admin');
    });

  runner.addTest('TC-011', 'Admin Login', 'Functional', 'Admin login with valid credentials redirects to dashboard', 'High',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await h.takeScreenshot(sFile, By.css('.container'));
      await h.assertUrlContains('admin_dashboard.php');
    });

  // --- MODULE 6: WARDEN LOGIN ---
  runner.addTest('TC-012', 'Warden Login', 'Functional', 'Warden login with credentials redirects to dashboard', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.takeScreenshot(sFile, By.css('.container'));
      await h.assertUrlContains('warden_dashboard.php');
    });

  // --- MODULE 7: ADMIN DASHBOARD ---
  runner.addTest('TC-013', 'Admin Dashboard', 'Functional', 'Student Overview card is clickable and navigates', 'High',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await h.goTo('admin_dashboard.php');
      const card = By.css('a[href="student_overview.php"]');
      await h.takeScreenshot(sFile, card);
      await h.clickEl(card);
      await h.assertUrlContains('student_overview.php');
    });

  runner.addTest('TC-014', 'Admin Dashboard', 'Functional', 'System Reports card navigates to system_reports.php', 'Medium',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await h.goTo('admin_dashboard.php');
      await h.clickEl(By.css('a[href="system_reports.php"]'));
      await h.assertUrlContains('system_reports.php');
    });

  runner.addTest('TC-015', 'Admin Dashboard', 'Functional', 'Mess Overview card navigates to mess_overview.php', 'Medium',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await h.goTo('admin_dashboard.php');
      await h.clickEl(By.css('a[href="mess_overview.php"]'));
      await h.assertUrlContains('mess_overview.php');
    });

  runner.addTest('TC-016', 'Admin Dashboard', 'Functional', 'Security Monitoring card navigates to security_monitoring.php', 'Medium',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await h.goTo('admin_dashboard.php');
      await h.clickEl(By.css('a[href="security_monitoring.php"]'));
      await h.assertUrlContains('security_monitoring.php');
    });

  runner.addTest('TC-017', 'Admin Dashboard', 'Functional', 'System Settings card navigates to system_settings.php', 'Low',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await h.goTo('admin_dashboard.php');
      await h.clickEl(By.css('a[href="system_settings.php"]'));
      await h.assertUrlContains('system_settings.php');
    });

  runner.addTest('TC-018', 'Admin Dashboard', 'Functional', 'Back button returns to index role selection page', 'Low',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await h.goTo('admin_dashboard.php');
      const backBtn = By.linkText('Back');
      await h.takeScreenshot(sFile, backBtn);
      await h.clickEl(backBtn);
      await h.assertUrlContains('index.php');
    });

  // --- MODULE 8: STUDENT DASHBOARD ---
  runner.addTest('TC-019', 'Student Dashboard', 'Functional', 'Unauthenticated access redirects to student login', 'High',
    async (driver, h, sFile) => {
      await driver.manage().deleteAllCookies();
      await h.goTo('student_dashboard.php');
      await h.takeScreenshot(sFile);
      await h.assertUrlContains('student_login.php');
      // Re-login to keep session stable
      await h.performStudentLogin('7671897162');
    });

  runner.addTest('TC-020', 'Student Dashboard', 'Functional', 'My Room link navigation works', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      const card = By.css('a[href="my_room.php"]');
      await h.takeScreenshot(sFile, card);
      await h.clickEl(card);
      await h.assertUrlContains('my_room.php');
    });

  runner.addTest('TC-021', 'Student Dashboard', 'Functional', 'Raise Complaint link navigation works', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      const card = By.css('a[href="raise_complaint.php"]');
      await h.clickEl(card);
      await h.assertUrlContains('raise_complaint.php');
    });

  runner.addTest('TC-022', 'Student Dashboard', 'Functional', 'Attendance link navigation works', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      const card = By.css('a[href="attendance.php"]');
      await h.clickEl(card);
      await h.assertUrlContains('attendance.php');
    });

  runner.addTest('TC-023', 'Student Dashboard', 'Functional', 'Leave Request link navigation works', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      const card = By.css('a[href="leave_request.php"]');
      await h.clickEl(card);
      await h.assertUrlContains('leave_request.php');
    });

  runner.addTest('TC-024', 'Student Dashboard', 'Functional', 'Hostel Fees link navigation works', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      const card = By.css('a[href="fee_details.php"]');
      await h.clickEl(card);
      await h.assertUrlContains('fee_details.php');
    });

  runner.addTest('TC-025', 'Student Dashboard', 'Functional', 'Notifications link navigation works', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      const card = By.css('a[href="notifications.php"]');
      await h.clickEl(card);
      await h.assertUrlContains('notifications.php');
    });

  runner.addTest('TC-026', 'Student Dashboard', 'Functional', 'My Profile link navigation works', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      const card = By.css('a[href="profile.php"]');
      await h.clickEl(card);
      await h.assertUrlContains('profile.php');
    });

  runner.addTest('TC-027', 'Student Dashboard', 'Functional', 'Mess Feedback link navigation works', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      const card = By.css('a[href="mess_feedback.php"]');
      await h.clickEl(card);
      await h.assertUrlContains('mess_feedback.php');
    });

  // --- MODULE 9: RAISE COMPLAINT ---
  runner.addTest('TC-028', 'Raise Complaint', 'Functional', 'Back button returns to student dashboard', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('raise_complaint.php');
      const backBtn = By.css('.back-btn, .btn-secondary');
      await h.takeScreenshot(sFile, backBtn);
      await h.clickEl(backBtn);
      await h.assertUrlContains('student_dashboard.php');
    });

  // --- MODULE 10: LEAVE REQUEST ---
  runner.addTest('TC-029', 'Leave Request', 'Functional', 'Back button returns to student dashboard', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('leave_request.php');
      const backBtn = By.css('.back-btn, .btn-secondary');
      await h.takeScreenshot(sFile, backBtn);
      await h.clickEl(backBtn);
      await h.assertUrlContains('student_dashboard.php');
    });

  // --- MODULE 11: MESS FEEDBACK ---
  runner.addTest('TC-030', 'Mess Feedback', 'Functional', 'Mess Feedback submission form exists and loads properly', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('mess_feedback.php');
      await h.takeScreenshot(sFile, By.name('submit_feedback'));
      await h.assertElementExists(By.name('feedback'));
      await h.assertElementExists(By.name('submit_feedback'));
    });

  // --- MODULE 12: WARDEN DASHBOARD ---
  runner.addTest('TC-031', 'Warden Dashboard', 'Functional', 'Warden dashboard navigation works', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.takeScreenshot(sFile, By.css('.container'));
      await h.assertPageContains('Warden Dashboard');
    });

  runner.addTest('TC-032', 'Warden Dashboard', 'Functional', 'Warden can navigate to leave requests management', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      const link = By.css('a[href="leave_requests.php"]');
      await h.clickEl(link);
      await h.assertUrlContains('leave_requests.php');
    });

  runner.addTest('TC-033', 'Warden Dashboard', 'Functional', 'Warden can navigate to room management', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      const link = By.css('a[href="room_management.php"]');
      await h.clickEl(link);
      await h.assertUrlContains('room_management.php');
    });

  runner.addTest('TC-034', 'Warden Dashboard', 'Functional', 'Warden can navigate to mess management', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      const link = By.css('a[href="mess_management.php"]');
      await h.clickEl(link);
      await h.assertUrlContains('mess_management.php');
    });

  runner.addTest('TC-035', 'Warden Dashboard', 'Functional', 'Warden can navigate to students list', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      const link = By.css('a[href="students.php"]');
      await h.clickEl(link);
      await h.assertUrlContains('students.php');
    });

  runner.addTest('TC-036', 'Warden Dashboard', 'Functional', 'Warden can navigate to reports page', 'Medium',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      const link = By.css('a[href="reports.php"]');
      await h.clickEl(link);
      await h.assertUrlContains('reports.php');
    });

  runner.addTest('TC-037', 'Warden Dashboard', 'Functional', 'Warden can navigate to attendance management', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      const link = By.css('a[href="attendance_management.php"]');
      await h.clickEl(link);
      await h.assertUrlContains('attendance_management.php');
    });

  runner.addTest('TC-038', 'Warden Dashboard', 'Functional', 'Warden can navigate to complaints management', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      const link = By.css('a[href="complaints_management.php"]');
      await h.clickEl(link);
      await h.assertUrlContains('complaints_management.php');
    });

  // --- MODULE 13: LOGOUT ---
  runner.addTest('TC-039', 'Logout', 'Functional', 'Logout clears session and redirects to select role', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('logout.php');
      await h.takeScreenshot(sFile);
      // Confirms redirection
      const url = await driver.getCurrentUrl();
      if (!url.includes('index.php') && !url.includes('select_role.php') && !url.includes('student_login.php')) {
        throw new Error(`Invalid redirection after logout: ${url}`);
      }
    });

  runner.addTest('TC-040', 'Logout', 'Functional', 'Accessing dashboard after logout redirects to login', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('logout.php');
      await h.goTo('student_dashboard.php');
      await h.assertUrlContains('student_login.php');
    });
};
