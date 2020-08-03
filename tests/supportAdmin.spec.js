const {argv} = require('yargs');


describe('Cambridge One APP', function () {
    //Variable Declaration
    let userEmail = 'nrstudent01@cup.org';

    before(function (browser, done) {              
         done();
    });

    it('Support-Admin Login and access dashboard', function (browser) {
        browser
            .url('https://micro-nemo.comprodls.com/login')
            .pause(10000)
            .setValue('input[placeholder="Enter your email address *"]','devanshugupta13@yopmail.com')
            .setValue('input[placeholder="Enter your password *"]','Compro11')
            .waitForXHR('', 20000, function browserTrigger() {
                browser.click('input[value="Log in"]');
            }, function assertValues(xhrs) {
            console.log(xhrs);
            console.log(xhrs.length);
        });

        // browser
        //     .url('https://www.cambridgeone.org?p=@cambridge.org&t=saml')
        //     .pause(10000)
        //     .window_handles(function(result) {
        //     browser.switchWindow(result.value[1]);   
        //     nemoSupportAdminDashboardPageObj = browser.page.nemoSupportAdminDashboard();
        //     //Wait for okta login
        //     nemoSupportAdminDashboardPageObj.waitForOktalogin();
        // });
        
        // browser.window_handles(function(result) {
        //     browser.switchWindow(result.value[0]);
        // })
        // browser
        //     .url('https://www.cambridgeone.org/support-admin/dashboard?q=' + argv.email + '&group=user')
        //     .pause(3000)
        //     .click('[qid="sa-usr-11-1"]')
        //     .click('[qid=sa-usr-11-2]')
        //     .waitForXHR('', 20000, function browserTrigger() {
        //         // browser.pause(10000);
        //     }, function assertValues(xhrs) {
        //     console.log(xhrs);
        //     console.log(xhrs.length);
        // });

        // browser
        //     .url('https://www.cambridgeone.org/support-admin/dashboard?q=' + argv.email + '&group=user')
        //     .waitForFirstXHR('', 20000, function browserTrigger() {
        //         browser.pause(3000)
        //         browser.click('[qid="sa-usr-11-1"]');
        //         browser.click('[qid=sa-usr-11-2]');
        //         browser.pause(10000);
        //     }, function assertValues(xhrs) {
        //     console.log(xhrs);
        //     console.log(xhrs.length);
        // });

        // browser
        // .url('https://www.cambridgeone.org/support-admin/dashboard?q=nrstudent01@cup.org&group=user')
        // .pause(10000)
        // .listenXHR()
        // .click('[qid="sa-usr-11-1"]')
        // .click('[qid=sa-usr-11-2]')
        // .pause(1000)
        // .getXHR('',30000, function assertValues(xhrs) {
        //     console.log(xhrs);
        // })
// }); 

    }); 

    // after(function (browser, done) {
    //     //close browser
    //     if (browser.sessionId) {
    //         browser.end(function () {
    //             done();
    //         });
    //     } else {
    //         done();
    //     }
    // });
});
