app = require('express')();

app.get('/', function(req, res){
    //if(<parametros que você deseja testar>)
    res.send('oi');
    //else
    //quando nao retornar os parametros que vc deseja testar
});


app.listen(80, function(){
    console.log('server on');
});