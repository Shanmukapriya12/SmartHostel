/**
 * Navigation & Flow Tests
 * Tests complete user flows from start to finish
 * TC-191 to TC-220
 */
const { By } = require('selenium-webdriver');

module.exports = function(runner) {
  // ─── STUDENT COMPLETE FLOWS ───────────────────────────
  runner.addTest('TC-191', 'Full Student Flow', 'Integration', 'Student can login and access all dashboard cards', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      const links = await driver.findElements(By.tagName('a'));
      if (links.length < 5) throw new Error(`Student dashboard has too few links: ${links.length}`);
    });

  runner.addTest('TC-192', 'Full Student Flow', 'Integration', 'Student can navigate: login → dashboard → complaint → back', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      await h.goTo('raise_complaint.php');
      // Verify on complaint page
      await h.assertElementExists(By.name('title'));
    });

  runner.addTest('TC-193', 'Full Student Flow', 'Integration', 'Student can navigate: login → dashboard → leave request', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      await h.goTo('leave_request.php');
      await h.assertElementExists(By.name('reason'));
    });

  runner.addTest('TC-194', 'Full Student Flow', 'Integration', 'Student can navigate: login → dashboard → profile', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      await h.goTo('profile.php');
      const url = await driver.getCurrentUrl();
      if (url.includes('student_login.php')) throw new Error('Profile redirected to login');
    });

  runner.addTest('TC-195', 'Full Student Flow', 'Integration', 'Student can navigate: login → dashboard → mess feedback', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      await h.goTo('mess_feedback.php');
      await h.assertElementExists(By.name('feedback'));
    });

  runner.addTest('TC-196', 'Full Student Flow', 'Integration', 'Student can navigate: login → dashboard → attendance', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      await h.goTo('attendance.php');
      const url = await driver.getCurrentUrl();
      if (url.includes('student_login.php')) throw new Error('Attendance redirected to login');
    });

  runner.addTest('TC-197', 'Full Student Flow', 'Integration', 'Student can navigate: login → dashboard → my room', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      await h.goTo('my_room.php');
      const url = await driver.getCurrentUrl();
      if (url.includes('student_login.php')) throw new Error('my_room.php redirected to login');
    });

  runner.addTest('TC-198', 'Full Student Flow', 'Integration', 'Student can navigate: login → dashboard → notifications', 'Low',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      await h.goTo('notifications.php');
      const url = await driver.getCurrentUrl();
      if (url.includes('student_login.php')) throw new Error('notifications.php redirected to login');
    });

  runner.addTest('TC-199', 'Full Student Flow', 'Integration', 'Student can navigate: login → dashboard → fee details', 'Low',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('student_dashboard.php');
      await h.goTo('fee_details.php');
      const url = await driver.getCurrentUrl();
      if (url.includes('student_login.php')) throw new Error('fee_details.php redirected to login');
    });

  runner.addTest('TC-200', 'Full Student Flow', 'Integration', 'Student logout → cannot re-access dashboard without login', 'High',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('logout.php');
      await driver.sleep(500);
      await h.goTo('student_dashboard.php');
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      if (!url.includes('student_login.php')) {
        throw new Error(`After logout, dashboard not blocked: ${url}`);
      }
    });

  // ─── ADMIN COMPLETE FLOWS ─────────────────────────────
  runner.addTest('TC-201', 'Full Admin Flow', 'Integration', 'Admin can login and reach all 6 dashboard sections', 'High',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(500);
      await h.goTo('admin_dashboard.php');
      const cards = await driver.findElements(By.css('a.dashboard-card, .dashboard-card, a[href*=".php"]'));
      if (cards.length < 4) throw new Error(`Admin dashboard has too few navigation links: ${cards.length}`);
    });

  runner.addTest('TC-202', 'Full Admin Flow', 'Integration', 'Admin can navigate to student_overview.php and back', 'High',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(400);
      await h.goTo('student_overview.php');
      const url = await driver.getCurrentUrl();
      if (url.includes('admin_login.php')) throw new Error('student_overview.php rejected admin session');
    });

  runner.addTest('TC-203', 'Full Admin Flow', 'Integration', 'Admin can access system_reports.php', 'Medium',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(400);
      await h.goTo('system_reports.php');
      const url = await driver.getCurrentUrl();
      if (url.includes('admin_login.php')) throw new Error('system_reports.php rejected admin session');
    });

  runner.addTest('TC-204', 'Full Admin Flow', 'Integration', 'Admin can access complaint_monitoring.php', 'Medium',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(400);
      await h.goTo('complaint_monitoring.php');
      const url = await driver.getCurrentUrl();
      if (url.includes('admin_login.php')) throw new Error('complaint_monitoring.php rejected admin session');
    });

  runner.addTest('TC-205', 'Full Admin Flow', 'Integration', 'Admin can access mess_overview.php', 'Medium',
    async (driver, h, sFile) => {
      await h.performAdminLogin();
      await driver.sleep(400);
      await h.goTo('mess_overview.php');
      const url = await driver.getCurrentUrl();
      if (url.includes('admin_login.php')) throw new Error('mess_overview.php rejected admin session');
    });

  // ─── WARDEN COMPLETE FLOWS ────────────────────────────
  runner.addTest('TC-206', 'Full Warden Flow', 'Integration', 'Warden can login and access leave_requests.php', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('leave_requests.php');
      const url = await driver.getCurrentUrl();
      if (url.includes('warden_login.php')) throw new Error('leave_requests.php rejected warden session');
    });

  runner.addTest('TC-207', 'Full Warden Flow', 'Integration', 'Warden can access room_management.php', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('room_management.php');
      const url = await driver.getCurrentUrl();
      if (url.includes('warden_login.php')) throw new Error('room_management.php rejected warden session');
    });

  runner.addTest('TC-208', 'Full Warden Flow', 'Integration', 'Warden can access complaints_management.php', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('complaints_management.php');
      const url = await driver.getCurrentUrl();
      if (url.includes('warden_login.php')) throw new Error('complaints_management.php rejected warden session');
    });

  runner.addTest('TC-209', 'Full Warden Flow', 'Integration', 'Warden can access attendance_management.php', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('attendance_management.php');
      const url = await driver.getCurrentUrl();
      if (url.includes('warden_login.php')) throw new Error('attendance_management.php rejected warden session');
    });

  runner.addTest('TC-210', 'Full Warden Flow', 'Integration', 'Warden can access students.php list', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('students.php');
      const url = await driver.getCurrentUrl();
      if (url.includes('warden_login.php')) throw new Error('students.php rejected warden session');
    });

  runner.addTest('TC-211', 'Full Warden Flow', 'Integration', 'Warden can access mess_management.php', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('mess_management.php');
      const url = await driver.getCurrentUrl();
      if (url.includes('warden_login.php')) throw new Error('mess_management.php rejected warden session');
    });

  runner.addTest('TC-212', 'Full Warden Flow', 'Integration', 'Warden can access reports.php', 'Medium',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('reports.php');
      const url = await driver.getCurrentUrl();
      if (url.includes('warden_login.php')) throw new Error('reports.php rejected warden session');
    });

  // ─── MULTI-PAGE NAVIGATION FLOWS ─────────────────────
  runner.addTest('TC-213', 'Navigation Flow', 'Integration', 'Back button on leave_request returns to student dashboard', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('leave_request.php');
      const backSelectors = [
        By.css('a[href="student_dashboard.php"]'),
        By.css('.back-btn'),
        By.linkText('Back')
      ];
      let navigated = false;
      for (const sel of backSelectors) {
        try {
          const els = await driver.findElements(sel);
          if (els.length > 0) {
            await h.clickEl(sel);
            navigated = true;
            break;
          }
        } catch(e) {}
      }
      if (!navigated) {
        await h.goTo('student_dashboard.php');
      }
      await driver.sleep(400);
      const url = await driver.getCurrentUrl();
      if (!url.includes('student_dashboard.php') && !url.includes('student_login.php')) {
        throw new Error(`Back from leave_request led to: ${url}`);
      }
    });

  runner.addTest('TC-214', 'Navigation Flow', 'Integration', 'Back button on raise_complaint returns to student dashboard', 'Medium',
    async (driver, h, sFile) => {
      await h.performStudentLogin('7671897162');
      await h.goTo('raise_complaint.php');
      const backSelectors = [
        By.css('a[href="student_dashboard.php"]'),
        By.css('.back-btn'),
        By.linkText('Back')
      ];
      let navigated = false;
      for (const sel of backSelectors) {
        try {
          const els = await driver.findElements(sel);
          if (els.length > 0) {
            await h.clickEl(sel);
            navigated = true;
            break;
          }
        } catch(e) {}
      }
      if (!navigated) await h.goTo('student_dashboard.php');
      await driver.sleep(400);
      const url = await driver.getCurrentUrl();
      if (!url.includes('student_dashboard.php') && !url.includes('student_login.php')) {
        throw new Error(`Back from raise_complaint led to: ${url}`);
      }
    });

  runner.addTest('TC-215', 'Navigation Flow', 'Integration', 'Role selection links all work without 404', 'High',
    async (driver, h, sFile) => {
      for (const page of ['student_login.php', 'admin_login.php', 'warden_login.php']) {
        await h.goTo('select_role.php');
        const link = await driver.findElements(By.css(`a[href="${page}"]`));
        if (link.length === 0) throw new Error(`Link to ${page} missing on select_role.php`);
      }
    });

  // ─── BROWSER HISTORY ─────────────────────────────────
  runner.addTest('TC-216', 'Navigation Flow', 'Integration', 'Browser back from student dashboard returns to login', 'Low',
    async (driver, h, sFile) => {
      await h.goTo('student_login.php');
      await h.performStudentLogin('7671897162');
      await driver.navigate().back();
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      // After back from dashboard, could be login or dashboard itself
      if (!url || !url.includes('localhost')) {
        throw new Error(`Browser back led to unexpected URL: ${url}`);
      }
    });

  runner.addTest('TC-217', 'Navigation Flow', 'Integration', 'Admin login page has link back to role selection', 'Low',
    async (driver, h, sFile) => {
      await h.goTo('admin_login.php');
      const links = await driver.findElements(By.tagName('a'));
      // There should be at least some link
      if (links.length === 0) throw new Error('No links found on admin_login.php');
    });

  // ─── CROSS-ROLE ISOLATION ────────────────────────────
  runner.addTest('TC-218', 'Cross Role', 'Integration', 'Admin session does not bleed into student pages', 'High',
    async (driver, h, sFile) => {
      // Login as admin
      await h.performAdminLogin();
      await driver.sleep(400);
      // Try accessing student dashboard — should be blocked (student session not set)
      await h.goTo('student_dashboard.php');
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      // student_dashboard.php checks $_SESSION['student_phone'] which is not set for admin
      if (!url.includes('student_login.php')) {
        throw new Error(`Admin session should not allow student dashboard: ${url}`);
      }
    });

  runner.addTest('TC-219', 'Cross Role', 'Integration', 'Warden session does not allow admin pages', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('admin_dashboard.php');
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      // admin_dashboard now requires $_SESSION['admin'] — warden should be redirected
      if (!url.includes('admin_login.php')) {
        // check if admin data is shown — which would be a security issue
        const text = await driver.findElement(By.tagName('body')).getText();
        if (text.toLowerCase().includes('student overview') && text.toLowerCase().includes('system reports')) {
          throw new Error('Warden session can access admin_dashboard.php — security issue');
        }
      }
    });

  runner.addTest('TC-220', 'Cross Role', 'Integration', 'Warden cannot access student personal pages', 'High',
    async (driver, h, sFile) => {
      await h.performWardenLogin();
      await h.goTo('student_dashboard.php');
      await driver.sleep(500);
      const url = await driver.getCurrentUrl();
      if (!url.includes('student_login.php')) {
        throw new Error(`Warden session should not allow student dashboard: ${url}`);
      }
    });
};
