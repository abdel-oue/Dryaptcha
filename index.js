
const puppeteer = require('puppeteer');

async function getPageContent() {

    const browser = await puppeteer.launch({
        headless: 'new',
        args : [
            '--no-sandbox'
          ]
    });

    const page = (await browser.pages())[0];

    await page.goto('https://google.com/');

    const extractedText = await page.$eval('*', (el) => el.innerText);
    
    console.log(extractedText);

    await browser.close();

};
getPageContent();