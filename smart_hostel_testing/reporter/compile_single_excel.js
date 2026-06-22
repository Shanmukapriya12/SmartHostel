/**
 * ============================================================
 *  Single Excel Report Compiler
 *  Smart Hostel Management System
 * ============================================================
 */

const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

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

async function main() {
  const args = process.argv.slice(2);
  const jsonPath = args[0];
  const xlsxPath = args[1];
  const suiteLabel = args[2];

  if (!jsonPath || !xlsxPath || !suiteLabel) {
    console.error('Usage: node compile_single_excel.js <json_path> <xlsx_path> <suite_label>');
    process.exit(1);
  }

  const resolvedJson = path.isAbsolute(jsonPath) ? jsonPath : path.resolve(jsonPath);
  const resolvedXlsx = path.isAbsolute(xlsxPath) ? xlsxPath : path.resolve(xlsxPath);

  console.log(`Reading JSON results: ${resolvedJson}`);
  if (!fs.existsSync(resolvedJson)) {
    console.error(`Error: File does not exist at ${resolvedJson}`);
    process.exit(1);
  }

  const rawData = JSON.parse(fs.readFileSync(resolvedJson, 'utf8'));

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Test Cases');
  sheet.views = [{ showGridLines: true }];

  // Column definitions matching the screenshot
  sheet.columns = [
    { key: 'spacer',    header: '',             width: 3 },
    { key: 'suite',     header: 'Test Suite',   width: 22 },
    { key: 'category',  header: 'Category',     width: 16 },
    { key: 'testCase',  header: 'Test Case',    width: 65 },
    { key: 'status',    header: 'Status',       width: 12 },
    { key: 'error',     header: 'Error Detail', width: 30 },
    { key: 'timestamp', header: 'Timestamp',    width: 24 }
  ];

  // Header row formatting
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

  const timestampVal = getTimestampString();

  rawData.forEach((r, idx) => {
    const isPass = r.status === 'PASS';
    const rowNum = idx + 2;
    const row = sheet.getRow(rowNum);
    row.height = 20;

    row.getCell(2).value = suiteLabel; // B: Test Suite
    row.getCell(3).value = r.category;               // C: Category
    row.getCell(4).value = `${r.id}: ${r.testName}`; // D: Test Case
    row.getCell(5).value = r.status;                 // E: Status
    row.getCell(6).value = isPass ? '' : (r.remarks || r.errorDetails || 'Failed'); // F: Error Detail
    row.getCell(7).value = timestampVal;             // G: Timestamp

    row.eachCell((cell, colNum) => {
      if (colNum === 1) return;
      cell.font = { name: 'Segoe UI', size: 10, color: { argb: '111827' } };
      cell.border = {
        top: { style: 'thin', color: { argb: 'E5E7EB' } },
        bottom: { style: 'thin', color: { argb: 'E5E7EB' } },
        left: { style: 'thin', color: { argb: 'E5E7EB' } },
        right: { style: 'thin', color: { argb: 'E5E7EB' } }
      };

      if (colNum === 5) {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      } else {
        cell.alignment = { horizontal: 'left', vertical: 'middle' };
      }
    });

    const statusCell = row.getCell(5);
    statusCell.font = { name: 'Segoe UI', bold: true, size: 10, color: { argb: 'FFFFFF' } };
    statusCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: isPass ? '10B981' : 'EF4444' }
    };
  });

  // ------------------------------------------------------------
  //  SHEET 2 - RawData (Hidden, holds source test results JSON)
  // ------------------------------------------------------------
  const rawSheet = workbook.addWorksheet('RawData');
  rawSheet.state = 'hidden';
  rawSheet.columns = [
    { key: 'id', header: 'ID' },
    { key: 'module', header: 'Module' },
    { key: 'category', header: 'Category' },
    { key: 'testName', header: 'Test Name' },
    { key: 'priority', header: 'Priority' },
    { key: 'status', header: 'Status' },
    { key: 'duration', header: 'Duration' },
    { key: 'remarks', header: 'Remarks' },
    { key: 'errorDetails', header: 'Error Details' },
    { key: 'screenshot', header: 'Screenshot' }
  ];

  rawData.forEach(r => {
    rawSheet.addRow({
      id: r.id,
      module: r.module,
      category: r.category,
      testName: r.testName,
      priority: r.priority,
      status: r.status,
      duration: Number(r.duration) || 0,
      remarks: r.remarks || '',
      errorDetails: r.errorDetails || '',
      screenshot: r.screenshot || ''
    });
  });

  // Ensure output directory exists
  const dir = path.dirname(resolvedXlsx);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  await workbook.xlsx.writeFile(resolvedXlsx);
  console.log(`Successfully generated single Excel report: ${resolvedXlsx}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
