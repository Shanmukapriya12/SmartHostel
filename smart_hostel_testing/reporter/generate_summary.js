const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const SUITES = [
  { 
    key: 'selenium', 
    label: '🌐 Web Selenium', 
    candidates: [
      'smart_hostel_testing/reporter/results/selenium-web-report/selenium_web_report.xlsx',
      'smart_hostel_testing/reporter/results/selenium-web-report/selenium_web_results.json',
      'smart_hostel_testing/reporter/results/selenium_web_results.json',
      'smart_hostel_testing/web_selenium/web_results.json',
      'web_results.json'
    ] 
  },
  { 
    key: 'appium', 
    label: '📱 Mobile Appium', 
    candidates: [
      'smart_hostel_testing/reporter/results/appium-android-report/appium_android_report.xlsx',
      'smart_hostel_testing/reporter/results/appium-android-report/appium_android_results.json',
      'smart_hostel_testing/reporter/results/appium_android_results.json',
      'smart_hostel_testing/mobile_appium/mobile_results.json',
      'mobile_results.json'
    ] 
  },
  { 
    key: 'unit', 
    label: '🧪 Unit API', 
    candidates: [
      'smart_hostel_testing/reporter/results/unit-test-report/unit_test_report.xlsx',
      'smart_hostel_testing/reporter/results/unit-test-report/unit_test_results.json',
      'smart_hostel_testing/reporter/results/unit_test_results.json',
      'unit_test_results.json'
    ] 
  },
  { 
    key: 'validation', 
    label: '🛡️ Validation Tests', 
    candidates: [
      'smart_hostel_testing/reporter/results/validation-test-report/validation_test_report.xlsx',
      'smart_hostel_testing/reporter/results/validation-test-report/validation_test_results.json',
      'smart_hostel_testing/reporter/results/validation_test_results.json',
      'validation_test_results.json'
    ] 
  },
  { 
    key: 'deployment', 
    label: '🚀 Deployment Status', 
    candidates: [
      'smart_hostel_testing/reporter/results/deployment-test-report/deployment_test_report.xlsx',
      'smart_hostel_testing/reporter/results/deployment-test-report/deployment_test_results.json',
      'smart_hostel_testing/reporter/results/deployment_test_results.json',
      'deployment_test_results.json'
    ] 
  },
  { 
    key: 'load', 
    label: '⚡ Load Testing', 
    candidates: [
      'smart_hostel_testing/reporter/results/load-test-report/load_test_report.xlsx',
      'smart_hostel_testing/reporter/results/load-test-report/load_test_results.json',
      'smart_hostel_testing/reporter/results/load_test_results.json',
      'load_test_results.json'
    ] 
  }
];

async function loadSuiteResults(candidates) {
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
            return data;
          }
        } catch (err) {}
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
            return data;
          }
        } catch (err) {}
      }
    }
  }
  return [];
}

async function generateMarkdown() {
  const suitesData = [];
  for (const s of SUITES) {
    const results = await loadSuiteResults(s.candidates);
    suitesData.push({
      label: s.label,
      results
    });
  }

  const allResults = [];
  suitesData.forEach(s => allResults.push(...s.results));

  const total = allResults.length;
  const passed = allResults.filter(r => r.status === 'PASS').length;
  const failed = allResults.filter(r => r.status === 'FAIL').length;
  const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : '0';

  let md = `## 🏨 Smart Hostel E2E Pipeline QA Test Summary\n\n`;
  md += `| Suite | Total Cases | Passed | Failed | Pass Rate |\n`;
  md += `| :--- | :---: | :---: | :---: | :---: |\n`;
  
  suitesData.forEach(s => {
    const sTotal = s.results.length;
    const sPass = s.results.filter(r => r.status === 'PASS').length;
    const sFail = s.results.filter(r => r.status === 'FAIL').length;
    const sRate = sTotal > 0 ? ((sPass / sTotal) * 100).toFixed(1) + '%' : '0%';
    md += `| ${s.label} | ${sTotal} | ${sPass} | ${sFail} | ${sRate} |\n`;
  });
  
  md += `| **Total** | **${total}** | **${passed}** | **${failed}** | **${passRate}%** |\n\n`;

  if (failed > 0) {
    md += `### ❌ Failed Test Cases\n\n`;
    md += `| ID | Module | Test Case Name | Failure Remarks |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;
    allResults.filter(r => r.status === 'FAIL').forEach(r => {
      md += `| **${r.id}** | ${r.module} | ${r.testName} | \`${r.remarks}\` |\n`;
    });
    md += `\n`;
  } else {
    md += `### 🎉 All test cases passed successfully!\n\n`;
  }

  md += `### 🌐 Live Dashboard\n`;
  md += `View the interactive visual report at: [https://Shanmukapriya12.github.io/SmartHostel](https://Shanmukapriya12.github.io/SmartHostel)\n\n`;

  return md;
}

const summaryFile = process.env.GITHUB_STEP_SUMMARY;
if (summaryFile) {
  generateMarkdown().then(mdContent => {
    fs.writeFileSync(summaryFile, mdContent, 'utf8');
    console.log('Successfully wrote to $GITHUB_STEP_SUMMARY');
  }).catch(err => {
    console.error('Error writing to GITHUB_STEP_SUMMARY:', err);
  });
} else {
  console.log('GITHUB_STEP_SUMMARY environment variable not set. Summary markdown:');
  generateMarkdown().then(md => console.log(md)).catch(err => console.error(err));
}
