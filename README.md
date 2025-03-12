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
    node script.js
    ```  

## Notes:  
- Ensure Node.js is installed before running the script.  
- The script includes automatic retries if the CAPTCHA is incorrect.  

Made with **Dryal**. 🚀  

