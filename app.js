app = require('express')();
fs = require('fs');

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

const mocksDir = './mocks/';

app.get('/', function (req, res) {
    var mockBase = "app = require('express')();var allowCrossDomain = function(req, res, next) {\n\
        res.header('Access-Control-Allow-Origin', '*');\n\
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');\n\
        res.header('Access-Control-Allow-Headers', 'Content-Type');\n\
        next();\n\
    }; app.use(allowCrossDomain);"

    var configs;
    fs.writeFile('./mockserver/mock.js', '', (err) => {
        if (err) throw err;
        console.log('The server was created!');
    });
    
    fs.readdir(mocksDir, (err, files) => {
        var i = 1;
        var loadeds="";
        files.forEach(file => {
            fs.readFile(mocksDir + '/' + file, 'utf8', function (err, content) {
                configs = JSON.parse(content);

                var mockServer = "app." + configs.method + "('/" + file.substring(0, file.length - 4) + "', \n\
                function(req, res){\n\
                    if(Math.floor((Math.random() * 100) + 1) >"+configs.failChance+"){\n\
                        res.json("+ configs.success + ")\n\
                    }else{\n\
                        res.json("+ configs.success + ")\n\
                    }\n\
                });"
                
            console.log('Creating ', file.substring(0, file.length - 4), '...');
            loadeds+='"'+file.substring(0, file.length - 4)+'"'
   
                fs.appendFile('./mockserver/mock.js', mockServer, function (err, content) {
                    console.log(i++, 'mocks loadeds of ', files.length );
                    if(i == files.length){
                        require('./mockserver/mock.js');
                        console.log('MOCKSERVER UP!');
                        res.json({'created':loadeds});
                    }
                });
            });
        });
    })
});


app.listen(80, function () {
    console.log('server on');
});