export interface Errors {
    email: boolean,
    firstName: boolean,
    lastName: boolean,
    username: boolean,
    password: boolean
}

export interface ValidDataResponse {
    errors: Errors,
    hasErrors: boolean
}

export const validateInput = (params: any, createAccount : boolean):ValidDataResponse => {
    const errors: Errors = {
        email: false,
        firstName: false,
        lastName: false,
        username: false,
        password: false
    }

    if (createAccount) {
        errors.email = !params.email;
        errors.firstName = !params.firstName;
        errors.lastName = !params.lastName;
    }

    errors.username = !params.username;
    errors.password = !params.password;

    //Checks if any attribute in errors is true
    const hasErrors = Object.values(errors).some(value => value)

    return { hasErrors: hasErrors, errors: errors }
}

export const clearValidationErrors = () => {
    return {
        username: false,
        password: false,
        firstName: false,
        lastName: false,
        email: false,
        hasError: false
    }
}