import Joi from 'joi';

export const validateCategory = (data) => {
    return Joi.object({
        label: Joi.string().min(3).max(50).required(),
        department: Joi.string(),
       
    }).validate(data);
};
