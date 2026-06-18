const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const fs = require('fs');

async function debug() {
  console.log('Initializing driver...');
  const opts = new chrome.Options();
  opts.addArguments('--headless=new', '--no-sandbox', '--disable-gpu');
  
  const builder = new Builder().forBrowser('chrome').setChromeOptions(opts);
  
  const localChromedriverWin = path.join(__dirname, '..', '..', 'node_modules', 'chromedriver', 'lib', 'chromedriver', 'chromedriver.exe');
  if (process.platform === 'win32' && fs.existsSync(localChromedriverWin)) {
    console.log(`Found local chromedriver executable: ${localChromedriverWin}`);
    const service = new chrome.ServiceBuilder(localChromedriverWin);
    builder.setChromeService(service);
  }

  const driver = await builder.build();

  try {
    console.log('1. Logging in as admin...');
    await driver.get('http://localhost:8000/admin_login.php');
    await driver.findElement(By.name('email')).sendKeys('admin@gmail.com');
    await driver.findElement(By.name('password')).sendKeys('admin123');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(1500);

    console.log('2. Going to admin_dashboard.php...');
    await driver.get('http://localhost:8000/admin_dashboard.php');
    await driver.sleep(1000);
    
    console.log('3. Finding student overview card...');
    const card = await driver.findElement(By.css('a[href="student_overview.php"]'));
    
    console.log('4. Clicking card...');
    try {
      await card.click();
    } catch (e) {
      console.log('Standard click failed, attempting JS click. Error:', e.message);
      await driver.executeScript("arguments[0].click();", card);
    }
    
    await driver.sleep(2000);
    
    console.log('Current URL after click:', await driver.getCurrentUrl());
  } catch (err) {
    console.error('Error during debugging:', err);
  } finally {
    await driver.quit();
  }
}

debug();
