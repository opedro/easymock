app.get('/ex2', 
                function(req, res){
                    if(Math.floor((Math.random() * 100) + 1) >10){
                        res.json({'errorCode': '0', 'produtos': [{'nome': 'coca', 'preco': '10'}]})
                    }else{
                        res.json({'errorCode': '1', 'errorMessage': 'exemplo'})
                    }
                });app.get('/ex1', 
                function(req, res){
                    if(Math.floor((Math.random() * 100) + 1) >20){
                        res.json({'errorCode': '0', 'amigos': [{'nome': 'Macito', 'idade': '22'}]})
                    }else{
                        res.json({'errorCode': '1', 'errorMessage': 'exemplo'})
                    }
                });