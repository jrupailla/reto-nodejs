const { translateService } = require("../services/translateService");
const { http_200, http_400 } = require("../utils/apiResponses");

module.exports.translate_endpoint = async (event, context, callback) => {
    try {
        const { url_endpoint } = JSON.parse(event.body);
        if (typeof url_endpoint === 'undefined') {
            return callback(null, http_400('url_endpoint not found in body'));
        }

        var response = await translateService(url_endpoint);
        return callback(null, http_200(response));

    } catch (err) {
        return callback(null, http_400(err));
    }
}