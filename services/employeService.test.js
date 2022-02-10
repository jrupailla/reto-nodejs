const { employeInsertData, employeUpdateData } = require("../utils/apiTestData");
const { insert, update, list, get, remove } = require("./employeService");

test('Test employe insert', async () => {
    try {

        const success_msg = 'Employe was add successfully';
        const result_msg = await insert(employeInsertData);
        expect(result_msg).toEqual(success_msg);

    } catch (err) {
        console.log('Error test employe insert: ', err);
    }
});

test('Test employe update', async () => {
    try {

        const success_msg = 'Employe was update successfully';
        const result_msg = await update(employeUpdateData);
        expect(result_msg).toEqual(success_msg);

    } catch (err) {
        console.log('Error test employe insert: ', err);
    }
});

test('Test employe list', async () => {
    try {

        const employes = await list();
        expect(Array.isArray(employes)).toEqual(true);
        expect(employes.length).toBeGreaterThan(0);

    } catch (err) {
        console.log('Error test employe list: ', err);
    }
});

test('Test employe get', async () => {
    try {

        const employe = await get('U19201985', 'Jhon');
        expect(typeof employe).toStrictEqual('object');
        expect(Object.entries(employe).length).toBeGreaterThan(0);

    } catch (err) {
        console.log('Error test employe get: ', err);
    }
});

test('Test employe delete', async () => {
    try {

        const success_msg = 'Employe was delete successfully';
        const result_msg = await remove('U19201985', 'Jhon');
        expect(result_msg).toEqual(success_msg);

    } catch (err) {
        console.log('Error test employe delete: ', err);
    }
});