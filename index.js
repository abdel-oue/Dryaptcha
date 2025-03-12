// This program automates the login process for the DGI website.
// It reads a CAPTCHA image, uses OCR to extract the text, and inputs the login and password automatically.
// Made by Dryal

require('dotenv').config(); // Loads environment variables from .env file
const puppeteer = require('puppeteer'); // For web automation
const Tesseract = require('tesseract.js'); // For OCR to read CAPTCHA
const fs = require('fs'); // File system module to handle files

// Load username and password from .env file
const USERNAME1 = process.env.USERNAME1; 
const PASSWORD = process.env.PASSWORD; 

// Check if USERNAME and PASSWORD are loaded correctly
if (!USERNAME1 || !PASSWORD) {
    console.error('❌ Missing USERNAME or PASSWORD in .env');
    process.exit(1); // Stop the script if credentials are missing
}
// Function to handle login to DGI with retry mechanism
async function loginDGI(retries = 0) {
    try {
        console.log(`\n🕒 Attempt ${retries + 1} to log in...`);

        // Launch Puppeteer browser instance (headless false to see browser actions)
        const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 }); // Set screen size for consistency

        // Go to DGI login page
        await page.goto('https://enr.tax.gov.ma/enregistrement/login', { waitUntil: 'networkidle2' });

        // Enter username and password in the respective fields
        await page.type('#j_username', USERNAME1);
        await page.type('#j_password', PASSWORD);

        // Find CAPTCHA image on the page
        const captchaElement = await page.$('img[src="/enregistrement/captcha"]');
        if (!captchaElement) {
            console.error("❌ CAPTCHA image not found!");
            await browser.close();
            throw new Error("CAPTCHA not found");
        }

        // Take a screenshot of the CAPTCHA image and save it locally
        const captchaPath = 'captcha.png';
        await captchaElement.screenshot({ path: captchaPath });
        console.log("✅ CAPTCHA image saved.");

        // Use Tesseract OCR to extract text from the saved CAPTCHA image
        const { data: { text } } = await Tesseract.recognize(captchaPath, 'eng');
        const captchaText = text.trim(); // Remove extra spaces
        console.log("🔍 Extracted CAPTCHA:", captchaText);

        // Enter the extracted CAPTCHA text into the appropriate input field
        await page.type('#captchalabel', captchaText);

        // Click the login button
        await page.click('button[name="btn_login"]');

        // Wait for navigation to complete after login (5s timeout)
        try {
            await page.waitForNavigation({ timeout: 5000 });
            console.log("✅ Login attempt finished.");
        } catch (error) {
            console.log("⚠️ Navigation timeout. Possible incorrect CAPTCHA.");
        }

        // Check for error message on incorrect CAPTCHA
        const errorMessage = await page.$('.error-message');
        if (errorMessage) {
            console.log("❌ Incorrect CAPTCHA. Retrying in 15 seconds...");
            // Don't close browser to avoid reopening each time
            setTimeout(() => loginDGI(retries + 1), 20000); 
            return;
        }

        console.log("🎉 Successfully logged in!");
        // Optionally close the browser after successful login
        // await browser.close();

    } catch (error) {
        // Handle unexpected errors and retry
        console.error(`❌ Error: ${error.message}`);
        console.log("🔄 Retrying in 20 seconds...");
        setTimeout(() => loginDGI(retries + 1), 20000); 
    }
}

// Start the login process
loginDGI();

// Made by Dryal
