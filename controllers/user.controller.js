import { findUser, getAllUsers } from "../models/index.js";
import { createSessionRequest, fetchOneSessionRequest, fetchSessionRequest } from "../models/request.model.js";

import { asyncHandler, generateResponse } from '../utils/helpers.js';

// get all users
export const fetchAllUsers = asyncHandler(async (req, res, next) => {

    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    
    // const filters = [{ role: { $ne: ROLES.ADMIN } }];
    // if (req.query.role) filters.push({ role: req.query.role });
    // const query = { $and: filters };

    const usersData = await getAllUsers({  page, limit });
   
    generateResponse(usersData, 'List fetched successfully', res);
});

// get current user
export const getUser = asyncHandler(async (req, res, next) => {
    const user = await findUser({ _id: req.params.userId });
    generateResponse(user, 'User fetched successfully', res);
});

// assign senior to user
export const assignSenior = asyncHandler(async (req, res, next) => {
    const user = await findUser({ _id: req.body.user });
    user.senior = req.body.senior;

    await user.save();
    generateResponse(user, 'Senior assigned successfully', res);
});

export const requestSessionOneOnOne = asyncHandler(async (req, res, next) => {
    const teacher = await findUser({ _id: req.body.teacher });
    
    if(teacher.status !== 'online') return next({
        message: 'Teacher is not active',
        statusCode: 400,
    });

    req.body.student = req.user.id;
    
    const createRequest = await createSessionRequest(req.body)

    generateResponse(createRequest, 'Session requested successfully', res);
})

export const notification = asyncHandler(async (req, res, next) => {
    const response = await fetchSessionRequest({student:req.user.id});
    generateResponse(response, 'Notification fetched successfully', res);
})


// Reject Session
export const rejectSession = asyncHandler(async (req, res, next) => {

    const findSession = await fetchOneSessionRequest({_id:req.body.sessionId});

    if(!findSession) return next({
        message: 'Session not found',
        statusCode: 400,
    });

    findSession.status = 'rejected';
    findSession.isDeleted = true;
    await findSession.save();
    generateResponse(findSession, 'Session rejected successfully', res);
})

// Accept Session
export const acceptSession = asyncHandler(async (req, res, next) => {
    
        const findSession = await fetchOneSessionRequest({_id:req.body.sessionId});

        if(!findSession) return next({
            message: 'Session not found',
            statusCode: 400,
        });

        findSession.status = 'accepted';
        await findSession.save();            
        generateResponse(findSession, 'Session accepted successfully', res);
    })

    export const sessionRequests = asyncHandler(async (req, res, next) => {
        const page = +(req.query.page || 1);
        const limit = +(req.query.limit || 10);
        const query = { status: 'pending', teacher: req.user.id };
        const response = await fetchSessionRequest({page,limit,query});
        generateResponse(response, 'Session requests fetched successfully', res);
    })