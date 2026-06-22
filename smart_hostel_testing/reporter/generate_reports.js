/**
 * ============================================================
 *  Unified Report and Dashboard Compiler
 *  Smart Hostel Management System (Styled Excel Version)
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

// Helper to format timestamp: M/D/YYYY, h:mm:ss AM/PM
function getTimestampString() {
  const d = new Date();
  const dateStr = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  let hours = d.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${dateStr}, ${displayHours}:${minutes}:${seconds} ${ampm}`;
}

/// Robust helper to find and read JSON or Excel results files
async function loadSuiteResults(suiteName, candidates) {
  for (const candidate of candidates) {
    const filePath = path.isAbsolute(candidate) 
      ? candidate 
      : path.resolve(path.join(__dirname, '..', '..', candidate));

    if (fs.existsSync(filePath)) {
      if (candidate.endsWith('.json')) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const data = JSON.parse(content);
          if (Array.isArray(data)) {
            console.log(`✅ Loaded ${data.length} results for [${suiteName}] from JSON: ${candidate}`);
            return data;
          }
        } catch (err) {
          console.error(`❌ Error parsing JSON for [${suiteName}] from ${candidate}:`, err.message);
        }
      } else if (candidate.endsWith('.xlsx')) {
        try {
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.readFile(filePath);
          const rawSheet = workbook.getWorksheet('RawData');
          if (rawSheet) {
            const data = [];
            rawSheet.eachRow((row, rowNumber) => {
              if (rowNumber === 1) return; // skip header
              data.push({
                id: row.getCell(1).value ? row.getCell(1).value.toString() : '',
                module: row.getCell(2).value ? row.getCell(2).value.toString() : '',
                category: row.getCell(3).value ? row.getCell(3).value.toString() : '',
                testName: row.getCell(4).value ? row.getCell(4).value.toString() : '',
                priority: row.getCell(5).value ? row.getCell(5).value.toString() : '',
                status: row.getCell(6).value ? row.getCell(6).value.toString() : '',
                duration: row.getCell(7).value ? parseFloat(row.getCell(7).value) : 0,
                remarks: row.getCell(8).value ? row.getCell(8).value.toString() : '',
                errorDetails: row.getCell(9).value ? row.getCell(9).value.toString() : '',
                screenshot: row.getCell(10).value ? row.getCell(10).value.toString() : ''
              });
            });
            console.log(`✅ Loaded ${data.length} results for [${suiteName}] from Excel RawData: ${candidate}`);
            return data;
          }
        } catch (err) {
          console.error(`❌ Error parsing Excel for [${suiteName}] from ${candidate}:`, err.message);
        }
      }
    }
  }
  console.log(`⚠️  Warning: No results found for [${suiteName}]. Tried candidates: ${candidates.join(', ')}`);
  return [];
}

// Shared helper to apply Segoe UI theme, colors, and layout matching the screenshot
function applyWorksheetStyle(sheet, rowsData) {
  sheet.views = [{ showGridLines: true }];

  // Setup Column Headers Row (Row 1)
  const headerRow = sheet.getRow(1);
  headerRow.height = 26;
  
  headerRow.eachCell((cell, colNum) => {
    if (colNum === 1) return; // Column A is empty spacer
    
    cell.font = { name: 'Segoe UI', bold: true, size: 11, color: { argb: 'FFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1F2937' } }; // Dark slate/grey
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = {
      top: { style: 'thin', color: { argb: '374151' } },
      bottom: { style: 'thin', color: { argb: '374151' } },
      left: { style: 'thin', color: { argb: '374151' } },
      right: { style: 'thin', color: { argb: '374151' } }
    };
  });

  // Populate and Style Data Rows
  const timestampVal = getTimestampString();

  rowsData.forEach((r, idx) => {
    const isPass = r.status === 'PASS';
    const rowNum = idx + 2;
    const row = sheet.getRow(rowNum);
    row.height = 20;

    // Map fields to columns B-G
    row.getCell(2).value = r.suiteLabel || r.module; // B: Test Suite
    row.getCell(3).value = r.category;               // C: Category
    row.getCell(4).value = `${r.id}: ${r.testName}`; // D: Test Case (ID: Name)
    row.getCell(5).value = r.status;                 // E: Status
    row.getCell(6).value = isPass ? '' : (r.remarks || r.errorDetails || 'Failed'); // F: Error Detail (empty if PASS)
    row.getCell(7).value = timestampVal;             // G: Timestamp

    // Apply generic styles to each cell
    row.eachCell((cell, colNum) => {
      if (colNum === 1) return; // Column A remains empty spacer
      
      cell.font = { name: 'Segoe UI', size: 10, color: { argb: '111827' } };
      cell.border = {
        top: { style: 'thin', color: { argb: 'E5E7EB' } },
        bottom: { style: 'thin', color: { argb: 'E5E7EB' } },
        left: { style: 'thin', color: { argb: 'E5E7EB' } },
        right: { style: 'thin', color: { argb: 'E5E7EB' } }
      };

      // Alignment settings
      if (colNum === 5) {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      } else {
        cell.alignment = { horizontal: 'left', vertical: 'middle' };
      }
    });

    // Style Status column (Col E is index 5)
    const statusCell = row.getCell(5);
    statusCell.font = { name: 'Segoe UI', bold: true, size: 10, color: { argb: 'FFFFFF' } };
    statusCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: isPass ? '10B981' : 'EF4444' } // Green background for PASS, Red for FAIL
    };
  });
}

async function compileReport() {
  console.log('🏁 Starting unified report compilation (Styled Excel layout)...');

  // Load results and append the Test Suite labels
  const suiteResultsMap = {
    selenium: (await loadSuiteResults('Selenium', [
      'smart_hostel_testing/reporter/results/selenium-web-report/selenium_web_report.xlsx',
      'smart_hostel_testing/reporter/results/selenium-web-report/selenium_web_results.json',
      'smart_hostel_testing/reporter/results/selenium_web_results.json',
      'smart_hostel_testing/web_selenium/web_results.json',
      'web_results.json'
    ])).map(r => ({ ...r, suiteLabel: 'Web Selenium' })),
    
    appium: (await loadSuiteResults('Appium', [
      'smart_hostel_testing/reporter/results/appium-android-report/appium_android_report.xlsx',
      'smart_hostel_testing/reporter/results/appium-android-report/appium_android_results.json',
      'smart_hostel_testing/reporter/results/appium_android_results.json',
      'smart_hostel_testing/mobile_appium/mobile_results.json',
      'mobile_results.json'
    ])).map(r => ({ ...r, suiteLabel: 'Mobile Appium' })),
    
    unit: (await loadSuiteResults('Unit API', [
      'smart_hostel_testing/reporter/results/unit-test-report/unit_test_report.xlsx',
      'smart_hostel_testing/reporter/results/unit-test-report/unit_test_results.json',
      'smart_hostel_testing/reporter/results/unit_test_results.json',
      'unit_test_results.json'
    ])).map(r => ({ ...r, suiteLabel: 'Unit API' })),
    
    validation: (await loadSuiteResults('Validation', [
      'smart_hostel_testing/reporter/results/validation-test-report/validation_test_report.xlsx',
      'smart_hostel_testing/reporter/results/validation-test-report/validation_test_results.json',
      'smart_hostel_testing/reporter/results/validation_test_results.json',
      'validation_test_results.json'
    ])).map(r => ({ ...r, suiteLabel: 'Validation Tests' })),
    
    deployment: (await loadSuiteResults('Deployment Status', [
      'smart_hostel_testing/reporter/results/deployment-test-report/deployment_test_report.xlsx',
      'smart_hostel_testing/reporter/results/deployment-test-report/deployment_test_results.json',
      'smart_hostel_testing/reporter/results/deployment_test_results.json',
      'deployment_test_results.json'
    ])).map(r => ({ ...r, suiteLabel: 'Deployment Status' })),
    
    load: (await loadSuiteResults('Load/Performance', [
      'smart_hostel_testing/reporter/results/load-test-report/load_test_report.xlsx',
      'smart_hostel_testing/reporter/results/load-test-report/load_test_results.json',
      'smart_hostel_testing/reporter/results/load_test_results.json',
      'load_test_results.json'
    ])).map(r => ({ ...r, suiteLabel: 'Load Testing' }))
  };

  // Combine results
  const allResults = [];
  Object.values(suiteResultsMap).forEach(results => {
    allResults.push(...results);
  });

  const total = allResults.length;
  const passCount = allResults.filter(r => r.status === 'PASS').length;
  const failCount = allResults.filter(r => r.status === 'FAIL').length;
  const passRate = total > 0 ? ((passCount / total) * 100).toFixed(1) : '0';

  // Copy screenshots to reports_output folder
  copyDirFiles(path.resolve(__dirname, '..', 'web_selenium', 'screenshots'), outputWebDir);
  copyDirFiles(path.resolve(__dirname, '..', 'mobile_appium', 'screenshots'), outputMobileDir);
  copyDirFiles(path.resolve(__dirname, 'results', 'selenium-web-report'), outputWebDir);
  copyDirFiles(path.resolve(__dirname, 'results', 'appium-android-report'), outputMobileDir);

  // 3. Generate HTML Dashboard
  const templatePath = path.join(__dirname, 'dashboard_template.html');
  if (fs.existsSync(templatePath)) {
    let htmlContent = fs.readFileSync(templatePath, 'utf8');
    htmlContent = htmlContent.replace('{{TEST_RESULTS_JSON}}', JSON.stringify(allResults, null, 2));
    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), htmlContent, 'utf8');
    console.log('✅ HTML Dashboard index.html generated successfully.');
  }

  // 4. Generate Excel workbook
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Smart Hostel QA Automation';
  workbook.created = new Date();

  // Excel Styling helper objects
  const COLORS = {
    headerBg:     '0F172A',
    pass:         'D1FAE5',
    fail:         'FEE2E2',
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
  
  for (let c = 1; c <= 8; c++) cover.getColumn(c).width = 15;
  cover.getColumn(1).width = 4; // Margin spacer

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
    row.getCell(2).fill = fill('D1FAE5');
    row.getCell(3).fill = fill(sFail > 0 ? 'FEE2E2' : 'D1FAE5');
    row.height = 20;
    rIdx++;
  });

  // Category summary
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
    row.getCell(5).font = font(true, 10, s.fail === 0 ? '065F46' : '991B1B');
    row.getCell(5).fill = fill(s.fail === 0 ? 'D1FAE5' : 'FEE2E2');
    row.height = 20;
    rIdx++;
  });

  // Columns definition for detail sheets (Starts at Column B, spacer in A)
  const detailColumns = [
    { key: 'spacer',    header: '',             width: 3 },
    { key: 'suite',     header: 'Test Suite',   width: 22 },
    { key: 'category',  header: 'Category',     width: 16 },
    { key: 'testCase',  header: 'Test Case',    width: 65 },
    { key: 'status',    header: 'Status',       width: 12 },
    { key: 'error',     header: 'Error Detail', width: 30 },
    { key: 'timestamp', header: 'Timestamp',    width: 24 }
  ];

  // ════════════════════════════════════════════════════════════
  //  SHEET 3 — ALL TEST CASES (Segoe UI Theme)
  // ════════════════════════════════════════════════════════════
  const allSheet = workbook.addWorksheet('All Test Cases');
  allSheet.columns = detailColumns;
  applyWorksheetStyle(allSheet, allResults);
  allSheet.autoFilter = { from: 'B1', to: 'G1' };
  allSheet.views = [{ state: 'frozen', ySplit: 1, xSplit: 1 }];

  // ════════════════════════════════════════════════════════════
  //  SHEET 4 — FAILED TEST CASES
  // ════════════════════════════════════════════════════════════
  const failSheet = workbook.addWorksheet('Failed Tests');
  failSheet.columns = detailColumns;
  const failedTests = allResults.filter(r => r.status === 'FAIL');
  if (failedTests.length === 0) {
    const headerRow = failSheet.getRow(1);
    headerRow.height = 26;
    headerRow.eachCell((cell, colNum) => {
      if (colNum === 1) return;
      cell.font = { name: 'Segoe UI', bold: true, size: 11, color: { argb: 'FFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1F2937' } };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });
    const row = failSheet.addRow(['', 'No failed test cases - All tests passed!']);
    failSheet.mergeCells('B2:G2');
    row.getCell(2).font = font(true, 11, '065F46');
    row.getCell(2).fill = fill('D1FAE5');
    row.getCell(2).alignment = align('center');
    row.height = 24;
  } else {
    applyWorksheetStyle(failSheet, failedTests);
  }
  failSheet.autoFilter = { from: 'B1', to: 'G1' };
  failSheet.views = [{ state: 'frozen', ySplit: 1, xSplit: 1 }];

  // ════════════════════════════════════════════════════════════
  //  SHEETS 5 - 10 — INDIVIDUAL SUITES DETAIL (Segoe UI Theme)
  // ════════════════════════════════════════════════════════════
  const SUITES_CONFIG = [
    { name: 'Web Selenium Tests', key: 'selenium' },
    { name: 'Mobile Appium Tests', key: 'appium' },
    { name: 'Unit API Tests', key: 'unit' },
    { name: 'Validation Tests', key: 'validation' },
    { name: 'Deployment Status Tests', key: 'deployment' },
    { name: 'Load Performance Tests', key: 'load' }
  ];

  SUITES_CONFIG.forEach(cfg => {
    const suiteSheet = workbook.addWorksheet(cfg.name);
    suiteSheet.columns = detailColumns;
    const suiteResults = suiteResultsMap[cfg.key];
    applyWorksheetStyle(suiteSheet, suiteResults);
    suiteSheet.autoFilter = { from: 'B1', to: 'G1' };
    suiteSheet.views = [{ state: 'frozen', ySplit: 1, xSplit: 1 }];
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
