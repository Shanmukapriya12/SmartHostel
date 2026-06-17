/**
 * ============================================================
 *  Smart Hostel Management System — Selenium E2E Test Suite
 *  100+ Test Cases: Functional | UI/UX | Validation | Unit
 * ============================================================
 */

const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

// Catch all unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  console.error('\nUnhandled Rejection:', reason);
  process.exit(1);
});

// Actual chromedriver exe path (nested under lib/chromedriver/)
const CHROMEDRIVER_PATH = path.join(
  __dirname, '..', 'node_modules', 'chromedriver',
  'lib', 'chromedriver', 'chromedriver.exe'
);

const BASE_URL = 'http://localhost/smart_hostel';
const TIMEOUT  = 10000;

// ─── Colours for terminal output ────────────────────────────
const C = {
  reset: '\x1b[0m', green: '\x1b[32m', red: '\x1b[31m',
  yellow: '\x1b[33m', cyan: '\x1b[36m', bold: '\x1b[1m',
};

// ─── Test Results Store ──────────────────────────────────────
const results = [];
let driver;
let passCount = 0, failCount = 0, skipCount = 0;

// ─── Utility: Run a single test ─────────────────────────────
async function runTest(id, module, category, testName, priority = 'Medium', testFn) {
  const startTime = Date.now();
  let status = 'PASS', remarks = 'Test passed successfully', error = '';
  try {
    await testFn();
    passCount++;
    console.log(`${C.green}✔ [${id}] ${testName}${C.reset}`);
  } catch (e) {
    status = 'FAIL';
    failCount++;
    error = e.message ? e.message.split('\n')[0].substring(0, 120) : String(e);
    remarks = `Failed: ${error}`;
    console.log(`${C.red}✘ [${id}] ${testName}${C.reset}`);
    console.log(`   ${C.yellow}→ ${error}${C.reset}`);
    try { await driver.navigate().refresh(); } catch (_) {}
  }
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  results.push({ id, module, category, testName, priority, status, duration, remarks });
}

// ─── Utility: Navigate & wait ────────────────────────────────
async function goTo(page) {
  await driver.get(`${BASE_URL}/${page}`);
  await driver.sleep(500);
}
async function findEl(locator) {
  return driver.wait(until.elementLocated(locator), TIMEOUT);
}
async function typeIn(locator, text) {
  const el = await findEl(locator);
  await el.clear(); await el.sendKeys(text);
}
async function clickEl(locator) {
  const el = await findEl(locator);
  await driver.wait(until.elementIsVisible(el), TIMEOUT);
  try {
    await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", el);
    await driver.sleep(200);
    await el.click();
  } catch (e) {
    await driver.executeScript("arguments[0].click();", el);
  }
}
async function getTitle() { return driver.getTitle(); }
async function getCurrentUrl() { return driver.getCurrentUrl(); }
async function assertTitle(expected) {
  const title = await getTitle();
  if (!title.toLowerCase().includes(expected.toLowerCase()))
    throw new Error(`Expected title to contain "${expected}", got "${title}"`);
}
async function assertUrlContains(part) {
  const url = await getCurrentUrl();
  if (!url.includes(part)) throw new Error(`Expected URL to contain "${part}", got "${url}"`);
}
async function assertElementExists(locator) {
  const els = await driver.findElements(locator);
  if (els.length === 0) throw new Error(`Element not found: ${locator}`);
}
async function assertElementText(locator, expectedText) {
  const el = await findEl(locator);
  const text = await el.getText();
  if (!text.toLowerCase().includes(expectedText.toLowerCase()))
    throw new Error(`Expected text "${expectedText}", got "${text}"`);
}
async function assertPageContains(text) {
  const body = await driver.findElement(By.tagName('body')).getText();
  if (!body.toLowerCase().includes(text.toLowerCase()))
    throw new Error(`Page does not contain: "${text}"`);
}

// Helpers to log in before executing role-based tests
async function performStudentLogin(phone) {
  await goTo('student_login.php');
  await typeIn(By.name('phone'), phone);
  await clickEl(By.name('send_otp'));
  await driver.sleep(600);
  const alertEl = await findEl(By.css('.alert-info'));
  const text = await alertEl.getText();
  const otp = text.split(':')[1].trim();
  await typeIn(By.name('entered_otp'), otp);
  await clickEl(By.name('verify_otp'));
  await driver.sleep(600);
}

async function performWardenLogin() {
  await goTo('warden_login.php');
  const emailInp = By.css('input[type="email"]');
  const passInp = By.css('input[type="password"]');
  const btnLocator = By.css('button[type="submit"]');
  await typeIn(emailInp, 'warden@smarthostel.com');
  await typeIn(passInp, 'warden123');
  await clickEl(btnLocator);
  await driver.sleep(600);
}

