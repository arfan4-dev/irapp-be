// validation/userValidation.js
import Joi from 'joi';

const userValidationSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .trim(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
        .required()
        .trim(),

    password: Joi.string()
        .min(6)
        .required(),

    fullName: Joi.string()
        .max(50)
        .trim(),

    role: Joi.string()
        .valid('admin', 'user')
        .required()
});

export const validateUser = (data) => {
    return userValidationSchema.validate(data);
};
