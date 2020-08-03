const supportAdminDashboardPage = require('../pages/nemoSupportAdminDashboard.js');
const {argv} = require('yargs');

module.exports = async function(browser, page, env){
    //currently hard-coding for only one school result.

    //steps:
    // 1. search for school
    // 2. get org id
    // 3. match this org id with all orgs present in the user info
    // 4. if not match found - > scenario 1 (a teacher but not joined any school)
    //     else: scenario 2 (joined school as a teacher)

    //searching for school (for extracting school org id)
    let schoolPageSearchURL = env.supportAdminDashboardURL + '?q=' + encodeURI(argv.schoolName) + '&group=school';
    await page.goto(schoolPageSearchURL);
    await page.waitForSelector(supportAdminDashboardPage.elements.firstSearchResult.selector);
    await page.click(supportAdminDashboardPage.elements.firstSearchResult.selector);

    //new tab handling (school page)
    const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
    const schoolPageTab = await newPagePromise;
    let schoolURL = schoolPageTab.url();
    await schoolPageTab.close();

    const orgID = schoolURL.slice(schoolURL.search('org_') + 4, schoolURL.search('/class'));

    await page.waitForSelector(supportAdminDashboardPage.elements.search.selector);
    await page.goto(env.supportAdminDashboardURL + '?q=' + argv.email + '&group=user');
    await page.waitForSelector(supportAdminDashboardPage.elements.action_dropdown.selector);
    await page.click(supportAdminDashboardPage.elements.action_dropdown.selector);
    await page.click(supportAdminDashboardPage.elements.viewDetails_option.selector);

    await page.on('response', async (response) => {    
        if (response.url().includes(supportAdminDashboardPage.elements.supportAdminRequestURL.selector)){
            let userJSON = await response.json();
            let arrayOrgs = userJSON.entities.map(a => a.dls_org_id);
    
            if(arrayOrgs.indexOf(orgID) != -1) {

                console.log("The user has already joined the school as a teacher.");
                //req info: dls_org_id, dls_teacher_id, ext_user_id

                let requiredInfo = {
                    "dls_org_id": orgID,
                    "dls_teacher_id" : userJSON.entities[arrayOrgs.indexOf(orgID)].dls_teacher_id,
                    "ext_user_id": userJSON.userDetails.uid
                }
                console.log(requiredInfo);
            }
            else {
                console.log("The user is a teacher but has not joined in the school.");

                //extract first name
                const firstNameElement = await page.$(supportAdminDashboardPage.elements.firstName.selector);
                const firstName = await page.evaluate(element => element.textContent, firstNameElement);

                //extract last name
                const [lastNameElement] = await page.$x(supportAdminDashboardPage.elements.lastName.selector);
                const lastName = await page.evaluate(element => element.textContent, lastNameElement);
                
                let requiredInfo = {

                    "users" : [
                        {
                            "ext_email": argv.email,
                            "ext_first_name": firstName,
                            "ext_last_name": lastName,
                            "ext_user_id":userJSON.userDetails.uid,
                            "ext_role": "admin",
                            "space_title": argv.schoolName
                        }
                    ],
                    "orgid": orgID
                }
                console.log(requiredInfo);
            }
        }
    });

    await page.waitFor(2000);
    await browser.close();

};