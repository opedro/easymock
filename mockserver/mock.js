app.get('/ex2', 
                function(req, res){
                    var fails = 0;
                    
                    if(Math.floor((Math.random() * 100) + 1) >10 && fails == 0){
                        res.json({'errorCode': '0', 'produtos': [{'nome': 'coca', 'preco': '10'}]})
                    }else{
                        console.log(fails)
                        res.json({'errorCode': '1', 'errorMessage': 'exemplo'})
                    }
                });app.get('/ex1', 
                function(req, res){
                    var fails = 0;
                    
                    if(Math.floor((Math.random() * 100) + 1) >20 && fails == 0){
                        res.json({'errorCode': '0', 'amigos': [{'nome': 'Macito', 'idade': '22'}]})
                    }else{
                        console.log(fails)
                        res.json({'errorCode': '1', 'errorMessage': 'exemplo'})
                    }
                });app.post('/ex3', 
                function(req, res){
                    var fails = 0;
                    console.log(req.body); if(req.body){req.body.login != "correto"?fails++:fails+=0;req.body.password != "12345678"?fails++:fails+=0;}else{fails=1; console.log('None parameters received')}
                    if(Math.floor((Math.random() * 100) + 1) >10 && fails == 0){
                        res.json({'errorCode': '0', 'produtos': [{'nome': 'coca', 'preco': '10'}]})
                    }else{
                        console.log(fails)
                        res.json({'errorCode': '1', 'errorMessage': 'exemplo'})
                    }
                });