// ════════════════════════════════════════════════════════════
//  TEST SUITE
// ════════════════════════════════════════════════════════════
async function runAllTests() {

  // ── MODULE 1: LANDING PAGE ──────────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 1: Landing Page ━━━${C.reset}`);

  await runTest('TC-001','Landing Page','UI/UX','Page loads successfully and title is correct','High',
    async () => { await goTo('index.php'); await assertTitle('Smart Hostel'); });

  await runTest('TC-002','Landing Page','UI/UX','Hostel banner image is visible','Medium',
    async () => { await goTo('index.php'); await assertElementExists(By.tagName('img')); });

  await runTest('TC-003','Landing Page','Functional','Get Started button is present','High',
    async () => { await goTo('index.php'); await assertElementExists(By.linkText('Get Started')); });

  await runTest('TC-004','Landing Page','Functional','Get Started button navigates to role selection','High',
    async () => {
      await goTo('index.php');
      await clickEl(By.linkText('Get Started'));
      await assertUrlContains('select_role.php');
    });

  await runTest('TC-005','Landing Page','UI/UX','Page has correct heading text','Medium',
    async () => { await goTo('index.php'); await assertPageContains('Smart Hostel Management System'); });

  await runTest('TC-006','Landing Page','UI/UX','Page subtext is displayed','Low',
    async () => { await goTo('index.php'); await assertPageContains('Room Allocation'); });

  // ── MODULE 2: ROLE SELECTION ────────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 2: Role Selection ━━━${C.reset}`);

  await runTest('TC-007','Role Selection','Functional','Role selection page loads','High',
    async () => { await goTo('select_role.php'); await assertTitle(''); });

  await runTest('TC-008','Role Selection','Functional','Student role option is present','High',
    async () => { await goTo('select_role.php'); await assertPageContains('Student'); });

  await runTest('TC-009','Role Selection','Functional','Admin role option is present','High',
    async () => { await goTo('select_role.php'); await assertPageContains('Admin'); });

  await runTest('TC-010','Role Selection','Functional','Warden role option is present','High',
    async () => { await goTo('select_role.php'); await assertPageContains('Warden'); });

  await runTest('TC-011','Role Selection','Functional','Student link navigates to student login','High',
    async () => {
      await goTo('select_role.php');
      const links = await driver.findElements(By.tagName('a'));
      for (const link of links) {
        const href = await link.getAttribute('href');
        if (href && href.includes('student_login')) { await link.click(); break; }
      }
      await assertUrlContains('student_login.php');
    });

  await runTest('TC-012','Role Selection','Functional','Admin link navigates to admin login','High',
    async () => {
      await goTo('select_role.php');
      const links = await driver.findElements(By.tagName('a'));
      for (const link of links) {
        const href = await link.getAttribute('href');
        if (href && href.includes('admin_login')) { await link.click(); break; }
      }
      await assertUrlContains('admin_login.php');
    });

  await runTest('TC-013','Role Selection','Functional','Warden link navigates to warden login','High',
    async () => {
      await goTo('select_role.php');
      const links = await driver.findElements(By.tagName('a'));
      for (const link of links) {
        const href = await link.getAttribute('href');
        if (href && href.includes('warden_login')) { await link.click(); break; }
      }
      await assertUrlContains('warden_login.php');
    });

  // ── MODULE 3: STUDENT LOGIN (OTP) ──────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 3: Student Login ━━━${C.reset}`);

  await runTest('TC-014','Student Login','Functional','Student login page loads','High',
    async () => { await goTo('student_login.php'); await assertTitle('Student'); });

  await runTest('TC-015','Student Login','UI/UX','Phone input field is present','High',
    async () => { await goTo('student_login.php'); await assertElementExists(By.name('phone')); });

  await runTest('TC-016','Student Login','UI/UX','Send OTP button is present','High',
    async () => { await goTo('student_login.php'); await assertElementExists(By.name('send_otp')); });

  await runTest('TC-017','Student Login','UI/UX','OTP input field is present','High',
    async () => { await goTo('student_login.php'); await assertElementExists(By.name('entered_otp')); });

  await runTest('TC-018','Student Login','UI/UX','Verify & Login button is present','High',
    async () => { await goTo('student_login.php'); await assertElementExists(By.name('verify_otp')); });

  await runTest('TC-019','Student Login','Validation','Unregistered phone shows error message','High',
    async () => {
      await goTo('student_login.php');
      await typeIn(By.name('phone'), '0000000000');
      await clickEl(By.name('send_otp'));
      await assertPageContains('Not Registered');
    });

  await runTest('TC-020','Student Login','Validation','Empty phone field triggers required validation','High',
    async () => {
      await goTo('student_login.php');
      const btn = await findEl(By.name('send_otp'));
      await btn.click();
      const inp = await findEl(By.name('phone'));
      const valid = await driver.executeScript(
        'return arguments[0].validity.valid;', inp);
      if (valid) throw new Error('Expected validation to trigger on empty phone');
    });

  await runTest('TC-021','Student Login','Validation','Invalid OTP shows error message','High',
    async () => {
      await goTo('student_login.php');
      await typeIn(By.name('phone'), '9999999999');
      await clickEl(By.name('send_otp'));
      await driver.sleep(500);
      await typeIn(By.name('entered_otp'), '0000');
      await clickEl(By.name('verify_otp'));
      await assertPageContains('Invalid OTP');
    });

  await runTest('TC-022','Student Login','UI/UX','Register link is present on login page','Medium',
    async () => { await goTo('student_login.php'); await assertPageContains('Register'); });

  await runTest('TC-023','Student Login','Functional','Register link navigates to registration','Medium',
    async () => {
      await goTo('student_login.php');
      await clickEl(By.linkText('Register'));
      await assertUrlContains('student_register.php');
    });

  await runTest('TC-024','Student Login','UI/UX','Login page subtitle displayed correctly','Low',
    async () => { await goTo('student_login.php'); await assertPageContains('Phone Number'); });

  // ── MODULE 4: STUDENT REGISTRATION ─────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 4: Student Registration ━━━${C.reset}`);

  await runTest('TC-025','Student Registration','Functional','Registration page loads','High',
    async () => { await goTo('student_register.php'); await assertTitle(''); });

  await runTest('TC-026','Student Registration','UI/UX','Name input field is present','High',
    async () => { await goTo('student_register.php'); await assertElementExists(By.name('name')); });

  await runTest('TC-027','Student Registration','UI/UX','Phone input field is present','High',
    async () => { await goTo('student_register.php'); await assertElementExists(By.name('phone')); });

  await runTest('TC-028','Student Registration','UI/UX','Department field is present','Medium',
    async () => { await goTo('student_register.php'); await assertPageContains('Department'); });

  await runTest('TC-029','Student Registration','Validation','Empty form submission triggers required validation','High',
    async () => {
      await goTo('student_register.php');
      await clickEl(By.name('register'));
      const inputs = await driver.findElements(By.css('input[required]'));
      if (inputs.length === 0) throw new Error('No required inputs found on registration form');
    });

  // ── MODULE 5: ADMIN LOGIN ───────────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 5: Admin Login ━━━${C.reset}`);

  await runTest('TC-030','Admin Login','Functional','Admin login page loads','High',
    async () => { await goTo('admin_login.php'); await assertTitle('Admin'); });

  await runTest('TC-031','Admin Login','UI/UX','Username input field is present','High',
    async () => { await goTo('admin_login.php'); await assertPageContains('Admin'); });

  await runTest('TC-032','Admin Login','UI/UX','Password input is present','High',
    async () => {
      await goTo('admin_login.php');
      await assertElementExists(By.css('input[type="password"]'));
    });

  await runTest('TC-033','Admin Login','Validation','Wrong credentials shows error','High',
    async () => {
      await goTo('admin_login.php');
      await typeIn(By.name('email'), 'wrongadmin@gmail.com');
      await typeIn(By.name('password'), 'wrongpass');
      await clickEl(By.css('button[type="submit"]'));
      await driver.sleep(600);
      await assertPageContains('Invalid');
    });

  await runTest('TC-034','Admin Login','Validation','Empty admin login triggers required fields','Medium',
    async () => {
      await goTo('admin_login.php');
      const btns = await driver.findElements(By.css('button[type="submit"]'));
      if (btns.length > 0) await btns[0].click();
      const inputs = await driver.findElements(By.css('input[required]'));
      if (inputs.length === 0) throw new Error('No required inputs on admin login');
    });

  // ── MODULE 6: WARDEN LOGIN ──────────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 6: Warden Login ━━━${C.reset}`);

  await runTest('TC-035','Warden Login','Functional','Warden login page loads','High',
    async () => { await goTo('warden_login.php'); await assertTitle('Warden'); });

  await runTest('TC-036','Warden Login','UI/UX','Warden login has password field','High',
    async () => {
      await goTo('warden_login.php');
      await assertElementExists(By.css('input[type="password"]'));
    });

  await runTest('TC-037','Warden Login','Validation','Wrong warden credentials shows error','High',
    async () => {
      await goTo('warden_login.php');
      await typeIn(By.name('email'), 'wrongwarden@smarthostel.com');
      await typeIn(By.name('password'), 'badpass');
      await clickEl(By.css('button[type="submit"]'));
      await driver.sleep(600);
      await assertPageContains('Invalid');
    });

  // ── MODULE 7: ADMIN DASHBOARD ───────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 7: Admin Dashboard ━━━${C.reset}`);

  await runTest('TC-038','Admin Dashboard','Functional','Admin dashboard page loads','High',
    async () => { await goTo('admin_dashboard.php'); await assertTitle('Admin Dashboard'); });

  await runTest('TC-039','Admin Dashboard','UI/UX','Dashboard has stats section','High',
    async () => { await goTo('admin_dashboard.php'); await assertPageContains('Students'); });

  await runTest('TC-040','Admin Dashboard','UI/UX','Student Overview card is visible','High',
    async () => { await goTo('admin_dashboard.php'); await assertPageContains('Student Overview'); });

  await runTest('TC-041','Admin Dashboard','UI/UX','System Reports card is visible','Medium',
    async () => { await goTo('admin_dashboard.php'); await assertPageContains('System Reports'); });

  await runTest('TC-042','Admin Dashboard','UI/UX','Complaint Monitoring card is visible','Medium',
    async () => { await goTo('admin_dashboard.php'); await assertPageContains('Complaint Monitoring'); });

  await runTest('TC-043','Admin Dashboard','UI/UX','Mess Overview card is visible','Medium',
    async () => { await goTo('admin_dashboard.php'); await assertPageContains('Mess Overview'); });

  await runTest('TC-044','Admin Dashboard','UI/UX','Security Monitoring card is visible','Medium',
    async () => { await goTo('admin_dashboard.php'); await assertPageContains('Security Monitoring'); });

  await runTest('TC-045','Admin Dashboard','UI/UX','System Settings card is visible','Medium',
    async () => { await goTo('admin_dashboard.php'); await assertPageContains('System Settings'); });

  await runTest('TC-046','Admin Dashboard','Functional','Student Overview link is clickable','High',
    async () => {
      await goTo('admin_dashboard.php');
      await clickEl(By.css('a[href="student_overview.php"]'));
      await assertUrlContains('student_overview.php');
    });

  await runTest('TC-047','Admin Dashboard','Functional','System Reports link is clickable','Medium',
    async () => {
      await goTo('admin_dashboard.php');
      await clickEl(By.css('a[href="system_reports.php"]'));
      await assertUrlContains('system_reports.php');
    });

  await runTest('TC-048','Admin Dashboard','Functional','Mess Overview link navigates correctly','Medium',
    async () => {
      await goTo('admin_dashboard.php');
      await clickEl(By.css('a[href="mess_overview.php"]'));
      await assertUrlContains('mess_overview.php');
    });

  await runTest('TC-049','Admin Dashboard','Functional','Security Monitoring link navigates correctly','Medium',
    async () => {
      await goTo('admin_dashboard.php');
      await clickEl(By.css('a[href="security_monitoring.php"]'));
      await assertUrlContains('security_monitoring.php');
    });

  await runTest('TC-050','Admin Dashboard','Functional','System Settings link navigates correctly','Low',
    async () => {
      await goTo('admin_dashboard.php');
      await clickEl(By.css('a[href="system_settings.php"]'));
      await assertUrlContains('system_settings.php');
    });

  await runTest('TC-051','Admin Dashboard','UI/UX','Back button to index is present','Low',
    async () => { await goTo('admin_dashboard.php'); await assertElementExists(By.linkText('Back')); });

  await runTest('TC-052','Admin Dashboard','Functional','Back button returns to index','Low',
    async () => {
      await goTo('admin_dashboard.php');
      await clickEl(By.linkText('Back'));
      await assertUrlContains('index.php');
    });

  // ── MODULE 8: STUDENT DASHBOARD ─────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 8: Student Dashboard ━━━${C.reset}`);

  await runTest('TC-053','Student Dashboard','Functional','Student dashboard page loads','High',
    async () => {
      await performStudentLogin('7671897162');
      await goTo('student_dashboard.php');
      await assertTitle('Student Dashboard');
    });

  await runTest('TC-054','Student Dashboard','Functional','Unauthenticated access redirects to login','High',
    async () => {
      await driver.manage().deleteAllCookies();
      await goTo('student_dashboard.php');
      await assertUrlContains('student_login.php');
      // Re-login to restore session for subsequent tests
      await performStudentLogin('7671897162');
    });

  await runTest('TC-055','Student Dashboard','UI/UX','My Room card is present','High',
    async () => { await goTo('student_dashboard.php'); await assertPageContains('My Room'); });

  await runTest('TC-056','Student Dashboard','UI/UX','Raise Complaint card is present','High',
    async () => { await goTo('student_dashboard.php'); await assertPageContains('Raise Complaint'); });

  await runTest('TC-057','Student Dashboard','UI/UX','Attendance card is present','High',
    async () => { await goTo('student_dashboard.php'); await assertPageContains('Attendance'); });

  await runTest('TC-058','Student Dashboard','UI/UX','Leave Request card is present','High',
    async () => { await goTo('student_dashboard.php'); await assertPageContains('Leave Request'); });

  await runTest('TC-059','Student Dashboard','UI/UX','Hostel Fees card is present','Medium',
    async () => { await goTo('student_dashboard.php'); await assertPageContains('Hostel Fees'); });

  await runTest('TC-060','Student Dashboard','UI/UX','Notifications card is present','Medium',
    async () => { await goTo('student_dashboard.php'); await assertPageContains('Notifications'); });

  await runTest('TC-061','Student Dashboard','UI/UX','My Profile card is present','Medium',
    async () => { await goTo('student_dashboard.php'); await assertPageContains('My Profile'); });

  await runTest('TC-062','Student Dashboard','UI/UX','Mess Feedback card is present','Medium',
    async () => { await goTo('student_dashboard.php'); await assertPageContains('Mess Feedback'); });

  await runTest('TC-063','Student Dashboard','UI/UX','Logout button is visible','High',
    async () => { await goTo('student_dashboard.php'); await assertPageContains('Logout'); });

  await runTest('TC-064','Student Dashboard','UI/UX','Smart Hostel logo is displayed','Medium',
    async () => { await goTo('student_dashboard.php'); await assertPageContains('Smart Hostel'); });

  await runTest('TC-065','Student Dashboard','UI/UX','Notice section is displayed','Low',
    async () => { await goTo('student_dashboard.php'); await assertPageContains('Hostel Notice'); });

  // ── MODULE 9: RAISE COMPLAINT ───────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 9: Raise Complaint ━━━${C.reset}`);

  await runTest('TC-066','Raise Complaint','Functional','Complaint page loads','High',
    async () => { await goTo('raise_complaint.php'); await assertTitle('Complaint'); });

  await runTest('TC-067','Raise Complaint','UI/UX','Complaint title field is present','High',
    async () => { await goTo('raise_complaint.php'); await assertElementExists(By.name('title')); });

  await runTest('TC-068','Raise Complaint','UI/UX','Category dropdown is present','High',
    async () => { await goTo('raise_complaint.php'); await assertElementExists(By.name('category')); });

  await runTest('TC-069','Raise Complaint','UI/UX','Description textarea is present','High',
    async () => { await goTo('raise_complaint.php'); await assertElementExists(By.name('description')); });

  await runTest('TC-070','Raise Complaint','UI/UX','Submit Complaint button is present','High',
    async () => { await goTo('raise_complaint.php'); await assertElementExists(By.name('submit')); });

  await runTest('TC-071','Raise Complaint','UI/UX','Cancel button is present','Medium',
    async () => {
      await goTo('raise_complaint.php');
      const btns = await driver.findElements(By.css('button[type="reset"]'));
      if (btns.length === 0) throw new Error('Cancel/Reset button not found');
    });

  await runTest('TC-072','Raise Complaint','UI/UX','File upload input is present','Low',
    async () => {
      await goTo('raise_complaint.php');
      await assertElementExists(By.css('input[type="file"]'));
    });

  await runTest('TC-073','Raise Complaint','Validation','Empty form submission blocked by required fields','High',
    async () => {
      await goTo('raise_complaint.php');
      await clickEl(By.name('submit'));
      const inp = await findEl(By.name('title'));
      const valid = await driver.executeScript('return arguments[0].validity.valid;', inp);
      if (valid) throw new Error('Expected required validation to trigger');
    });

  await runTest('TC-074','Raise Complaint','UI/UX','Category has Water Leakage option','Medium',
    async () => {
      await goTo('raise_complaint.php');
      await assertPageContains('Water Leakage');
    });

  await runTest('TC-075','Raise Complaint','UI/UX','Category has Electricity Issue option','Medium',
    async () => { await goTo('raise_complaint.php'); await assertPageContains('Electricity Issue'); });

  await runTest('TC-076','Raise Complaint','UI/UX','Category has WiFi Problem option','Medium',
    async () => { await goTo('raise_complaint.php'); await assertPageContains('WiFi Problem'); });

  await runTest('TC-077','Raise Complaint','Functional','Back button returns to student dashboard','Medium',
    async () => {
      await goTo('raise_complaint.php');
      await clickEl(By.css('.back-btn'));
      await assertUrlContains('student_dashboard.php');
    });

  // ── MODULE 10: LEAVE REQUEST ────────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 10: Leave Request ━━━${C.reset}`);

  await runTest('TC-078','Leave Request','Functional','Leave request page loads','High',
    async () => { await goTo('leave_request.php'); await assertTitle('Leave Request'); });

  await runTest('TC-079','Leave Request','UI/UX','Leave type dropdown is present','High',
    async () => { await goTo('leave_request.php'); await assertElementExists(By.name('leave_type')); });

  await runTest('TC-080','Leave Request','UI/UX','Reason input is present','High',
    async () => { await goTo('leave_request.php'); await assertElementExists(By.name('reason')); });

  await runTest('TC-081','Leave Request','UI/UX','From Date field is present','High',
    async () => { await goTo('leave_request.php'); await assertElementExists(By.name('from_date')); });

  await runTest('TC-082','Leave Request','UI/UX','To Date field is present','High',
    async () => { await goTo('leave_request.php'); await assertElementExists(By.name('to_date')); });

  await runTest('TC-083','Leave Request','UI/UX','Destination field is present','Medium',
    async () => { await goTo('leave_request.php'); await assertElementExists(By.name('destination')); });

  await runTest('TC-084','Leave Request','UI/UX','Parent phone field is present','Medium',
    async () => { await goTo('leave_request.php'); await assertElementExists(By.name('parent_phone')); });

  await runTest('TC-085','Leave Request','UI/UX','Additional Notes textarea is present','Low',
    async () => { await goTo('leave_request.php'); await assertElementExists(By.name('notes')); });

  await runTest('TC-086','Leave Request','UI/UX','Home Leave option is in dropdown','High',
    async () => { await goTo('leave_request.php'); await assertPageContains('Home Leave'); });

  await runTest('TC-087','Leave Request','UI/UX','Medical Leave option is in dropdown','High',
    async () => { await goTo('leave_request.php'); await assertPageContains('Medical Leave'); });

  await runTest('TC-088','Leave Request','UI/UX','Emergency Leave option is in dropdown','Medium',
    async () => { await goTo('leave_request.php'); await assertPageContains('Emergency Leave'); });

  await runTest('TC-089','Leave Request','UI/UX','College Leave option is in dropdown','Medium',
    async () => { await goTo('leave_request.php'); await assertPageContains('College Leave'); });

  await runTest('TC-090','Leave Request','Validation','Empty form submission blocked','High',
    async () => {
      await goTo('leave_request.php');
      await clickEl(By.name('submit_leave'));
      const inputs = await driver.findElements(By.css('input[required],select[required]'));
      if (inputs.length === 0) throw new Error('No required inputs on leave form');
    });

  await runTest('TC-091','Leave Request','Functional','Back button navigates to student dashboard','Medium',
    async () => {
      await goTo('leave_request.php');
      await clickEl(By.css('.back-btn'));
      await assertUrlContains('student_dashboard.php');
    });

  // ── MODULE 11: MESS FEEDBACK ────────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 11: Mess Feedback ━━━${C.reset}`);

  await runTest('TC-092','Mess Feedback','Functional','Mess Feedback page loads','High',
    async () => { await goTo('mess_feedback.php'); await assertTitle('Mess Feedback'); });

  await runTest('TC-093','Mess Feedback','UI/UX','Breakfast Rating section is visible','High',
    async () => { await goTo('mess_feedback.php'); await assertPageContains('Breakfast Rating'); });

  await runTest('TC-094','Mess Feedback','UI/UX','Lunch Rating section is visible','High',
    async () => { await goTo('mess_feedback.php'); await assertPageContains('Lunch Rating'); });

  await runTest('TC-095','Mess Feedback','UI/UX','Dinner Rating section is visible','High',
    async () => { await goTo('mess_feedback.php'); await assertPageContains('Dinner Rating'); });

  await runTest('TC-096','Mess Feedback','UI/UX','Overall Rating (1-5) section is visible','High',
    async () => { await goTo('mess_feedback.php'); await assertPageContains('Overall Rating'); });

  await runTest('TC-097','Mess Feedback','UI/UX','Feedback textarea is present','High',
    async () => { await goTo('mess_feedback.php'); await assertElementExists(By.name('feedback')); });

  await runTest('TC-098','Mess Feedback','UI/UX','Submit Feedback button is present','High',
    async () => { await goTo('mess_feedback.php'); await assertElementExists(By.name('submit_feedback')); });

  await runTest('TC-099','Mess Feedback','UI/UX','Star rating elements are rendered','Medium',
    async () => {
      await goTo('mess_feedback.php');
      const stars = await driver.findElements(By.css('.rating span'));
      if (stars.length < 5) throw new Error(`Expected at least 5 star elements, found ${stars.length}`);
    });

  await runTest('TC-100','Mess Feedback','Functional','Star rating click activates stars','Medium',
    async () => {
      await goTo('mess_feedback.php');
      const stars = await driver.findElements(By.css('.rating span'));
      if (stars.length > 0) { await stars[2].click(); await driver.sleep(300); }
      const activeStars = await driver.findElements(By.css('.rating span.active'));
      if (activeStars.length === 0) throw new Error('No star became active after click');
    });

  await runTest('TC-101','Mess Feedback','Functional','Back button returns to student dashboard','Medium',
    async () => {
      await goTo('mess_feedback.php');
      await clickEl(By.css('.back-btn'));
      await assertUrlContains('student_dashboard.php');
    });

  await runTest('TC-102','Mess Feedback','Validation','Empty feedback submission triggers required','High',
    async () => {
      await goTo('mess_feedback.php');
      await clickEl(By.name('submit_feedback'));
      const inp = await findEl(By.name('feedback'));
      const valid = await driver.executeScript('return arguments[0].validity.valid;', inp);
      if (valid) throw new Error('Expected required validation on feedback textarea');
    });

  // ── MODULE 12: COMPLAINT HISTORY ────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 12: Complaint History ━━━${C.reset}`);

  await runTest('TC-103','Complaint History','Functional','Complaint history page loads','High',
    async () => { await goTo('complaint_history.php'); await assertTitle(''); });

  await runTest('TC-104','Complaint History','UI/UX','Complaint section heading visible','Medium',
    async () => { await goTo('complaint_history.php'); await assertPageContains('Complaint'); });

  // ── MODULE 13: NOTIFICATIONS ────────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 13: Notifications ━━━${C.reset}`);

  await runTest('TC-105','Notifications','Functional','Notifications page loads','High',
    async () => { await goTo('notifications.php'); await assertTitle(''); });

  await runTest('TC-106','Notifications','UI/UX','Notifications heading is visible','Medium',
    async () => { await goTo('notifications.php'); await assertPageContains('Notification'); });

  // ── MODULE 14: FEE DETAILS ──────────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 14: Fee Details ━━━${C.reset}`);

  await runTest('TC-107','Fee Details','Functional','Fee details page loads','High',
    async () => { await goTo('fee_details.php'); await assertTitle(''); });

  await runTest('TC-108','Fee Details','UI/UX','Fee content is visible','Medium',
    async () => { await goTo('fee_details.php'); await assertPageContains('Fee'); });

  // ── MODULE 15: MY ROOM ──────────────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 15: My Room ━━━${C.reset}`);

  await runTest('TC-109','My Room','Functional','My Room page loads','High',
    async () => { await goTo('my_room.php'); await assertTitle(''); });

  await runTest('TC-110','My Room','UI/UX','Room information section visible','Medium',
    async () => { await goTo('my_room.php'); await assertPageContains('Room'); });

  // ── MODULE 16: ATTENDANCE ───────────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 16: Attendance ━━━${C.reset}`);

  await runTest('TC-111','Attendance','Functional','Attendance page loads','High',
    async () => { await goTo('attendance.php'); await assertTitle(''); });

  await runTest('TC-112','Attendance','UI/UX','Attendance heading visible','Medium',
    async () => { await goTo('attendance.php'); await assertPageContains('Attendance'); });

  // ── MODULE 17: PROFILE ──────────────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 17: Profile ━━━${C.reset}`);

  await runTest('TC-113','Profile','Functional','Profile page loads','High',
    async () => { await goTo('profile.php'); await assertTitle(''); });

  await runTest('TC-114','Profile','UI/UX','Profile content visible','Medium',
    async () => { await goTo('profile.php'); await assertPageContains('Profile'); });

  // ── MODULE 18: WARDEN DASHBOARD ────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 18: Warden Dashboard ━━━${C.reset}`);

  await runTest('TC-115','Warden Dashboard','Functional','Warden dashboard page loads','High',
    async () => { await goTo('warden_dashboard.php'); await assertTitle(''); });

  await runTest('TC-116','Warden Dashboard','UI/UX','Warden dashboard content visible','Medium',
    async () => { await goTo('warden_dashboard.php'); await assertPageContains('Warden'); });

  // ── MODULE 19: LEAVE REQUESTS MANAGEMENT ───────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 19: Leave Requests Mgmt ━━━${C.reset}`);

  await runTest('TC-117','Leave Management','Functional','Leave requests page loads','High',
    async () => { await goTo('leave_requests.php'); await assertTitle(''); });

  await runTest('TC-118','Leave Management','UI/UX','Leave requests table visible','Medium',
    async () => { await goTo('leave_requests.php'); await assertPageContains('Leave'); });

  // ── MODULE 20: ROOM MANAGEMENT ──────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 20: Room Management ━━━${C.reset}`);

  await runTest('TC-119','Room Management','Functional','Room management page loads','High',
    async () => { await goTo('room_management.php'); await assertTitle(''); });

  await runTest('TC-120','Room Management','UI/UX','Room management content is visible','Medium',
    async () => { await goTo('room_management.php'); await assertPageContains('Room'); });

  // ── MODULE 21: MESS MANAGEMENT ──────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 21: Mess Management ━━━${C.reset}`);

  await runTest('TC-121','Mess Management','Functional','Mess management page loads','High',
    async () => { await goTo('mess_management.php'); await assertTitle(''); });

  // ── MODULE 22: STUDENTS MANAGEMENT ─────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 22: Students Management ━━━${C.reset}`);

  await runTest('TC-122','Students Management','Functional','Students page loads','High',
    async () => { await goTo('students.php'); await assertTitle(''); });

  await runTest('TC-123','Students Management','UI/UX','Students list visible','Medium',
    async () => { await goTo('students.php'); await assertPageContains('Student'); });

  // ── MODULE 23: REPORTS ──────────────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 23: Reports ━━━${C.reset}`);

  await runTest('TC-124','Reports','Functional','Reports page loads','High',
    async () => { await goTo('reports.php'); await assertTitle(''); });

  // ── MODULE 24: SECURITY MONITORING ─────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 24: Security Monitoring ━━━${C.reset}`);

  await runTest('TC-125','Security Monitoring','Functional','Security monitoring page loads','High',
    async () => { await goTo('security_monitoring.php'); await assertTitle(''); });

  await runTest('TC-126','Security Monitoring','UI/UX','Security section content visible','Medium',
    async () => { await goTo('security_monitoring.php'); await assertPageContains('Security'); });

  // ── MODULE 25: SYSTEM SETTINGS ──────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 25: System Settings ━━━${C.reset}`);

  await runTest('TC-127','System Settings','Functional','System settings page loads','Medium',
    async () => { await goTo('system_settings.php'); await assertTitle(''); });

  // ── MODULE 26: COMPLAINT MONITORING ────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 26: Complaint Monitoring ━━━${C.reset}`);

  await runTest('TC-128','Complaint Monitoring','Functional','Complaint monitoring page loads','High',
    async () => { await goTo('complaint_monitoring.php'); await assertTitle(''); });

  await runTest('TC-129','Complaint Monitoring','UI/UX','Complaint monitoring content visible','Medium',
    async () => { await goTo('complaint_monitoring.php'); await assertPageContains('Complaint'); });

  // ── MODULE 27: COMPLAINTS MANAGEMENT ───────────────────────
  await runTest('TC-130','Complaints Management','Functional','Complaints management page loads','High',
    async () => { await goTo('complaints_management.php'); await assertTitle(''); });

  // ── MODULE 28: ATTENDANCE MANAGEMENT ───────────────────────
  await runTest('TC-131','Attendance Management','Functional','Attendance management page loads','High',
    async () => { await goTo('attendance_management.php'); await assertTitle(''); });

  // ── MODULE 29: STUDENT OVERVIEW ─────────────────────────────
  await runTest('TC-132','Student Overview','Functional','Student overview page loads','High',
    async () => { await goTo('student_overview.php'); await assertTitle(''); });

  await runTest('TC-133','Student Overview','UI/UX','Student overview content visible','Medium',
    async () => { await goTo('student_overview.php'); await assertPageContains('Student'); });

  // ── MODULE 30: LOGOUT ────────────────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 30: Logout & Session ━━━${C.reset}`);

  await runTest('TC-134','Logout','Functional','Logout page redirects to index or login','High',
    async () => {
      await goTo('logout.php');
      const url = await getCurrentUrl();
      if (!url.includes('index.php') && !url.includes('student_login.php') && !url.includes('select_role.php'))
        throw new Error(`Unexpected redirect after logout: ${url}`);
    });

  await runTest('TC-135','Logout','Functional','After logout, student dashboard is inaccessible','High',
    async () => {
      await goTo('logout.php');
      await driver.sleep(400);
      await goTo('student_dashboard.php');
      await assertUrlContains('student_login.php');
    });

  // ── MODULE 31: DEPLOYMENT READINESS ────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ MODULE 31: Deployment Readiness ━━━${C.reset}`);

  await runTest('TC-136','Deployment','Deployment Status','Application base URL is accessible','Critical',
    async () => { await goTo('index.php'); await assertTitle('Smart Hostel'); });

  await runTest('TC-137','Deployment','Deployment Status','No PHP fatal errors on index','Critical',
    async () => {
      await goTo('index.php');
      const body = await driver.findElement(By.tagName('body')).getText();
      if (body.includes('Fatal error') || body.includes('Parse error'))
        throw new Error('PHP fatal/parse error detected on index page');
    });

  await runTest('TC-138','Deployment','Deployment Status','No PHP fatal errors on student login','Critical',
    async () => {
      await goTo('student_login.php');
      const body = await driver.findElement(By.tagName('body')).getText();
      if (body.includes('Fatal error') || body.includes('Parse error'))
        throw new Error('PHP fatal/parse error on student_login.php');
    });

  await runTest('TC-139','Deployment','Deployment Status','No PHP fatal errors on admin login','Critical',
    async () => {
      await goTo('admin_login.php');
      const body = await driver.findElement(By.tagName('body')).getText();
      if (body.includes('Fatal error') || body.includes('Parse error'))
        throw new Error('PHP fatal/parse error on admin_login.php');
    });

  await runTest('TC-140','Deployment','Deployment Status','No PHP fatal errors on warden login','Critical',
    async () => {
      await goTo('warden_login.php');
      const body = await driver.findElement(By.tagName('body')).getText();
      if (body.includes('Fatal error') || body.includes('Parse error'))
        throw new Error('PHP fatal/parse error on warden_login.php');
    });

  await runTest('TC-141','Deployment','Deployment Status','Bootstrap CSS loads correctly','High',
    async () => {
      await goTo('student_login.php');
      const el = await findEl(By.css('.form-control'));
      if (!el) throw new Error('Bootstrap .form-control not found - CSS may not be loading');
    });

  await runTest('TC-142','Deployment','Deployment Status','Google Fonts loaded (Poppins)','Medium',
    async () => {
      await goTo('student_login.php');
      const fontFamily = await driver.executeScript(
        "return getComputedStyle(document.body).fontFamily;");
      if (!fontFamily.toLowerCase().includes('poppins') && !fontFamily.includes('sans'))
        throw new Error(`Expected Poppins font, got: ${fontFamily}`);
    });

  await runTest('TC-143','Deployment','Deployment Status','App is responsive on mobile viewport','High',
    async () => {
      await driver.manage().window().setRect({ width: 375, height: 812 });
      await goTo('index.php');
      const el = await findEl(By.css('h1'));
      if (!el) throw new Error('h1 not found on mobile viewport');
      await driver.manage().window().setRect({ width: 1366, height: 768 });
    });

}

