# Dryaptcha – Automated Login with CAPTCHA Solver  

**Dryaptcha** is a lightweight and efficient script designed to automate login processes involving CAPTCHA challenges. It combines **Puppeteer** for web automation and **Tesseract.js** for Optical Character Recognition (OCR) to extract text from CAPTCHA images. The script handles everything — from entering credentials to solving CAPTCHAs and retrying if necessary — making the process seamless and fast.  

## Key Features:  
- 🏗️ **Web Automation:** Uses Puppeteer to navigate websites and handle login forms.  
- 🔍 **CAPTCHA Solving:** Extracts text from CAPTCHA images with Tesseract.js, reducing manual input.  
- 🔄 **Retry Mechanism:** Automatically retries on incorrect CAPTCHA inputs or errors.  
- 🔐 **Environment Variables:** Keeps credentials secure by loading them from a `.env` file.  

## How It Works:  
1. 📥 **Load Credentials:** The script reads the username and password from the `.env` file.  
2. 🌐 **Launch Browser:** Puppeteer opens a browser and navigates to the login page.  
3. 📸 **Capture CAPTCHA:** The script locates the CAPTCHA image and saves it locally.  
4. 🧠 **Extract Text:** Tesseract.js reads the CAPTCHA image and extracts the text.  
5. 🔑 **Submit Form:** The extracted CAPTCHA, username, and password are entered into the form.  
6. 📊 **Handle Errors:** If the CAPTCHA is incorrect, the script retries automatically after a short delay.  

## Setup Instructions:  
1. Install the required dependencies:  
    ```bash
    npm install puppeteer tesseract.js dotenv
    ```  
2. Create a `.env` file with the following content:  
    ```plaintext
    USERNAME1=your_username
    PASSWORD=your_password
    ```  
3. Run the script:  
    ```bash
    node index.js
    ```  

## Customizing the Script for a Different Website  
If you want to use this script to automate login on a different website, follow these steps:

1. **Change the Website URL:**
   In the script, find the line that specifies the URL of the website:

   ```javascript
   await page.goto('https://example.com/login', { waitUntil: 'networkidle2' });
   ```

   Replace the URL 'https://example.com/login' with the login URL of the website you want to automate.

2. **Update the CAPTCHA Image Selector:**
   The script looks for a CAPTCHA image using this selector:
   ```javascript
   const captchaElement = await page.$('img[src="/enregistrement/captcha"]');
   ```
   Inspect the website and find the correct CSS selector for the CAPTCHA image. Update the selector to match the website you're automating. For example, if the CAPTCHA image has the ID 'captcha_image', you would change the selector like this:
   ```javascript
   const captchaElement = await page.$('#captcha_image');
   ```
3. **Update the CAPTCHA Input Field Selector:**
   The script uses this selector to input the extracted CAPTCHA text:
   ```javascript
   await page.type('#captchalabel', captchaText);
   ```
   Replace '#captchalabel' with the correct selector for the CAPTCHA input field on your target website.
4. **Update the Login Button Selector:**
   The script clicks the login button using the following selector:
   ```javascript
   await page.click('button[name="btn_login"]');
   ```
   Inspect the website to find the appropriate selector for the login button and update it in the script. For example, if the login button has the class 'submit-btn', you would change it to:
   ```javascript
   await page.click('.submit-btn');
   ```
5. **Handling Error Messages:**
   The script checks for an error message if the CAPTCHA is incorrect:
   ```javascript
   const errorMessage = await page.$('.error-message');
   ```
   Update the selector '.error-message' to match the error message element on the website you're automating.


## Notes:  
- Ensure Node.js is installed before running the script.  
- The script includes automatic retries if the CAPTCHA is incorrect.  
- The CAPTCHA recognition is not 100% accurate. Some errors may occur depending on the complexity and quality of the CAPTCHA. It's important to verify the results.

## Disclaimer

This script is **for educational purposes only**. It is intended to demonstrate web automation and CAPTCHA solving techniques using **Puppeteer** and **Tesseract.js**. By using this script, you agree to not use it for malicious activities or unauthorized access to websites.

Please ensure you have **explicit permission** from the website owner or administrator before using this script on any website. **Misuse of this script may be illegal** depending on your jurisdiction.

Use responsibly!

Made by **Dryal**.