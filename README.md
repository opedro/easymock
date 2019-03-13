# easymock

An easy way to mock an api using node 

## Getting Started


```
git clone https://github.com/opedro/easymock.git
npm install
node easymock.js
```

### Prerequisites

You only need Node js to run Easymock


## How to use

The project gives you a folder called "mocks", in it you'll find examples of mocks that you can edit as you wish.
Every "*.esm" file on the "mocks" folder will be read and each one of them will become an interface on your host.

Example:
ex1.esm
```
{
    "method": "get",
    "success":"{'errorCode': '0', 'amigos': [{'nome': 'Macito', 'idade': '22'}]}",
    "fail": "{'errorCode': '1', 'errorMessage': 'exemplo'}",
    "failChance": "20"
}
```
This esm file will provide a server on locahost/ex1 with "{'errorCode': '0', 'amigos': [{'nome': 'Pavanelli', 'idade': '23'}]}" as the response 80% of the time (based on the "failChance" parameter). 
20% of times the response will be "{'errorCode': '1', 'errorMessage': 'exemplo'}", of course.

ex3.esm
```
{
    "method": "post",
    "parameters": [{"name": "login", "expect": "correto"},
                    {"name": "password", "expect": "12345678"}
                ],
    "success":"{'errorCode': '0', 'perfil': [{'nome': 'Jonas', 'token': 'asd564a&5d56sa%dsa54$a5s64d'}]}",
    "fail": "{'errorCode': '1', 'errorMessage': 'exemplo'}",
    "failChance": "10"
}
```
This esm file will provide a server on localhost/ex3 with "{'errorCode': '0', 'perfil': [{'nome': 'Jonas', 'token': 'asd564a&5d56sa%dsa54$a5s64d'}]}" as the response ONLY WHEN the body was "{"login": "correto", "password":"1234565645478"}".
Any incorrect data will make the return to be "{'errorCode': '1', 'errorMessage': 'exemplo'}".
obs: The correct body will still fail 10% of the times.

## Authors

* **Pedro Ruiz** - *Initial work* - [opedro](https://github.com/opedro)

## I deserve a coffee

https://www.mercadopago.com/mlb/checkout/start?pref_id=71353339-35512f96-87e7-4521-afb9-d43afae3ab77
