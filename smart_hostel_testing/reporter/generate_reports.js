/**
 * ============================================================
 *  Unified Report and Dashboard Compiler
 *  Smart Hostel Management System (6-Suite Version)
 * ============================================================
 */

const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const OUTPUT_DIR = path.join(__dirname, 'reports_output');

// Ensure output directory layout exists
const outputWebDir = path.join(OUTPUT_DIR, 'web_selenium', 'screenshots');
const outputMobileDir = path.join(OUTPUT_DIR, 'mobile_appium', 'screenshots');

[outputWebDir, outputMobileDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Helper to copy files recursively
function copyDirFiles(srcDir, destDir) {
  if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);
    files.forEach(file => {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);
      if (fs.lstatSync(srcFile).isFile()) {
        fs.copyFileSync(srcFile, destFile);
      }
    });
  }
}

// Robust helper to find and read JSON results files
function loadSuiteResults(suiteName, candidates) {
  for (const candidate of candidates) {
    // Try absolute or relative to project root (2 levels up from reporter)
    const filePath = path.isAbsolute(candidate) 
      ? candidate 
      : path.resolve(path.join(__dirname, '..', '..', candidate));

    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        if (Array.isArray(data)) {
          console.log(`✅ Loaded ${data.length} results for [${suiteName}] from: ${candidate}`);
          return data;
        }
      } catch (err) {
        console.error(`❌ Error parsing JSON for [${suiteName}] from ${candidate}:`, err.message);
      }
    }
  }
  console.log(`⚠️  Warning: No results found for [${suiteName}]. Tried candidates: ${candidates.join(', ')}`);
  return [];
}