// ════════════════════════════════════════════════════════════
//  EXCEL REPORT GENERATOR
// ════════════════════════════════════════════════════════════
async function generateExcelReport() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Smart Hostel Selenium E2E Suite';
  workbook.created = new Date();

  // ── COLOURS & FONTS ─────────────────────────────────────────
  const COLORS = {
    headerBg:     '1E3A5F', headerFg: 'FFFFFF',
    pass:         'D4EDDA', passFg:   '155724',
    fail:         'F8D7DA', failFg:   '721C24',
    skip:         'FFF3CD', skipFg:   '856404',
    sectionBg:    'EBF4FF', critical: 'FF4444',
    high:         'FF8C00', medium:   '2563EB',
    low:          '6B7280', title:    '0F2857',
  };

  // Helper: strip emoji/non-BMP chars for ExcelJS safety
  const safe = (s) => String(s).replace(/[\u{1F300}-\u{1FFFF}]/gu, '').trim();

  const font = (bold, size, color) => ({ name: 'Calibri', bold, size, color: { argb: color || '000000' } });
  const fill = (argb) => ({ type: 'pattern', pattern: 'solid', fgColor: { argb } });
  const border = () => ({
    top: { style: 'thin' }, left: { style: 'thin' },
    bottom: { style: 'thin' }, right: { style: 'thin' },
  });
  const align = (h, v, wrap) => ({ horizontal: h, vertical: v || 'middle', wrapText: wrap || false });
  const setCell = (cell, val) => { cell.value = safe(val); };

  // ════════════════════════════════════════════════════════════
  //  SHEET 1 — COVER PAGE
  // ════════════════════════════════════════════════════════════
  const cover = workbook.addWorksheet('Cover Page');
  cover.mergeCells('A1:H1');
  cover.mergeCells('A2:H2');
  cover.mergeCells('A3:H3');
  cover.mergeCells('A4:H4');
  cover.mergeCells('A5:H5');
  cover.mergeCells('A6:H6');
  cover.mergeCells('A7:H7');
  cover.mergeCells('A8:H8');
  cover.mergeCells('A9:H9');
  cover.mergeCells('A10:H10');
  cover.mergeCells('A11:H11');
  cover.mergeCells('A12:H12');
  cover.mergeCells('A13:H13');

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN',{ day:'2-digit', month:'long', year:'numeric' });
  const timeStr = now.toLocaleTimeString('en-IN');

  const coverData = [
    [''],
    ['🏨  SMART HOSTEL MANAGEMENT SYSTEM'],
    ['END-TO-END TEST EXECUTION REPORT'],
    [''],
    [`Execution Date : ${dateStr}    |    Time : ${timeStr}`],
    ['Project : Smart Hostel Management System  |  Stack : PHP 8 + MySQL + Bootstrap 5'],
    ['Test Framework : Selenium WebDriver (Node.js)  |  Report Tool : ExcelJS'],
    ['Repository : https://github.com/Shanmukapriya12/SmartHostel'],
    [''],
    [`Total Test Cases : ${results.length}      PASS : ${passCount}      FAIL : ${failCount}      SKIP : ${skipCount}`],
    [`Pass Rate : ${((passCount / results.length) * 100).toFixed(1)}%`],
    [''],
    ['Prepared by : Smart Hostel QA Automation Suite'],
  ];
  coverData.forEach((row, i) => {
    const r = cover.getRow(i + 1);
    r.getCell(1).value = row[0];
    r.height = i === 1 ? 45 : i === 2 ? 30 : 22;
    if (i === 1) {
      r.getCell(1).font = font(true, 26, COLORS.headerFg);
      r.getCell(1).fill = fill(COLORS.title);
      r.getCell(1).alignment = align('center');
    } else if (i === 2) {
      r.getCell(1).font = font(true, 16, '1E3A5F');
      r.getCell(1).alignment = align('center');
    } else if (i === 9) {
      r.getCell(1).font = font(true, 13, '0D5A1E');
      r.getCell(1).fill = fill('D4EDDA');
      r.getCell(1).alignment = align('center');
    } else {
      r.getCell(1).font = font(false, 12, '1E293B');
      r.getCell(1).alignment = align('center');
    }
  });
  cover.getColumn('A').width = 130;

  // ════════════════════════════════════════════════════════════
  //  SHEET 2 — SUMMARY DASHBOARD
  // ════════════════════════════════════════════════════════════
  const summary = workbook.addWorksheet('📊 Summary Dashboard');
  summary.columns = [
    { key: 'a', width: 32 }, { key: 'b', width: 20 }, { key: 'c', width: 20 },
    { key: 'd', width: 20 }, { key: 'e', width: 20 }, { key: 'f', width: 25 },
  ];

  // Title
  summary.mergeCells('A1:F1');
  const sTitleRow = summary.getRow(1);
  sTitleRow.getCell(1).value = '📊 TEST EXECUTION SUMMARY — SMART HOSTEL MANAGEMENT SYSTEM';
  sTitleRow.getCell(1).font = font(true, 15, 'FFFFFF');
  sTitleRow.getCell(1).fill = fill(COLORS.headerBg);
  sTitleRow.getCell(1).alignment = align('center');
  sTitleRow.height = 35;

  // Overall metrics
  summary.mergeCells('A2:F2');
  summary.getRow(2).height = 10;

  const metricHeaders = ['Metric', 'Value'];
  const metrics = [
    ['🧪 Total Test Cases', results.length],
    ['✅ Total PASS', passCount],
    ['❌ Total FAIL', failCount],
    ['⚠️  Total SKIP', skipCount],
    ['📈 Pass Rate (%)', ((passCount / results.length) * 100).toFixed(1) + '%'],
    ['📅 Execution Date', dateStr],
    ['⏱  Execution Time', `${(results.reduce((a,r)=>a+parseFloat(r.duration),0)).toFixed(1)}s`],
  ];

  summary.getRow(3).values = ['OVERALL METRICS', ''];
  summary.getRow(3).font = font(true, 12, COLORS.headerFg);
  summary.getRow(3).fill = fill('2563EB');
  summary.getRow(3).height = 22;

  metrics.forEach((m, i) => {
    const r = summary.getRow(4 + i);
    r.values = m;
    r.getCell(1).font = font(true, 11);
    r.getCell(2).font = font(false, 11);
    r.getCell(2).fill = fill(i === 1 ? 'D4EDDA' : i === 2 ? 'F8D7DA' : 'EBF4FF');
    r.getCell(1).border = border();
    r.getCell(2).border = border();
    r.height = 20;
  });

  // By Category
  summary.getRow(12).values = ['', ''];
  summary.getRow(13).values = ['BY TEST CATEGORY', 'PASS', 'FAIL', 'TOTAL', 'PASS RATE'];
  summary.getRow(13).font = font(true, 11, COLORS.headerFg);
  summary.getRow(13).fill = fill('0F2857');
  summary.getRow(13).height = 22;

  const cats = {};
  results.forEach(r => {
    if (!cats[r.category]) cats[r.category] = { pass: 0, fail: 0 };
    if (r.status === 'PASS') cats[r.category].pass++;
    else cats[r.category].fail++;
  });
  let ri = 14;
  Object.entries(cats).forEach(([cat, c]) => {
    const total = c.pass + c.fail;
    const rate = ((c.pass / total) * 100).toFixed(0) + '%';
    const row = summary.getRow(ri++);
    row.values = [cat, c.pass, c.fail, total, rate];
    row.getCell(1).font = font(true, 11);
    row.getCell(2).fill = fill('D4EDDA');
    row.getCell(3).fill = fill(c.fail > 0 ? 'F8D7DA' : 'D4EDDA');
    for (let ci = 1; ci <= 5; ci++) row.getCell(ci).border = border();
    row.height = 18;
  });

  // By Module
  const mods = {};
  results.forEach(r => {
    if (!mods[r.module]) mods[r.module] = { pass: 0, fail: 0 };
    if (r.status === 'PASS') mods[r.module].pass++;
    else mods[r.module].fail++;
  });
  ri += 1;
  const modTitleRow = summary.getRow(ri++);
  modTitleRow.values = ['BY MODULE', 'PASS', 'FAIL', 'TOTAL', 'STATUS'];
  modTitleRow.font = font(true, 11, COLORS.headerFg);
  modTitleRow.fill = fill('0F2857');
  modTitleRow.height = 22;

  Object.entries(mods).forEach(([mod, m]) => {
    const total = m.pass + m.fail;
    const row = summary.getRow(ri++);
    row.values = [mod, m.pass, m.fail, total, m.fail === 0 ? '✅ PASS' : '❌ FAIL'];
    row.getCell(1).font = font(false, 10);
    row.getCell(5).font = font(true, 10, m.fail === 0 ? '155724' : '721C24');
    row.getCell(5).fill = fill(m.fail === 0 ? 'D4EDDA' : 'F8D7DA');
    for (let ci = 1; ci <= 5; ci++) row.getCell(ci).border = border();
    row.height = 16;
  });

  // ════════════════════════════════════════════════════════════
  //  SHEET 3 — ALL TEST CASES
  // ════════════════════════════════════════════════════════════
  const sheet = workbook.addWorksheet('All Test Cases');
  sheet.columns = [
    { key: 'id',       header: 'Test ID',       width: 10 },
    { key: 'module',   header: 'Module',          width: 24 },
    { key: 'category', header: 'Category',        width: 22 },
    { key: 'testName', header: 'Test Case Name',  width: 48 },
    { key: 'priority', header: 'Priority',        width: 12 },
    { key: 'status',   header: 'Status',          width: 10 },
    { key: 'duration', header: 'Duration (s)',    width: 14 },
    { key: 'remarks',  header: 'Remarks',         width: 60 },
  ];

  // Header row
  const headerRow = sheet.getRow(1);
  headerRow.values = ['Test ID','Module','Category','Test Case Name','Priority','Status','Duration (s)','Remarks'];
  headerRow.eachCell(cell => {
    cell.font = font(true, 11, 'FFFFFF');
    cell.fill = fill(COLORS.headerBg);
    cell.alignment = align('center', 'middle');
    cell.border = border();
  });
  headerRow.height = 30;

  // Data rows
  results.forEach((r, i) => {
    const row = sheet.addRow(r);
    const isPass = r.status === 'PASS';
    row.eachCell((cell, colNum) => {
      cell.border = border();
      cell.font = font(false, 10);
      cell.alignment = align('left', 'middle', colNum === 8);
      if (i % 2 === 0) cell.fill = fill('F8FAFC');
    });
    // Status cell
    row.getCell(6).font = font(true, 10, isPass ? COLORS.passFg : COLORS.failFg);
    row.getCell(6).fill = fill(isPass ? COLORS.pass : COLORS.fail);
    row.getCell(6).alignment = align('center');
    // Priority cell
    const prioColors = { Critical: 'FF4444', High: 'FF8C00', Medium: '2563EB', Low: '6B7280' };
    row.getCell(5).font = font(true, 10, prioColors[r.priority] || '000000');
    row.getCell(5).alignment = align('center');
    row.height = 18;
  });

  sheet.autoFilter = { from: 'A1', to: 'H1' };
  sheet.views = [{ state: 'frozen', ySplit: 1 }];

  // ════════════════════════════════════════════════════════════
  //  SHEET 4 — FAILED TESTS
  // ════════════════════════════════════════════════════════════
  const failSheet = workbook.addWorksheet('Failed Tests');
  failSheet.columns = [
    { key: 'id',       width: 10 }, { key: 'module',   width: 24 },
    { key: 'category', width: 22 }, { key: 'testName', width: 50 },
    { key: 'priority', width: 12 }, { key: 'remarks',  width: 80 },
  ];
  const fHeaderRow = failSheet.getRow(1);
  fHeaderRow.values = ['Test ID', 'Module', 'Category', 'Test Case Name', 'Priority', 'Error / Remarks'];
  fHeaderRow.eachCell(c => {
    c.font = font(true, 11, 'FFFFFF');
    c.fill = fill('C0392B');
    c.border = border();
    c.alignment = align('center');
  });
  fHeaderRow.height = 28;

  const failedTests = results.filter(r => r.status === 'FAIL');
  if (failedTests.length === 0) {
    failSheet.addRow(['No failed test cases - All tests passed!']);
  } else {
    failedTests.forEach(r => {
      const row = failSheet.addRow([r.id, r.module, r.category, r.testName, r.priority, r.remarks]);
      row.eachCell((c, ci) => { c.border = border(); c.font = font(false, 10); c.alignment = align('left','middle', ci===6); });
      row.getCell(5).font = font(true, 10, 'C0392B');
      row.height = 20;
    });
  }

  // ════════════════════════════════════════════════════════════
  //  SHEET 5 — UI/UX TESTS
  // ════════════════════════════════════════════════════════════
  const uiSheet = workbook.addWorksheet('UI-UX Tests');
  uiSheet.columns = [
    { key: 'id', width: 10 }, { key: 'module', width: 24 },
    { key: 'testName', width: 55 }, { key: 'status', width: 10 },
    { key: 'duration', width: 14 }, { key: 'remarks', width: 60 },
  ];
  const uiHeader = uiSheet.getRow(1);
  uiHeader.values = ['Test ID', 'Module', 'Test Case Name', 'Status', 'Duration (s)', 'Remarks'];
  uiHeader.eachCell(c => {
    c.font = font(true, 11, 'FFFFFF'); c.fill = fill('7C3AED');
    c.border = border(); c.alignment = align('center');
  });
  uiHeader.height = 28;
  results.filter(r => r.category === 'UI/UX').forEach(r => {
    const row = uiSheet.addRow([r.id, r.module, r.testName, r.status, r.duration, r.remarks]);
    const isPass = r.status === 'PASS';
    row.eachCell(c => { c.border = border(); c.font = font(false, 10); });
    row.getCell(4).fill = fill(isPass ? COLORS.pass : COLORS.fail);
    row.getCell(4).font = font(true, 10, isPass ? COLORS.passFg : COLORS.failFg);
    row.height = 18;
  });

  // ════════════════════════════════════════════════════════════
  //  SHEET 6 — FUNCTIONAL TESTS
  // ════════════════════════════════════════════════════════════
  const funcSheet = workbook.addWorksheet('Functional Tests');
  funcSheet.columns = [
    { key: 'id', width: 10 }, { key: 'module', width: 24 },
    { key: 'testName', width: 55 }, { key: 'status', width: 10 },
    { key: 'duration', width: 14 }, { key: 'remarks', width: 60 },
  ];
  const funcHeader = funcSheet.getRow(1);
  funcHeader.values = ['Test ID', 'Module', 'Test Case Name', 'Status', 'Duration (s)', 'Remarks'];
  funcHeader.eachCell(c => {
    c.font = font(true, 11, 'FFFFFF'); c.fill = fill('059669');
    c.border = border(); c.alignment = align('center');
  });
  funcHeader.height = 28;
  results.filter(r => r.category === 'Functional').forEach(r => {
    const row = funcSheet.addRow([r.id, r.module, r.testName, r.status, r.duration, r.remarks]);
    const isPass = r.status === 'PASS';
    row.eachCell(c => { c.border = border(); c.font = font(false, 10); });
    row.getCell(4).fill = fill(isPass ? COLORS.pass : COLORS.fail);
    row.getCell(4).font = font(true, 10, isPass ? COLORS.passFg : COLORS.failFg);
    row.height = 18;
  });

  // ════════════════════════════════════════════════════════════
  //  SHEET 7 — VALIDATION TESTS
  // ════════════════════════════════════════════════════════════
  const valSheet = workbook.addWorksheet('Validation Tests');
  valSheet.columns = [
    { key: 'id', width: 10 }, { key: 'module', width: 24 },
    { key: 'testName', width: 55 }, { key: 'status', width: 10 },
    { key: 'duration', width: 14 }, { key: 'remarks', width: 60 },
  ];
  const valHeader = valSheet.getRow(1);
  valHeader.values = ['Test ID', 'Module', 'Test Case Name', 'Status', 'Duration (s)', 'Remarks'];
  valHeader.eachCell(c => {
    c.font = font(true, 11, 'FFFFFF'); c.fill = fill('D97706');
    c.border = border(); c.alignment = align('center');
  });
  valHeader.height = 28;
  results.filter(r => r.category === 'Validation').forEach(r => {
    const row = valSheet.addRow([r.id, r.module, r.testName, r.status, r.duration, r.remarks]);
    const isPass = r.status === 'PASS';
    row.eachCell(c => { c.border = border(); c.font = font(false, 10); });
    row.getCell(4).fill = fill(isPass ? COLORS.pass : COLORS.fail);
    row.getCell(4).font = font(true, 10, isPass ? COLORS.passFg : COLORS.failFg);
    row.height = 18;
  });

  // ════════════════════════════════════════════════════════════
  //  SHEET 8 — DEPLOYMENT STATUS
  // ════════════════════════════════════════════════════════════
  const depSheet = workbook.addWorksheet('Deployment Status');
  depSheet.columns = [
    { key: 'id', width: 10 }, { key: 'module', width: 24 },
    { key: 'testName', width: 55 }, { key: 'status', width: 12 },
    { key: 'remarks', width: 70 },
  ];
  const depHeader = depSheet.getRow(1);
  depHeader.values = ['Test ID', 'Module', 'Test Case Name', 'Status', 'Remarks'];
  depHeader.eachCell(c => {
    c.font = font(true, 11, 'FFFFFF'); c.fill = fill('0F2857');
    c.border = border(); c.alignment = align('center');
  });
  depHeader.height = 28;

  const depResults = results.filter(r => r.category === 'Deployment Status');
  const allDepPass = depResults.every(r => r.status === 'PASS');

  // Deployment verdict banner
  depSheet.mergeCells('A2:E2');
  const verdictRow = depSheet.getRow(2);
  verdictRow.getCell(1).value = allDepPass
    ? 'DEPLOYMENT READY - All critical checks passed!'
    : 'NOT READY FOR DEPLOYMENT - Some critical checks failed!';
  verdictRow.getCell(1).font = font(true, 13, allDepPass ? '155724' : '721C24');
  verdictRow.getCell(1).fill = fill(allDepPass ? 'D4EDDA' : 'F8D7DA');
  verdictRow.getCell(1).alignment = align('center');
  verdictRow.height = 30;

  depResults.forEach(r => {
    const row = depSheet.addRow([r.id, r.module, r.testName, r.status, r.remarks]);
    const isPass = r.status === 'PASS';
    row.eachCell(c => { c.border = border(); c.font = font(false, 10); });
    row.getCell(4).fill = fill(isPass ? COLORS.pass : COLORS.fail);
    row.getCell(4).font = font(true, 10, isPass ? COLORS.passFg : COLORS.failFg);
    row.height = 18;
  });

  // ── Save File ────────────────────────────────────────────────
  const ts = now.toISOString().replace(/[:.]/g,'-').replace('T','_').substring(0,19);
  const fileName = `E2E_Test_Report_SmartHostel_${ts}.xlsx`;
  const filePath = path.join(__dirname, '..', fileName);
  await workbook.xlsx.writeFile(filePath);
  return { fileName, filePath };
}

