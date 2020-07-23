global.currentDirPath = process.cwd();

var json = require('json-file');
var fs = require('fs');
module.exports = {
    
abortOnAssertionFailure : false,

    before: function(done) {
    	
    	var date = String(new Date().getDate());
        if (date.length == 1) {
            date = "0" + date;
        }

        var month = String(new Date().getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
    	
    	 dirName = __dirname;
         var tempPath = String("./temp/")

         if (!(fs.existsSync(tempPath))) {
            
                fs.mkdirSync(tempPath);
         }
        
        const argv = require('yargs').argv
        if (!argv.testEnv) {
            argv.testEnv = "qa"
        }

        global.argv = argv
        
        process.env.MOCHAWESOME_REPORTDIR = "output/reports/" + date + "-" + month + "-" + new Date().getFullYear() + "/LeonardoPaint_Reports/";
        process.env.MOCHAWESOME_REPORTFILENAME = "Leonardo Paint Test Result";
        
        
        done();
    }
};

