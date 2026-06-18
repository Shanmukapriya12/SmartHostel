const fs = require('fs');
const path = require('path');

const WEBSUITE_DIR = path.join(__dirname, '..', 'web_selenium');
const MOBILESUP_DIR = path.join(__dirname, '..', 'mobile_appium');

function getResults() {
  let webResults = [];
  const webPath = path.join(WEBSUITE_DIR, 'web_results.json');
  if (fs.existsSync(webPath)) {
    webResults = JSON.parse(fs.readFileSync(webPath, 'utf8'));
  }

  let mobileResults = [];
  const mobilePath = path.join(MOBILESUP_DIR, 'mobile_results.json');
  if (fs.existsSync(mobilePath)) {
    mobileResults = JSON.parse(fs.readFileSync(mobilePath, 'utf8'));
  }

  return { webResults, mobileResults };
}

function generateMarkdown() {
  const { webResults, mobileResults } = getResults();
  const allResults = [...webResults, ...mobileResults];
  const total = allResults.length;
  const passed = allResults.filter(r => r.status === 'PASS').length;
  const failed = allResults.filter(r => r.status === 'FAIL').length;
  const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : '0';

  let md = `## 🏨 Smart Hostel E2E QA Test Summary\n\n`;
  md += `| Suite | Total Cases | Passed | Failed | Pass Rate |\n`;
  md += `| :--- | :---: | :---: | :---: | :---: |\n`;
  md += `| 🌐 Web Selenium | ${webResults.length} | ${webResults.filter(r => r.status === 'PASS').length} | ${webResults.filter(r => r.status === 'FAIL').length} | ${webResults.length > 0 ? ((webResults.filter(r => r.status === 'PASS').length / webResults.length) * 100).toFixed(1) + '%' : '0%'} |\n`;
  md += `| 📱 Mobile Appium | ${mobileResults.length} | ${mobileResults.filter(r => r.status === 'PASS').length} | ${mobileResults.filter(r => r.status === 'FAIL').length} | ${mobileResults.length > 0 ? ((mobileResults.filter(r => r.status === 'PASS').length / mobileResults.length) * 100).toFixed(1) + '%' : '0%'} |\n`;
  md += `| **Total** | **${total}** | **${passed}** | **${failed}** | **${passRate}%** |\n\n`;

  if (failed > 0) {
    md += `### ❌ Failed Test Cases\n\n`;
    md += `| ID | Suite | Module | Test Case Name | Failure Remarks |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- |\n`;
    allResults.filter(r => r.status === 'FAIL').forEach(r => {
      const suite = r.id.includes('mobile') || r.module.includes('Mobile') ? '📱 Mobile' : '🌐 Web';
      md += `| **${r.id}** | ${suite} | ${r.module} | ${r.testName} | \`${r.remarks}\` |\n`;
    });
    md += `\n`;
  } else {
    md += `### 🎉 All test cases passed successfully!\n\n`;
  }

  md += `### 🌐 Web E2E Test Cases (${webResults.length} cases)\n`;
  md += `<details>\n<summary>Click to expand/collapse Web test list</summary>\n\n`;
  md += `| ID | Module | Category | Test Case Name | Status | Duration |\n`;
  md += `| :--- | :--- | :--- | :--- | :---: | :---: |\n`;
  webResults.forEach(r => {
    const statusIcon = r.status === 'PASS' ? '🟢 PASS' : '🔴 FAIL';
    md += `| ${r.id} | ${r.module} | ${r.category} | ${r.testName} | ${statusIcon} | ${r.duration}s |\n`;
  });
  md += `\n</details>\n\n`;

  md += `### 📱 Mobile Appium Test Cases (${mobileResults.length} cases)\n`;
  md += `<details>\n<summary>Click to expand/collapse Mobile test list</summary>\n\n`;
  md += `| ID | Module | Category | Test Case Name | Status | Duration |\n`;
  md += `| :--- | :--- | :--- | :--- | :---: | :---: |\n`;
  mobileResults.forEach(r => {
    const statusIcon = r.status === 'PASS' ? '🟢 PASS' : '🔴 FAIL';
    md += `| ${r.id} | ${r.module} | ${r.category} | ${r.testName} | ${statusIcon} | ${r.duration}s |\n`;
  });
  md += `\n</details>\n\n`;

  return md;
}

const summaryFile = process.env.GITHUB_STEP_SUMMARY;
if (summaryFile) {
  const mdContent = generateMarkdown();
  fs.writeFileSync(summaryFile, mdContent, 'utf8');
  console.log('Successfully wrote to $GITHUB_STEP_SUMMARY');
} else {
  console.log('GITHUB_STEP_SUMMARY environment variable not set. Summary markdown:');
  console.log(generateMarkdown());
}
