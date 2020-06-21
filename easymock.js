app = require('express')();
bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())



fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Content-Type', 'Application/JSON');
    
    next();
}


app.use(allowCrossDomain);

const mocksDir = './mocks/';

app.get('/esmgenerate', function (req, res) {
    generate();
});




rl.question('which port do you want to easymock serve?(80) ', (port) => {
    generate();
    app.listen(port || 80, function () {
        console.log('server on at port: ', port || 80);
    });
    rl.close();
});

function generate() {
    var configs;
    fs.writeFile('./mockserver/mock.js', '', (err) => {
        if (err) throw err;
    });

    fs.readdir(mocksDir, (err, files) => {
        var loadeds = "";
        files.forEach(file => {
            fs.readFile(mocksDir + '/' + file, 'utf8', function (err, content) {
                console.log('Loading ', file.substring(0, file.length - 4), '...');

                configs = JSON.parse(content);

                var hasParams = configs.parameters ? true : false;
                if (hasParams == true) configs.params = configs.parameters;
                var parametersCheck = '', arrayParameters;
                arrayParameters = hasParams == true ? configs.params.map(function (param) { 
                    return 'req.body.' + param.name + ' != \"' + param.expect + '\"?fails++:fails+=0;' 
                }) : "";

                for (i = 0; i < arrayParameters.length; i++) {
                    if (i == 0){
                        parametersCheck += "console.log(req.body); if(req.body){";
                    }
                    parametersCheck += arrayParameters[i];
                    if (i == arrayParameters.length-1) {
                        parametersCheck += "}else{fails=1; console.log('None parameters received')}";
                    }
                }
                var mockServer = "app." + configs.method + "('/" + file.substring(0, file.length - 4) + "', \n\
                function(req, res){\n\
                    var fails = 0;\n\
                    "+ parametersCheck  + "\n\
                    if(Math.floor((Math.random() * 100) + 1) >"+ configs.failChance + " && fails == 0){\n\
                        res.json("+ configs.success + ")\n\
                    }else{\n\
                        console.log(fails)\n\
                        res.json("+ configs.fail + ")\n\
                    }\n\
                });"


                loadeds += '\n\"' + file.substring(0, file.length - 4) + '"'

                fs.appendFile('./mockserver/mock.js', mockServer, function (err, content) {
                    i++;
                    if (i == files.length) {
                        require('./mockserver/mock.js');
                        console.log('==========================MOCKSERVER UP!=================================');
                        console.log('Created: ', loadeds);
                    }
                });
            });
        });
    })
}