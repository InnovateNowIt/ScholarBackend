import { Router } from 'express';
import { ROLES } from '../utils/constants.js';
import { authMiddleware } from '../middlewares/index.js';
import {  acceptSession, fetchAllUsers, notification, rejectSession, requestSessionOneOnOne, sessionRequests } from '../controllers/index.js';
import { requestOneOnOneValidation } from '../validators/user.validators.js';

export default class UserAPI {
    constructor() {
        this.router = Router();
        this.setupRoutes();
    }

    setupRoutes() {
        const router = this.router;
        router.get('/', fetchAllUsers);
        router.get('/notification',authMiddleware(Object.values(ROLES)),notification);
        router.get('/teacher-request',authMiddleware(Object.values(ROLES)),sessionRequests); // Teacher will see student request on there screen
        router.post('/request-session', authMiddleware(ROLES.STUDENT),requestOneOnOneValidation,requestSessionOneOnOne);
        router.put('/accept-session', authMiddleware(Object.values(ROLES)),acceptSession);
        router.put('/reject-session', authMiddleware(Object.values(ROLES)),rejectSession);


    }

    getRouter() {
        return this.router;
    }

    getRouterGroup() {
        return '/user';
    }
}