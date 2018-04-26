app = require('express')();
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

    next();
}

app.use(allowCrossDomain);


const mocksDir = './mocks/';

app.get('/esmgenerate', function (req, res) {
    generate();
});




rl.question('which port do you want to easymock serve?(80) ', (port) => {
    // TODO: Log the answer in a database
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
        console.log('The server was created!');
    });

    fs.readdir(mocksDir, (err, files) => {
        var i = 1;
        var loadeds = "";
        files.forEach(file => {
            fs.readFile(mocksDir + '/' + file, 'utf8', function (err, content) {
                configs = JSON.parse(content);

                var mockServer = "app." + configs.method + "('/" + file.substring(0, file.length - 4) + "', \n\
                function(req, res){\n\
                    if(Math.floor((Math.random() * 100) + 1) >"+ configs.failChance + "){\n\
                        res.json("+ configs.success + ")\n\
                    }else{\n\
                        res.json("+ configs.fail + ")\n\
                    }\n\
                });"

                console.log('Loading ', file.substring(0, file.length - 4), '...');
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