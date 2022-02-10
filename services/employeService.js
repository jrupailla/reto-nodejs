const AWS = require("aws-sdk");
const DynamoDB = require("aws-sdk/clients/dynamodb");
const { validateFields } = require("../utils/apiUtility");

var credentials = new AWS.SharedIniFileCredentials({ profile: 'sls-indra' });
AWS.config.credentials = credentials;
AWS.config.region = 'us-east-1';

const dbClient = new DynamoDB.DocumentClient();

const list = () => {
    return new Promise(async (resolve, reject) => {
        const params = {
            TableName: 'EmployeTable'
        };

        try {
            const { Items } = await dbClient.scan(params).promise();
            return resolve(Items);
        } catch (err) {
            console.log('employeHandler list: ', err);
            return reject('Error list employe');
        }
    });
}

const get = (employeId, name) => {
    return new Promise(async (resolve, reject) => {
        var params = {
            TableName: 'EmployeTable',
            Key: {
                employeId: employeId,
                name: name
            }
        };

        try {
            const { Item } = await dbClient.get(params).promise();
            return resolve(Item);
        } catch (err) {
            console.log('employeHandler get: ', err);
            return reject('Error get employe');
        }
    });
}

const insert = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            var { employeId, name, lastName, documentNumber, address, email, age } = data;
            validateFields(data);

            const employe = await get(employeId, name);
            if (typeof employe !== 'undefined') {
                if (Object.entries(employe).length > 0) {
                    return reject('employeId: ' + employeId + ' already exist');
                }
            }

            var params = {
                TableName: 'EmployeTable',
                Item: {
                    employeId: employeId,
                    name: name,
                    lastName: lastName,
                    documentNumber: documentNumber,
                    address: address,
                    email: email,
                    age: age
                }
            };

            await dbClient.put(params).promise();
            return resolve('Employe was add successfully');
        } catch (err) {
            console.log('employeHandler insert: ', err);
            return reject('Error insert employe');
        }
    });
}

const update = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            var { employeId, name, lastName, documentNumber, address, email, age } = data;
            validateFields(data);

            var params = {
                TableName: 'EmployeTable',
                Key: { employeId: employeId, name: name },
                UpdateExpression: "set lastName=:l, documentNumber=:d, address=:a, email=:e, age=:ag",
                ExpressionAttributeValues: {
                    ":l": lastName,
                    ":d": documentNumber,
                    ":a": address,
                    ":e": email,
                    ":ag": age
                }
            };

            await dbClient.update(params).promise();
            return resolve('Employe was update successfully');
        } catch (err) {
            console.log('employeHandler update: ', err);
            return reject('Error update employe');
        }
    });
}

const remove = (employeId, name) => {
    return new Promise(async (resolve, reject) => {
        var params = {
            TableName: 'EmployeTable',
            Key: {
                employeId: employeId,
                name: name
            }
        };

        try {
            await dbClient.delete(params).promise();
            return resolve('Employe was delete successfully');
        } catch (err) {
            console.log('employeHandler remove: ', err);
            return reject('Error delete employe');
        }
    });
}

module.exports = {
    list,
    get,
    insert,
    update,
    remove
};