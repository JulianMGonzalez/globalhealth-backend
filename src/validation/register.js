import Validator from 'validator'
import isEmpty from 'is-empty'

module.exports = function validateRegisterInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Nombre es requerido";
    }
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email es requerido";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email es invalido";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "La contraseña es requerido";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "La confirmacion de contraseña es requerido";
    }
    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
        errors.password = "La contraseña tiene que superar los 8 caracteres";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "La contraseña es larga";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};