const puppeteer = require('puppeteer');
const supportAdminDashboardPage = require('../pages/nemoSupportAdminDashboard.js');

module.exports = async function(page, env) {

    await page.waitForSelector(supportAdminDashboardPage.elements.login_input.selector);     
    await page.type(supportAdminDashboardPage.elements.login_input.selector,env.username);
    await page.type(supportAdminDashboardPage.elements.login_password.selector,env.password);
    await page.click(supportAdminDashboardPage.elements.signin_submit.selector);
    await page.waitForSelector(supportAdminDashboardPage.elements.s_question.selector);
    await page.type(supportAdminDashboardPage.elements.s_question.selector,env.securityAnswer);
    await page.click(supportAdminDashboardPage.elements.verify_btn.selector);

};