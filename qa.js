const puppeteer = require('puppeteer');
const supportAdminDashboardPage = require('./pages/nemoSupportAdminDashboard.js');
const {argv} = require('yargs');

(async () => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized']});

    const page = await browser.newPage();
    await page.goto("https://qa.cambridgeone.org/?p=@cambridge.org&t=saml", {waitUntil: 'networkidle2'});
    const newPagePromise = new Promise(x => page.once('popup', x));
    const popup = await newPagePromise;
    await popup.waitForSelector(supportAdminDashboardPage.elements.login_input.selector);     
    await popup.type(supportAdminDashboardPage.elements.login_input.selector,'mmehta');
    await popup.type(supportAdminDashboardPage.elements.login_password.selector,'4LSCudaypark#2');
    await popup.click(supportAdminDashboardPage.elements.signin_submit.selector);
    await popup.waitForSelector(supportAdminDashboardPage.elements.s_question.selector);
    await popup.type(supportAdminDashboardPage.elements.s_question.selector,'bhiwani');
    await popup.click(supportAdminDashboardPage.elements.verify_btn.selector);
    await page.waitForSelector(supportAdminDashboardPage.elements.search.selector);
    await page.goto('https://qa.cambridgeone.org/support-admin/dashboard?q=' + argv.email + '&group=user')
    await page.waitForSelector(supportAdminDashboardPage.elements.action_dropdown.selector)
    await page.click(supportAdminDashboardPage.elements.action_dropdown.selector)
    await page.click(supportAdminDashboardPage.elements.viewDetails_option.selector)
    await page.on('response', async (response) => {    
        if (response.url().includes('/supportadmin/user')){
            console.log(await response.json());
        }
    });
})()