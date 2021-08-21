import Validator from 'validator'
import isEmpty from 'is-empty'

module.exports = function validateLoginInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email es requerido";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email invalido";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "La contraseña es requerida";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}