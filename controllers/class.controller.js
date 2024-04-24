import { createClass, findAllClasses, findClass } from '../models/class.model.js';
import { STATUS_CODES } from '../utils/constants.js';
import { generateResponse, asyncHandler } from '../utils/helpers.js';

export const createClasses = asyncHandler(async (req, res, next) => {

    const isClassExist = await findClass({ class: req.body.class });

    if(isClassExist) return next({
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: 'Class already exist'
    }
    );

    const classCreated = await createClass(req.body);

    generateResponse( classCreated, "Class created sucessfully", res);
})

// fetch all classes
export const fetchClasses = asyncHandler(async (req, res, next) => {

    const classes = await findAllClasses();

    generateResponse( classes, "Classes fetched sucessfully", res);
})