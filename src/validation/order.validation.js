import Joi from 'joi';

export const validateOrder = (data) => {
    const schema = Joi.object({
        userId: Joi.string().required(),
        type: Joi.string().min(2).required(),
        person: Joi.string().min(2).required(),
        department: Joi.string().min(2).required(),
        status: Joi.string().valid('Pending', 'In Progress', 'Answered').required(),
        items: Joi.array()
            .items(
                Joi.object({
                    name: Joi.string().required(),
                    quantity: Joi.number().min(1).required()
                })
            )
            .min(1)
            .required()
    });

    return schema.validate(data); // ✅ Don't pass options here unless it's an object!
};
