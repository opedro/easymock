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

## Authors

* **Pedro Ruiz** - *Initial work* - [opedro](https://github.com/opedro)
