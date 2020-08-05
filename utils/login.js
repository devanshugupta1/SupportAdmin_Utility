const puppeteer = require('puppeteer');
const supportAdminDashboardPage = require('../pages/nemoSupportAdminDashboard.js');

module.exports = async function(page) {

    await page.waitForSelector(supportAdminDashboardPage.elements.login_input.selector);     
    await page.type(supportAdminDashboardPage.elements.login_input.selector,process.env.CAMBRIDGE_UNAME);
    await page.type(supportAdminDashboardPage.elements.login_password.selector,process.env.CAMBRIDGE_PASSWORD);
    await page.click(supportAdminDashboardPage.elements.signin_submit.selector);
    await page.waitForSelector(supportAdminDashboardPage.elements.s_question.selector);
    await page.type(supportAdminDashboardPage.elements.s_question.selector,process.env.CAMBRIDGE_SECURITY_ANSWER);
    await page.click(supportAdminDashboardPage.elements.verify_btn.selector);

};