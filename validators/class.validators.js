import Joi from "joi";
import { validateRequest } from "./validate.js";

const classValidator = Joi.object({
    class: Joi.number().required(),
    teachers: Joi.array().items(Joi.string().trim().optional()),
    students: Joi.array().items(Joi.string().trim().optional()),
});

export const classValidation = validateRequest(classValidator);