async function compileReport() {
  console.log('🏁 Starting unified report compilation (6 test suites)...');

  // Define candidate search paths for each suite's results
  const suiteResultsMap = {
    selenium: loadSuiteResults('Selenium', [
      'smart_hostel_testing/reporter/results/selenium-web-report/selenium_web_results.json',
      'smart_hostel_testing/reporter/results/selenium_web_results.json',
      'smart_hostel_testing/web_selenium/web_results.json',
      'web_results.json'
    ]),
    appium: loadSuiteResults('Appium', [
      'smart_hostel_testing/reporter/results/appium-android-report/appium_android_results.json',
      'smart_hostel_testing/reporter/results/appium_android_results.json',
      'smart_hostel_testing/mobile_appium/mobile_results.json',
      'mobile_results.json'
    ]),
    unit: loadSuiteResults('Unit API', [
      'smart_hostel_testing/reporter/results/unit-test-report/unit_test_results.json',
      'smart_hostel_testing/reporter/results/unit_test_results.json',
      'unit_test_results.json'
    ]),
    validation: loadSuiteResults('Validation', [
      'smart_hostel_testing/reporter/results/validation-test-report/validation_test_results.json',
      'smart_hostel_testing/reporter/results/validation_test_results.json',
      'validation_test_results.json'
    ]),
    deployment: loadSuiteResults('Deployment Status', [
      'smart_hostel_testing/reporter/results/deployment-test-report/deployment_test_results.json',
      'smart_hostel_testing/reporter/results/deployment_test_results.json',
      'deployment_test_results.json'
    ]),
    load: loadSuiteResults('Load/Performance', [
      'smart_hostel_testing/reporter/results/load-test-report/load_test_results.json',
      'smart_hostel_testing/reporter/results/load_test_results.json',
      'load_test_results.json'
    ])
  };

  // Combine results
  const allResults = [];
  Object.values(suiteResultsMap).forEach(results => {
    allResults.push(...results);
  });

  const total = allResults.length;
  const passCount = allResults.filter(r => r.status === 'PASS').length;
  const failCount = allResults.filter(r => r.status === 'FAIL').length;
  const skipCount = allResults.filter(r => r.status === 'SKIP').length;
  const passRate = total > 0 ? ((passCount / total) * 100).toFixed(1) : '0';

  console.log(`📊 Statistics Summary: Total=${total}, Passed=${passCount}, Failed=${failCount}, Pass Rate=${passRate}%`);

  // Copy screenshots to reports_output folder
  copyDirFiles(path.resolve(__dirname, '..', 'web_selenium', 'screenshots'), outputWebDir);
  copyDirFiles(path.resolve(__dirname, '..', 'mobile_appium', 'screenshots'), outputMobileDir);
  // Also copy any screenshots from the results folders if they are nested
  copyDirFiles(path.resolve(__dirname, 'results', 'selenium-web-report'), outputWebDir);
  copyDirFiles(path.resolve(__dirname, 'results', 'appium-android-report'), outputMobileDir);
  console.log('📸 Screenshots scanned and consolidated.');

  // 3. Generate HTML Dashboard
  const templatePath = path.join(__dirname, 'dashboard_template.html');
  if (fs.existsSync(templatePath)) {
    let htmlContent = fs.readFileSync(templatePath, 'utf8');
    // Replace placeholder with JSON data
    htmlContent = htmlContent.replace('{{TEST_RESULTS_JSON}}', JSON.stringify(allResults, null, 2));
    
    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), htmlContent, 'utf8');
    console.log('✅ HTML Dashboard index.html generated successfully.');
  } else {
    console.error('❌ Error: dashboard_template.html template not found.');
  }

  // 4. Generate Excel report using ExcelJS
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Smart Hostel QA Automation';
  workbook.created = new Date();

  // Excel Styling helper objects
  const COLORS = {
    headerBg:     '0F172A', headerFg: 'FFFFFF',
    pass:         'D1FAE5', passFg:   '065F46',
    fail:         'FEE2E2', failFg:   '991B1B',
    skip:         'FEF3C7', skipFg:   '92400E',
    sectionBg:    'F1F5F9', titleBg:   '1E293B',
    border:       'E2E8F0',
  };

  const font = (bold, size, color) => ({ name: 'Calibri', bold, size, color: { argb: color || '000000' } });
  const fill = (argb) => ({ type: 'pattern', pattern: 'solid', fgColor: { argb } });
  const border = () => ({
    top: { style: 'thin', color: { argb: COLORS.border } },
    left: { style: 'thin', color: { argb: COLORS.border } },
    bottom: { style: 'thin', color: { argb: COLORS.border } },
    right: { style: 'thin', color: { argb: COLORS.border } },
  });
  const align = (h, v, wrap) => ({ horizontal: h, vertical: v || 'middle', wrapText: wrap || false });

  // ════════════════════════════════════════════════════════════
  //  SHEET 1 — COVER PAGE
  // ════════════════════════════════════════════════════════════
  const cover = workbook.addWorksheet('Cover Page');
  cover.views = [{ showGridLines: false }];
  
  // Format cells sizes
  for (let c = 1; c <= 8; c++) cover.getColumn(c).width = 15;
  cover.getColumn(1).width = 4; // Margin spacer

  // Banner merging A2:H2
  cover.mergeCells('B2:H3');
  const bannerCell = cover.getCell('B2');
  bannerCell.value = '🏨 SMART HOSTEL MANAGEMENT SYSTEM';
  bannerCell.font = font(true, 18, 'FFFFFF');
  bannerCell.fill = fill('0F172A');
  bannerCell.alignment = align('center', 'middle');

  cover.mergeCells('B4:H4');
  const subCell = cover.getCell('B4');
  subCell.value = 'END-TO-END QA TEST AUTOMATION PIPELINE REPORT';
  subCell.font = font(true, 11, '38BDF8');
  subCell.fill = fill('1E293B');
  subCell.alignment = align('center', 'middle');

  // Metainfo block
  const dateStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const timeStr = new Date().toLocaleTimeString('en-IN');

  const metaRows = [
    ['Test Suite Run Date', `${dateStr}  ${timeStr}`],
    ['Web Testing Engine', 'Selenium WebDriver (NodeJS)'],
    ['Mobile Testing Engine', 'Appium Mobile Client (Python)'],
    ['API & Unit Engine', 'REST Endpoint Assertions & Unit'],
    ['Execution Pipeline', 'GitHub Actions CI/CD Workflow'],
    ['Repository URL', 'https://github.com/Shanmukapriya12/SmartHostel'],
    ['GitHub Pages Dashboard', 'https://Shanmukapriya12.github.io/SmartHostel'],
  ];

  cover.getCell('B6').value = 'EXECUTION CONTEXT';
  cover.getCell('B6').font = font(true, 12, '1E293B');
  cover.mergeCells('B6:H6');

  let curRow = 7;
  metaRows.forEach(([lbl, val]) => {
    cover.mergeCells(`B${curRow}:C${curRow}`);
    cover.mergeCells(`D${curRow}:H${curRow}`);
    
    const labelCell = cover.getCell(`B${curRow}`);
    labelCell.value = lbl;
    labelCell.font = font(true, 10, '475569');
    labelCell.fill = fill('F8FAFC');
    labelCell.border = border();
    
    const valCell = cover.getCell(`D${curRow}`);
    valCell.value = val;
    valCell.font = font(false, 10, '0F172A');
    valCell.border = border();
    curRow++;
  });

  // Scorecard
  curRow += 1;
  cover.mergeCells(`B${curRow}:H${curRow}`);
  cover.getCell(`B${curRow}`).value = 'TEST EXECUTION SCORECARD';
  cover.getCell(`B${curRow}`).font = font(true, 12, '1E293B');
  curRow++;

  const scores = [
    ['Total Executed', total, '4F46E5'],
    ['Success Pass', passCount, '10B981'],
    ['Failures', failCount, 'EF4444'],
    ['Pass Success Rate', `${passRate}%`, '10B981']
  ];

  scores.forEach(([lbl, val, color]) => {
    cover.mergeCells(`B${curRow}:C${curRow}`);
    cover.mergeCells(`D${curRow}:H${curRow}`);
    
    const lblCell = cover.getCell(`B${curRow}`);
    lblCell.value = lbl;
    lblCell.font = font(true, 10, '475569');
    lblCell.border = border();
    
    const vCell = cover.getCell(`D${curRow}`);
    vCell.value = val;
    vCell.font = font(true, 11, color);
    vCell.border = border();
    vCell.alignment = align('left');
    curRow++;
  });

  // ════════════════════════════════════════════════════════════
  //  SHEET 2 — SUMMARY DASHBOARD
  // ════════════════════════════════════════════════════════════
  const summary = workbook.addWorksheet('📊 Summary Dashboard');
  summary.columns = [
    { key: 'a', width: 32 }, { key: 'b', width: 18 }, { key: 'c', width: 18 },
    { key: 'd', width: 18 }, { key: 'e', width: 22 }
  ];

  summary.mergeCells('A1:E1');
  const sTitle = summary.getCell('A1');
  sTitle.value = '📊 TEST SUITES SUMMARY OVERVIEW';
  sTitle.font = font(true, 14, 'FFFFFF');
  sTitle.fill = fill(COLORS.headerBg);
  sTitle.alignment = align('center');
  summary.getRow(1).height = 32;

  summary.getRow(3).values = ['Suite Name', 'Passed', 'Failed', 'Total Cases', 'Pass Rate (%)'];
  summary.getRow(3).eachCell(c => {
    c.font = font(true, 11, 'FFFFFF');
    c.fill = fill('1E293B');
    c.border = border();
  });
  summary.getRow(3).height = 24;

  let rIdx = 4;
  const suiteKeys = Object.keys(suiteResultsMap);
  suiteKeys.forEach(suiteKey => {
    const results = suiteResultsMap[suiteKey];
    const sPass = results.filter(r => r.status === 'PASS').length;
    const sFail = results.filter(r => r.status === 'FAIL').length;
    const sTotal = results.length;
    const sRate = sTotal > 0 ? ((sPass / sTotal) * 100).toFixed(1) + '%' : '0.0%';

    const suiteLabel = suiteKey.charAt(0).toUpperCase() + suiteKey.slice(1) + ' Suite';
    const row = summary.getRow(rIdx);
    row.values = [suiteLabel, sPass, sFail, sTotal, sRate];
    row.eachCell(c => { c.border = border(); c.font = font(false, 10); });
    row.getCell(1).font = font(true, 10);
    row.getCell(2).fill = fill(COLORS.pass);
    row.getCell(3).fill = fill(sFail > 0 ? COLORS.fail : COLORS.pass);
    row.height = 20;
    rIdx++;
  });

  // Category counts
  rIdx += 2;
  summary.mergeCells(`A${rIdx}:E${rIdx}`);
  summary.getCell(`A${rIdx}`).value = 'TEST CATEGORY SUMMARY';
  summary.getCell(`A${rIdx}`).font = font(true, 12, '1E293B');
  rIdx++;

  summary.getRow(rIdx).values = ['Category Name', 'Passed', 'Failed', 'Total Cases', 'Pass Rate (%)'];
  summary.getRow(rIdx).eachCell(c => {
    c.font = font(true, 11, 'FFFFFF');
    c.fill = fill('475569');
    c.border = border();
  });
  summary.getRow(rIdx).height = 24;
  rIdx++;

  const categorySummary = {};
  allResults.forEach(r => {
    if (!categorySummary[r.category]) categorySummary[r.category] = { pass: 0, fail: 0 };
    if (r.status === 'PASS') categorySummary[r.category].pass++;
    else categorySummary[r.category].fail++;
  });

  Object.entries(categorySummary).forEach(([cat, s]) => {
    const rTotal = s.pass + s.fail;
    const rRate = ((s.pass / rTotal) * 100).toFixed(1) + '%';
    const row = summary.getRow(rIdx);
    row.values = [cat, s.pass, s.fail, rTotal, rRate];
    row.eachCell(c => { c.border = border(); c.font = font(false, 10); });
    row.getCell(1).font = font(true, 10);
    row.getCell(5).font = font(true, 10, s.fail === 0 ? COLORS.passFg : COLORS.failFg);
    row.getCell(5).fill = fill(s.fail === 0 ? COLORS.pass : COLORS.fail);
    row.height = 20;
    rIdx++;
  });

  // ════════════════════════════════════════════════════════════
  //  SHEET 3 — ALL TEST CASES
  // ════════════════════════════════════════════════════════════
  const allSheet = workbook.addWorksheet('All Test Cases');
  allSheet.columns = [
    { key: 'id',       header: 'Test ID',       width: 15 },
    { key: 'module',   header: 'Module',          width: 24 },
    { key: 'category', header: 'Category',        width: 16 },
    { key: 'testName', header: 'Test Case Name',  width: 60 },
    { key: 'priority', header: 'Priority',        width: 12 },
    { key: 'status',   header: 'Status',          width: 12 },
    { key: 'duration', header: 'Duration (s)',    width: 14 },
    { key: 'remarks',  header: 'Remarks',         width: 55 },
  ];

  const headerRow = allSheet.getRow(1);
  headerRow.eachCell(c => {
    c.font = font(true, 11, 'FFFFFF');
    c.fill = fill(COLORS.headerBg);
    c.alignment = align('center', 'middle');
    c.border = border();
  });
  headerRow.height = 28;

  allResults.forEach((r, idx) => {
    const row = allSheet.addRow(r);
    const isPass = r.status === 'PASS';
    
    row.eachCell((c, colNum) => {
      c.border = border();
      c.font = font(false, 10);
      c.alignment = align('left', 'middle', colNum === 8);
      if (idx % 2 === 0) c.fill = fill('F8FAFC');
    });

    // Color Status
    row.getCell(6).font = font(true, 10, isPass ? COLORS.passFg : COLORS.failFg);
    row.getCell(6).fill = fill(isPass ? COLORS.pass : COLORS.fail);
    row.getCell(6).alignment = align('center');

    // Color Priority
    const prioColors = { Critical: 'EF4444', High: 'F59E0B', Medium: '3B82F6', Low: '94A3B8' };
    row.getCell(5).font = font(true, 10, prioColors[r.priority] || '000000');
    row.getCell(5).alignment = align('center');
    row.height = 20;
  });

  allSheet.autoFilter = { from: 'A1', to: 'H1' };
  allSheet.views = [{ state: 'frozen', ySplit: 1 }];

  // ════════════════════════════════════════════════════════════
  //  SHEET 4 — FAILED TEST CASES
  // ════════════════════════════════════════════════════════════
  const failSheet = workbook.addWorksheet('Failed Tests');
  failSheet.columns = [
    { key: 'id',       width: 15 },
    { key: 'module',   width: 24 },
    { key: 'testName', width: 50 },
    { key: 'priority', width: 12 },
    { key: 'remarks',  width: 50 },
    { key: 'error',    width: 60 }
  ];

  const fHeader = failSheet.getRow(1);
  fHeader.values = ['Test ID', 'Module', 'Test Case Name', 'Priority', 'Failure Remarks', 'Detailed Error Trace'];
  fHeader.eachCell(c => {
    c.font = font(true, 11, 'FFFFFF');
    c.fill = fill('EF4444');
    c.border = border();
    c.alignment = align('center');
  });
  fHeader.height = 28;

  const failedTests = allResults.filter(r => r.status === 'FAIL');
  if (failedTests.length === 0) {
    const row = failSheet.addRow(['No failed test cases - All tests passed!']);
    failSheet.mergeCells('A2:F2');
    row.getCell(1).font = font(true, 11, COLORS.passFg);
    row.getCell(1).fill = fill(COLORS.pass);
    row.getCell(1).alignment = align('center');
    row.height = 24;
  } else {
    failedTests.forEach(r => {
      const row = failSheet.addRow([
        r.id, r.module, r.testName, r.priority, r.remarks, r.errorDetails || ''
      ]);
      row.eachCell(c => { c.border = border(); c.font = font(false, 10); });
      row.getCell(4).font = font(true, 10, 'EF4444');
      row.height = 22;
    });
  }

  // ════════════════════════════════════════════════════════════
  //  SHEET 5 - 10 — INDIVIDUAL SUITES DETAIL
  // ════════════════════════════════════════════════════════════
  const SUITES_CONFIG = [
    { name: 'Web Selenium Tests', key: 'selenium', color: '4F46E5' },
    { name: 'Mobile Appium Tests', key: 'appium', color: '0D9488' },
    { name: 'Unit API Tests', key: 'unit', color: '10B981' },
    { name: 'Validation Tests', key: 'validation', color: 'F59E0B' },
    { name: 'Deployment Status Tests', key: 'deployment', color: '64748B' },
    { name: 'Load Performance Tests', key: 'load', color: '8B5CF6' }
  ];

  SUITES_CONFIG.forEach(cfg => {
    const suiteSheet = workbook.addWorksheet(cfg.name);
    suiteSheet.columns = allSheet.columns;
    
    const sHeader = suiteSheet.getRow(1);
    sHeader.values = allSheet.getRow(1).values;
    sHeader.eachCell(c => {
      c.font = font(true, 11, 'FFFFFF');
      c.fill = fill(cfg.color);
      c.border = border();
      c.alignment = align('center', 'middle');
    });
    sHeader.height = 28;

    const suiteResults = suiteResultsMap[cfg.key];
    if (suiteResults.length === 0) {
      const row = suiteSheet.addRow([`No results found or executed for ${cfg.name}`]);
      suiteSheet.mergeCells('A2:H2');
      row.getCell(1).font = font(true, 11, '475569');
      row.getCell(1).fill = fill('F1F5F9');
      row.getCell(1).alignment = align('center');
      row.height = 24;
    } else {
      suiteResults.forEach((r, idx) => {
        const row = suiteSheet.addRow(r);
        const isPass = r.status === 'PASS';
        
        row.eachCell((c, colNum) => {
          c.border = border();
          c.font = font(false, 10);
          c.alignment = align('left', 'middle', colNum === 8);
          if (idx % 2 === 0) c.fill = fill('F8FAFC');
        });

        row.getCell(6).fill = fill(isPass ? COLORS.pass : COLORS.fail);
        row.getCell(6).font = font(true, 10, isPass ? COLORS.passFg : COLORS.failFg);
        row.getCell(6).alignment = align('center');

        const prioColors = { Critical: 'EF4444', High: 'F59E0B', Medium: '3B82F6', Low: '94A3B8' };
        row.getCell(5).font = font(true, 10, prioColors[r.priority] || '000000');
        row.getCell(5).alignment = align('center');
        row.height = 20;
      });
    }

    suiteSheet.autoFilter = { from: 'A1', to: 'H1' };
    suiteSheet.views = [{ state: 'frozen', ySplit: 1 }];
  });

  // Save the report file
  const reportPath = path.join(OUTPUT_DIR, 'SmartHostel_Test_Report.xlsx');
  await workbook.xlsx.writeFile(reportPath);
  console.log(`✅ Excel Report generated: ${reportPath}`);

  // Copy Excel file to the root of the workspace for local easy access if needed
  const rootReportPath = path.resolve(__dirname, '..', '..', 'E2E_Test_Report_SmartHostel_Latest.xlsx');
  fs.copyFileSync(reportPath, rootReportPath);
  console.log(`📂 Copied latest report to: ${rootReportPath}`);
  
  console.log('🎉 Report compilation completed successfully.');
}

if (require.main === module) {
  compileReport().catch(err => {
    console.error('Fatal error compile report:', err);
    process.exit(1);
  });
}

module.exports = compileReport;
