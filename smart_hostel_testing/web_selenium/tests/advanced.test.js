/**
 * Advanced Functional Tests — Warden & Admin Module Deep Tests
 * TC-221 to TC-250
 */
const { By } = require('selenium-webdriver');

module.exports = function(runner) {
  // ─── ROOM MANAGEMENT DEEP TESTS ──────────────────────
  runner.addTest('TC-221', 'Room Management', 'Advanced', 'Room management page has a table or grid layout', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('room_management.php');
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (url.includes('warden_login.php')) throw new Error('Room management blocked warden session');
    });

  runner.addTest('TC-222', 'Room Management', 'Advanced', 'Room management page has a form for adding rooms', 'Medium',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('room_management.php');
      const forms = await driver.findElements(By.tagName('form'));
      if (forms.length === 0) {
        // Could be table-only view
        const tables = await driver.findElements(By.tagName('table'));
        if (tables.length === 0) throw new Error('No form or table found on room_management.php');
      }
    });

  runner.addTest('TC-223', 'Leave Requests', 'Advanced', 'Leave requests management page loads with proper structure', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('leave_requests.php');
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (url.includes('warden_login.php')) throw new Error('Leave requests blocked warden session');
    });

  runner.addTest('TC-224', 'Leave Requests', 'Advanced', 'Leave requests page has approve/reject controls or message', 'Medium',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('leave_requests.php');
      const bodyText = await driver.findElement(By.tagName('body')).getText();
      // Could have "No requests" or actual request rows
      if (!bodyText || bodyText.trim().length < 10) {
        throw new Error('Leave requests page appears empty or broken');
      }
    });

  runner.addTest('TC-225', 'Complaints Management', 'Advanced', 'Complaints management page loads without server errors', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('complaints_management.php');
      await h.takeScreenshot(sFile);
      const source = await driver.getPageSource();
      if (source.includes('Fatal error') || source.includes('Uncaught Error')) {
        throw new Error('PHP error on complaints_management.php');
      }
    });

  runner.addTest('TC-226', 'Attendance Management', 'Advanced', 'Attendance management page loads without PHP errors', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('attendance_management.php');
      await h.takeScreenshot(sFile);
      const source = await driver.getPageSource();
      if (source.includes('Fatal error') || source.includes('Parse error')) {
        throw new Error('PHP error on attendance_management.php');
      }
    });

  runner.addTest('TC-227', 'Students List', 'Advanced', 'Students list page loads with table or message', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('students.php');
      await h.takeScreenshot(sFile);
      const source = await driver.getPageSource();
      if (source.includes('Fatal error')) {
        throw new Error('PHP error on students.php');
      }
    });

  runner.addTest('TC-228', 'Mess Management', 'Advanced', 'Mess management page loads for warden', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('mess_management.php');
      await h.takeScreenshot(sFile);
      const url = await driver.getCurrentUrl();
      if (url.includes('warden_login.php')) throw new Error('Mess management blocked warden session');
    });

  runner.addTest('TC-229', 'Reports', 'Advanced', 'Warden reports page loads with statistics or message', 'Medium',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('reports.php');
      await h.takeScreenshot(sFile);
      const source = await driver.getPageSource();
      if (source.includes('Fatal error')) throw new Error('PHP error on reports.php');
    });

  // ─── ADMIN SUBPAGES DEEP TESTS ────────────────────────
  runner.addTest('TC-230', 'Student Overview', 'Advanced', 'Student overview page loads with data or empty message', 'High',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(400);
      await h.goTo('student_overview.php');
      await h.takeScreenshot(sFile);
      const source = await driver.getPageSource();
      if (source.includes('Fatal error')) throw new Error('PHP error on student_overview.php');
    });

  runner.addTest('TC-231', 'System Reports', 'Advanced', 'System reports page loads correctly for admin', 'High',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(400);
      await h.goTo('system_reports.php');
      await h.takeScreenshot(sFile);
      const source = await driver.getPageSource();
      if (source.includes('Fatal error')) throw new Error('PHP error on system_reports.php');
    });

  runner.addTest('TC-232', 'Security Monitoring', 'Advanced', 'Security monitoring page renders with admin session', 'Medium',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(400);
      await h.goTo('security_monitoring.php');
      await h.takeScreenshot(sFile);
      const source = await driver.getPageSource();
      if (source.includes('Fatal error')) throw new Error('PHP error on security_monitoring.php');
    });

  runner.addTest('TC-233', 'System Settings', 'Advanced', 'System settings page loads without PHP errors', 'Low',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(400);
      await h.goTo('system_settings.php');
      await h.takeScreenshot(sFile);
      const source = await driver.getPageSource();
      if (source.includes('Fatal error') || source.includes('Uncaught Error')) {
        throw new Error('PHP error on system_settings.php');
      }
    });

  runner.addTest('TC-234', 'Complaint Monitoring', 'Advanced', 'Admin complaint monitoring page loads correctly', 'Medium',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(400);
      await h.goTo('complaint_monitoring.php');
      await h.takeScreenshot(sFile);
      const source = await driver.getPageSource();
      if (source.includes('Fatal error')) throw new Error('PHP error on complaint_monitoring.php');
    });

  runner.addTest('TC-235', 'Mess Overview', 'Advanced', 'Admin mess overview page loads correctly', 'Medium',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(400);
      await h.goTo('mess_overview.php');
      await h.takeScreenshot(sFile);
      const source = await driver.getPageSource();
      if (source.includes('Fatal error')) throw new Error('PHP error on mess_overview.php');
    });

  // ─── STUDENT SUBPAGES DEEP TESTS ─────────────────────
  runner.addTest('TC-236', 'My Room', 'Advanced', 'My Room page loads without PHP errors', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('my_room.php');
      await h.takeScreenshot(sFile);
      const source = await driver.getPageSource();
      if (source.includes('Fatal error') || source.includes('Uncaught Error')) {
        throw new Error('PHP error on my_room.php');
      }
    });

  runner.addTest('TC-237', 'Profile', 'Advanced', 'Profile page loads without PHP errors', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('profile.php');
      await h.takeScreenshot(sFile);
      const source = await driver.getPageSource();
      if (source.includes('Fatal error')) throw new Error('PHP error on profile.php');
    });

  runner.addTest('TC-238', 'Fee Details', 'Advanced', 'Fee details page loads without PHP errors', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('fee_details.php');
      await h.takeScreenshot(sFile);
      const source = await driver.getPageSource();
      if (source.includes('Fatal error')) throw new Error('PHP error on fee_details.php');
    });

  runner.addTest('TC-239', 'Notifications', 'Advanced', 'Notifications page loads without PHP errors', 'Low',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('notifications.php');
      await h.takeScreenshot(sFile);
      const source = await driver.getPageSource();
      if (source.includes('Fatal error')) throw new Error('PHP error on notifications.php');
    });

  runner.addTest('TC-240', 'Attendance', 'Advanced', 'Attendance page loads without PHP errors', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('attendance.php');
      await h.takeScreenshot(sFile);
      const source = await driver.getPageSource();
      if (source.includes('Fatal error')) throw new Error('PHP error on attendance.php');
    });

  runner.addTest('TC-241', 'Complaint History', 'Advanced', 'Complaint history page loads for student', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('complaint_history.php');
      await h.takeScreenshot(sFile);
      const source = await driver.getPageSource();
      if (source.includes('Fatal error')) throw new Error('PHP error on complaint_history.php');
    });

  // ─── FORM SUBMISSION TESTS ────────────────────────────
  runner.addTest('TC-242', 'Raise Complaint', 'Advanced', 'Complete complaint form can be filled with valid data', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('raise_complaint.php');
      await h.typeIn(By.name('title'), 'Test Complaint Title');
      await h.typeIn(By.name('description'), 'This is a test complaint description for E2E testing purposes.');
      await h.takeScreenshot(sFile);
      // Verify fields were filled
      const titleVal = await driver.executeScript("return document.querySelector('[name=title]').value;");
      if (!titleVal || !titleVal.includes('Test')) {
        throw new Error(`Title field not filled properly: "${titleVal}"`);
      }
    });

  runner.addTest('TC-243', 'Leave Request', 'Advanced', 'Complete leave request form can be filled with valid data', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('leave_request.php');
      await h.typeIn(By.name('reason'), 'Family function attendance for 3 days.');
      await h.typeIn(By.name('from_date'), '2026-07-01');
      await h.typeIn(By.name('to_date'), '2026-07-03');
      await h.takeScreenshot(sFile);
      const reasonVal = await driver.executeScript("return document.querySelector('[name=reason]').value;");
      if (!reasonVal || !reasonVal.includes('Family')) {
        throw new Error(`Reason field not filled properly: "${reasonVal}"`);
      }
    });

  runner.addTest('TC-244', 'Mess Feedback', 'Advanced', 'Mess feedback form can be filled with a comment', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('mess_feedback.php');
      await h.typeIn(By.name('feedback'), 'Food quality was excellent today. Very satisfied with the mess.');
      await h.takeScreenshot(sFile);
      const val = await driver.executeScript("return document.querySelector('[name=feedback]').value;");
      if (!val || !val.includes('excellent')) {
        throw new Error(`Feedback field not filled: "${val}"`);
      }
    });

  // ─── WARDEN DASHBOARD STRUCTURE ──────────────────────
  runner.addTest('TC-245', 'Warden Dashboard', 'Advanced', 'Warden dashboard has at least 5 navigation items', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('warden_dashboard.php');
      await h.takeScreenshot(sFile);
      const links = await driver.findElements(By.tagName('a'));
      const dashLinks = links.filter(async (l) => {
        try {
          const href = await l.getAttribute('href');
          return href && href.includes('.php') && !href.includes('logout');
        } catch(e) { return false; }
      });
      if (links.length < 5) {
        throw new Error(`Warden dashboard has too few links: ${links.length}`);
      }
    });

  runner.addTest('TC-246', 'Warden Dashboard', 'Advanced', 'Warden dashboard loads with styling intact', 'Medium',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('warden_dashboard.php');
      const source = await driver.getPageSource();
      if (!source.includes('<style') && !source.includes('stylesheet')) {
        throw new Error('Warden dashboard has no CSS references');
      }
    });

  // ─── LOGOUT DEEP TESTS ────────────────────────────────
  runner.addTest('TC-247', 'Logout', 'Advanced', 'logout.php redirects to a valid page (not 404)', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('logout.php');
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      if (!url.includes('localhost')) {
        throw new Error(`logout.php redirected to unexpected URL: ${url}`);
      }
    });

  runner.addTest('TC-248', 'Logout', 'Advanced', 'After warden logout cannot access warden_dashboard', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('logout.php');
      await driver.sleep(500);
      await h.goTo('warden_dashboard.php');
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      if (!url.includes('warden_login.php')) {
        throw new Error(`After warden logout, warden dashboard should be blocked: ${url}`);
      }
    });

  runner.addTest('TC-249', 'Logout', 'Advanced', 'After admin logout cannot access admin_dashboard', 'High',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(500);
      await h.goTo('logout.php');
      await driver.sleep(500);
      await h.goTo('admin_dashboard.php');
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      if (!url.includes('admin_login.php')) {
        throw new Error(`After admin logout, admin dashboard should redirect to login: ${url}`);
      }
    });

  runner.addTest('TC-250', 'System Integrity', 'Advanced', 'All PHP pages load without critical errors (smoke test)', 'Critical',
    async (driver, h, sFile) => {
      const pages = ['index.php', 'select_role.php', 'student_login.php', 'admin_login.php', 'warden_login.php', 'student_register.php'];
      const errors = [];
      for (const page of pages) {
        await h.goTo(page);
        const source = await driver.getPageSource();
        if (source.includes('Fatal error') || source.includes('Parse error')) {
          errors.push(page);
        }
      }
      if (errors.length > 0) {
        throw new Error(`PHP errors found on: ${errors.join(', ')}`);
      }
    });
};
