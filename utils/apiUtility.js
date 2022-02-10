const employeModel = {
    employeId: '',
    name: '',
    lastName: '',
    documentNumber: '',
    address: '',
    email: '',
    age: ''
};

module.exports.validateFields = (data) => {
    for (const key in employeModel) {
        if (!Object.hasOwnProperty.call(data, key)) {
            throw "Attribute " + key + " is required";
        }
    }
}