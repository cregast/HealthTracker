const SHEET_ID = '1UJxAmNGpHcLYxTVcEdVv5Amvd0NKAAp8Bm45kVirwoc';
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss    = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    // Auto-create headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Date', 'BP Systolic', 'BP Diastolic', 'Heart Rate', 'Weight (lbs)']);
    }

    const date = new Date(data.date);
    const dateStr = Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');

    const n = v => (v === null || v === undefined || v === '') ? '' : Number(v);

    sheet.appendRow([
      dateStr,
      n(data.sys),
      n(data.dia),
      n(data.hr),
      n(data.weight),
    ]);

    return ContentService
      .createTextOutput('OK')
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (err) {
    return ContentService
      .createTextOutput('ERROR: ' + err.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Vitals endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}