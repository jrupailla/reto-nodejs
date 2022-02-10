const response_body = (code = 502, data = {}) => {
    return {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
        statusCode: code,
        body: JSON.stringify(data)
    };
}

const http_reponses = {
    http_200(data = {}) {
        return response_body(200, data);
    },

    http_400(data = {}) {
        return response_body(400, data);
    },

    http_404(data = {}) {
        return response_body(404, data);
    }
}

module.exports = http_reponses;