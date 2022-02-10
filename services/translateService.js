const axios = require('axios');
const AWS = require("aws-sdk");
const Translate = require("aws-sdk/clients/translate");

var credentials = new AWS.SharedIniFileCredentials({ profile: 'sls-indra' });
AWS.config.credentials = credentials;
AWS.config.region = 'us-east-1';

const translateEndpoint = (url) => {
    return new Promise(async (resolve, reject) => {
        try {

            const { data } = await axios.get(url);
            if (typeof data !== 'object') {
                return reject('Endpoint content is not an object');
            }

            var to_string = Object.keys(data).join().replace(/_/g, ' ');
            var { TranslatedText } = await translateText(to_string);

            var object_values = Object.values(data);
            var object_keys = TranslatedText.split(', ').map(text => text.replace(/ /g, '_'))

            var response = {};
            for (let i = 0; i < object_keys.length; i++) {
                const key = object_keys[i];
                response[key] = object_values[i];
            }

            return resolve(response);

        } catch (err) {
            console.log('translateHandler translate: ', err);
            return reject('Error translate service');
        }
    });
}

const translateText = (text_to_translate) => {
    return new Promise((resolve, reject) => {
        var awsTranslator = new Translate();
        awsTranslator.translateText({
            SourceLanguageCode: 'en',
            TargetLanguageCode: 'es',
            Text: text_to_translate
        }, (err, data) => {
            if (err) {
                return reject(err);
            }

            return resolve(data);
        });
    });
}

module.exports = {
    translateService: translateEndpoint,
    translateText: translateText
};