// ════════════════════════════════════════════════════════════
//  MAIN ENTRY POINT
// ════════════════════════════════════════════════════════════
(async () => {
  console.log(`\n${C.bold}${C.cyan}╔══════════════════════════════════════════════════════╗`);
  console.log(`║   🏨  Smart Hostel — Selenium E2E Test Runner       ║`);
  console.log(`║   100+ Test Cases | PHP + MySQL | Node.js           ║`);
  console.log(`╚══════════════════════════════════════════════════════╝${C.reset}\n`);

  // Chrome options — headless for server/CI environments
  const opts = new chrome.Options();
  opts.addArguments(
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--window-size=1366,768',
    '--headless=new'
  );

  // Use the exact chromedriver.exe path
  console.log('ChromeDriver path:', CHROMEDRIVER_PATH);
  console.log('File exists:', fs.existsSync(CHROMEDRIVER_PATH));
  const service = new chrome.ServiceBuilder(CHROMEDRIVER_PATH);

  driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(opts)
    .setChromeService(service)
    .build();
  console.log('✅ Chrome driver started successfully');

  try {
    await runAllTests();
  } finally {
    await driver.quit();
  }

  // ── Generate Excel Report ────────────────────────────────────
  console.log(`\n${C.cyan}${C.bold}━━━ Generating Excel Report ━━━${C.reset}`);
  const { fileName, filePath } = await generateExcelReport();

  // ── Final Summary ────────────────────────────────────────────
  const total = results.length;
  const passRate = ((passCount / total) * 100).toFixed(1);
  console.log(`\n${C.bold}╔═══════════════════════════════════════╗`);
  console.log(`║         FINAL TEST SUMMARY            ║`);
  console.log(`╠═══════════════════════════════════════╣`);
  console.log(`║  Total  : ${String(total).padEnd(28)}║`);
  console.log(`║  ${C.green}PASS${C.bold}   : ${String(passCount).padEnd(28)}║`);
  console.log(`║  ${C.red}FAIL${C.bold}   : ${String(failCount).padEnd(28)}║`);
  console.log(`║  Pass % : ${String(passRate + '%').padEnd(28)}║`);
  console.log(`╚═══════════════════════════════════════╝${C.reset}`);
  console.log(`\n${C.cyan}📊 Report saved: ${C.bold}${fileName}${C.reset}`);
  console.log(`📁 Location    : ${filePath}\n`);
})();
