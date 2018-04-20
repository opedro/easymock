app = require('express')();
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain);
app.get('/', function(req, res){
    //if(<parametros que você deseja testar>)
    res.send('oi');
    //else
    //quando nao retornar os parametros que vc deseja testar
});


app.listen(80, function(){
    console.log('server on');
});