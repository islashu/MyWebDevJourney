import {StringValidatorBuilder} from '../util/stringValidatorBuilder.ts';
/*
 * This is a custom hook for validating form inputs. It contains pre-builds validators to validate common things in forms
 * such as username, password, email, and phone number. If you want to build your own validator, you can do so by using the stirngValidatorBuilder directly
 * instead of using this hook.
 * Essentially the same thing and returns a true or false value.
 *
 * In fact an additional thing, you can configure you custom builder is return the exact error message after building
 *
 * Example: stringValidatorBuilder.build()[0] will return the first error message
 * */
export const useFormValidator = () => {
    const USERNAME_REGEX: RegExp = /^[A-z][A-z0-9-_]{3,23}$/;
    const PASSWORD_REGEX: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const EMAIL_REGEX: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    const PHONE_REGEX: RegExp = /^\d{10}$/;

    const validateUsername = (username: string): [boolean, Array<string>] => {
        const stringValidator = new StringValidatorBuilder(username)
            .isEmpty('Username is required')
            .minLength(4, 'Username must be at least 4 characters')
            .maxLength(24, 'Username must be less than 24 characters')
            .is(USERNAME_REGEX, 'Username must start with a letter and can only contain letters, numbers, dashes, and underscores');

        const errorMessages = stringValidator.build();

        return [errorMessages.length === 0, errorMessages];
    };

    const validatePassword = (password: string) => {
        const stringValidator = new StringValidatorBuilder(password).is(
            PASSWORD_REGEX,
            'Password must be between 8 and 24 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        );

        const errorMessages = stringValidator.build();

        return errorMessages.length === 0;
    };

    const validateEmail = (email: string) => {
        const stringValidator = new StringValidatorBuilder(email).is(EMAIL_REGEX, 'Email is invalid');
        const errorMessages = stringValidator.build();

        return errorMessages.length === 0;
    };

    const validateIsNotEmpty = (value: string, message: string): [boolean, Array<string>] => {
        const stringValidator = new StringValidatorBuilder(value).isEmpty(message);
        const errorMessages = stringValidator.build();

        return [errorMessages.length === 0, errorMessages];
    };

    return {validateUsername, validatePassword, validateEmail, validateIsNotEmpty};
};
