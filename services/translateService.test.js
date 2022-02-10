const { translateService } = require("./translateService");
const { textTranslatedData } = require("../utils/apiTestData");

test('Test translate SWAPI endpoint', async () => {
    try {

        const endpoint = 'https://swapi.py4e.com/api/people/1/';
        const text_translated = await translateService(endpoint);
        expect(text_translated).toStrictEqual(textTranslatedData);
        
    } catch (err) {
        console.log('Error test transale endpoint: ', err);
    }
});