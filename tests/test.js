const puppeteer = require('puppeteer');
const promoteToAdmin = require('../utils/promoteAdmin.js');
const login = require('../utils/login');
const {argv} = require('yargs');
const supportAdminDashboardPage = require('../pages/nemoSupportAdminDashboard.js');
const fs = require('fs');

(async () => {

    const env = JSON.parse(fs.readFileSync('./env.json'))[argv.env];

    const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized']});

    const page = await browser.newPage();
    await page.goto(env.supportAdminURL, {waitUntil: 'networkidle2'});
    const newPagePromise = new Promise(x => page.once('popup', x));
    const popup = await newPagePromise;
    
    await login(popup, env)
    await page.waitForSelector(supportAdminDashboardPage.elements.search.selector);
    await eval(argv.runType)(browser, page, env);

})()