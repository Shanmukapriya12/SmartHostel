/**
 * ============================================================
 *  Unified Report and Dashboard Compiler
 *  Smart Hostel Management System
 * ============================================================
 */

const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const WEBSUITE_DIR = path.join(__dirname, '..', 'web_selenium');
const MOBILESUP_DIR = path.join(__dirname, '..', 'mobile_appium');
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

async function compileReport() {
  console.log('🏁 Starting report compilation...');

  // 1. Read Web results
  let webResults = [];
  const webPath = path.join(WEBSUITE_DIR, 'web_results.json');
  if (fs.existsSync(webPath)) {
    webResults = JSON.parse(fs.readFileSync(webPath, 'utf8'));
    console.log(`Loaded ${webResults.length} Web Selenium results.`);
  } else {
    console.log('⚠️  No Web results JSON found.');
  }

  // 2. Read Mobile results
  let mobileResults = [];
  const mobilePath = path.join(MOBILESUP_DIR, 'mobile_results.json');
  if (fs.existsSync(mobilePath)) {
    mobileResults = JSON.parse(fs.readFileSync(mobilePath, 'utf8'));
    console.log(`Loaded ${mobileResults.length} Mobile Appium results.`);
  } else {
    console.log('⚠️  No Mobile results JSON found.');
  }

  // Combine results
  const allResults = [...webResults, ...mobileResults];
  const total = allResults.length;
  const passCount = allResults.filter(r => r.status === 'PASS').length;
  const failCount = allResults.filter(r => r.status === 'FAIL').length;
  const skipCount = allResults.filter(r => r.status === 'SKIP').length;
  const passRate = total > 0 ? ((passCount / total) * 100).toFixed(1) : '0';

  if (total === 0) {
    console.error('❌ Error: No test cases logged. Execute test runners first.');
    process.exit(1);
  }

  // Copy screenshots to reports_output folder
  copyDirFiles(path.join(WEBSUITE_DIR, 'screenshots'), outputWebDir);
  copyDirFiles(path.join(MOBILESUP_DIR, 'screenshots'), outputMobileDir);
  console.log('📸 Test screenshots copied to reports_output.');

  // 3. Generate HTML Dashboard
  const templatePath = path.join(__dirname, 'dashboard_template.html');
  if (fs.existsSync(templatePath)) {
    let htmlContent = fs.readFileSync(templatePath, 'utf8');
    // Replace placeholder with JSON data
    htmlContent = htmlContent.replace('{{TEST_RESULTS_JSON}}', JSON.stringify(allResults, null, 2));
    
    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), htmlContent, 'utf8');
    console.log('✅ HTML Dashboard generated successfully.');
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
  subCell.value = 'END-TO-END QA TEST AUTOMATION SUITE REPORT';
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
  sTitle.value = '📊 TEST CATEGORY & MODULE BREAKDOWN SUMMARY';
  sTitle.font = font(true, 14, 'FFFFFF');
  sTitle.fill = fill(COLORS.headerBg);
  sTitle.alignment = align('center');
  summary.getRow(1).height = 32;

  // Category counts
  const categorySummary = {};
  allResults.forEach(r => {
    if (!categorySummary[r.category]) categorySummary[r.category] = { pass: 0, fail: 0 };
    if (r.status === 'PASS') categorySummary[r.category].pass++;
    else categorySummary[r.category].fail++;
  });

  summary.getRow(3).values = ['Category Name', 'Passed', 'Failed', 'Total Cases', 'Pass Rate (%)'];
  summary.getRow(3).eachCell(c => {
    c.font = font(true, 11, 'FFFFFF');
    c.fill = fill('1E293B');
    c.border = border();
  });
  summary.getRow(3).height = 24;

  let rIdx = 4;
  Object.entries(categorySummary).forEach(([cat, s]) => {
    const rTotal = s.pass + s.fail;
    const rRate = ((s.pass / rTotal) * 100).toFixed(1) + '%';
    const row = summary.getRow(rIdx);
    row.values = [cat, s.pass, s.fail, rTotal, rRate];
    row.eachCell(c => { c.border = border(); c.font = font(false, 10); });
    row.getCell(1).font = font(true, 10);
    row.getCell(2).fill = fill(COLORS.pass);
    row.getCell(3).fill = fill(s.fail > 0 ? COLORS.fail : COLORS.pass);
    row.height = 20;
    rIdx++;
  });

  // Module counts
  rIdx += 2;
  summary.mergeCells(`A${rIdx}:E${rIdx}`);
  summary.getCell(`A${rIdx}`).value = 'MODULE BREAKDOWN DETAILS';
  summary.getCell(`A${rIdx}`).font = font(true, 12, '1E293B');
  rIdx++;

  summary.getRow(rIdx).values = ['Module Name', 'Passed', 'Failed', 'Total Cases', 'Pass Rate (%)'];
  summary.getRow(rIdx).eachCell(c => {
    c.font = font(true, 11, 'FFFFFF');
    c.fill = fill('475569');
    c.border = border();
  });
  summary.getRow(rIdx).height = 24;
  rIdx++;

  const moduleSummary = {};
  allResults.forEach(r => {
    if (!moduleSummary[r.module]) moduleSummary[r.module] = { pass: 0, fail: 0 };
    if (r.status === 'PASS') moduleSummary[r.module].pass++;
    else moduleSummary[r.module].fail++;
  });

  Object.entries(moduleSummary).forEach(([mod, s]) => {
    const rTotal = s.pass + s.fail;
    const rRate = ((s.pass / rTotal) * 100).toFixed(1) + '%';
    const row = summary.getRow(rIdx);
    row.values = [mod, s.pass, s.fail, rTotal, rRate];
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
    { key: 'id',       header: 'Test ID',       width: 12 },
    { key: 'module',   header: 'Module',          width: 24 },
    { key: 'category', header: 'Category',        width: 16 },
    { key: 'testName', header: 'Test Case Name',  width: 55 },
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
    { key: 'id',       width: 12 },
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
    failSheet.addRow(['No failed test cases - All tests passed!']);
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
  //  SHEET 5 — WEB TESTS DETAIL
  // ════════════════════════════════════════════════════════════
  const webSheet = workbook.addWorksheet('Web Selenium Tests');
  webSheet.columns = allSheet.columns;
  const wHeader = webSheet.getRow(1);
  wHeader.values = allSheet.getRow(1).values;
  wHeader.eachCell(c => {
    c.font = font(true, 11, 'FFFFFF'); c.fill = fill('4F46E5'); c.border = border();
  });
  wHeader.height = 28;

  webResults.forEach(r => {
    const row = webSheet.addRow(r);
    const isPass = r.status === 'PASS';
    row.eachCell(c => { c.border = border(); c.font = font(false, 10); });
    row.getCell(6).fill = fill(isPass ? COLORS.pass : COLORS.fail);
    row.getCell(6).font = font(true, 10, isPass ? COLORS.passFg : COLORS.failFg);
    row.height = 20;
  });

  // ════════════════════════════════════════════════════════════
  //  SHEET 6 — MOBILE TESTS DETAIL
  // ════════════════════════════════════════════════════════════
  const mobSheet = workbook.addWorksheet('Mobile Appium Tests');
  mobSheet.columns = allSheet.columns;
  const mHeader = mobSheet.getRow(1);
  mHeader.values = allSheet.getRow(1).values;
  mHeader.eachCell(c => {
    c.font = font(true, 11, 'FFFFFF'); c.fill = fill('0D9488'); c.border = border();
  });
  mHeader.height = 28;

  mobileResults.forEach(r => {
    const row = mobSheet.addRow(r);
    const isPass = r.status === 'PASS';
    row.eachCell(c => { c.border = border(); c.font = font(false, 10); });
    row.getCell(6).fill = fill(isPass ? COLORS.pass : COLORS.fail);
    row.getCell(6).font = font(true, 10, isPass ? COLORS.passFg : COLORS.failFg);
    row.height = 20;
  });

  // Save the report file
  const reportPath = path.join(OUTPUT_DIR, 'SmartHostel_Test_Report.xlsx');
  await workbook.xlsx.writeFile(reportPath);
  console.log(`✅ Excel Report generated: ${reportPath}`);

  // Copy Excel file to the root of the workspace for local easy access if needed
  const rootReportPath = path.join(__dirname, '..', '..', 'E2E_Test_Report_SmartHostel_Latest.xlsx');
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
