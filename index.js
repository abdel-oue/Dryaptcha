require('dotenv').config();
const puppeteer = require('puppeteer');
const Tesseract = require('tesseract.js');
const fs = require('fs');

const USERNAME1 = process.env.USERNAME1; 
const PASSWORD = process.env.PASSWORD; 

if (!USERNAME1 || !PASSWORD) {
    console.error('❌ Missing USERNAME or PASSWORD in .env');
    process.exit(1);
}

console.log(process.env)
async function loginDGI(retries = 0) {
    try {
        console.log(`\n🕒 Attempt ${retries + 1} to log in...`);

        const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 }); 
        await page.goto('https://enr.tax.gov.ma/enregistrement/login', { waitUntil: 'networkidle2' });

        await page.type('#j_username', USERNAME1);
        await page.type('#j_password', PASSWORD);

        const captchaElement = await page.$('img[src="/enregistrement/captcha"]');
        if (!captchaElement) {
            console.error("❌ CAPTCHA image not found!");
            await browser.close();
            throw new Error("CAPTCHA not found");
        }

        const captchaPath = 'captcha.png';
        await captchaElement.screenshot({ path: captchaPath });

        console.log("✅ CAPTCHA image saved.");

        const { data: { text } } = await Tesseract.recognize(captchaPath, 'eng');
        const captchaText = text.trim();
        
        console.log("🔍 Extracted CAPTCHA:", captchaText);

        await page.type('#captchalabel', captchaText);

        await page.click('button[name="btn_login"]');

        try {
            await page.waitForNavigation({ timeout: 5000 });
            console.log("✅ Login attempt finished.");
        } catch (error) {
            console.log("⚠️ Navigation timeout. Possible incorrect CAPTCHA.");
        }
        const errorMessage = await page.$('.error-message');
        if (errorMessage) {
            console.log("❌ Incorrect CAPTCHA. Retrying in 15 seconds...");
           // await browser.close();
            setTimeout(() => loginDGI(retries + 1), 20000); 
            return;
        }

        console.log("🎉 Successfully logged in!");
        //await browser.close();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        console.log("🔄 Retrying in 20 seconds...");
        setTimeout(() => loginDGI(retries + 1), 20000); 
    }
}
loginDGI();