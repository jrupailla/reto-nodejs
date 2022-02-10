const { list, get, insert, update, remove } = require("../services/employeService");
const { http_200, http_400 } = require("../utils/apiResponses");

module.exports.list_employe = async (event, context, callback) => {
    try {

        var response = await list();
        return callback(null, http_200(response));

    } catch (err) {
        return callback(null, http_400(err));
    }
}

module.exports.get_employe = async (event, context, callback) => {
    try {

        const { employeId, name } = event.queryStringParameters;
        if(typeof employeId === 'undefined' && typeof name === 'undefined') {
            return callback(null, http_400('employeId and name are required in query params'));
        }

        var response = await get(employeId, name);
        return callback(null, http_200(response));

    } catch (err) {
        return callback(null, http_400(err));
    }
}

module.exports.insert_employe = async (event, context, callback) => {
    try {

        var response = await insert(JSON.parse(event.body));
        return callback(null, http_200(response));

    } catch (err) {
        return callback(null, http_400(err));
    }
}

module.exports.update_employe = async (event, context, callback) => {
    try {

        var response = await update(JSON.parse(event.body));
        return callback(null, http_200(response));

    } catch (err) {
        return callback(null, http_400(err));
    }
}

module.exports.remove_employe = async (event, context, callback) => {
    try {

        const { employeId, name } = event.queryStringParameters;
        if(typeof employeId === 'undefined' && typeof name === 'undefined') {
            return callback(null, http_400('employeId and name are required in query params'));
        }

        var response = await remove(employeId, name);
        return callback(null, http_200(response));

    } catch (err) {
        return callback(null, http_400(err));
    }
}