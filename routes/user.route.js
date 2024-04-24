import { Router } from 'express';
import { ROLES } from '../utils/constants.js';
import { authMiddleware } from '../middlewares/index.js';
import {  fetchAllUsers, notification, requestSessionOneOnOne } from '../controllers/index.js';
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
        router.post('/request-session', authMiddleware(ROLES.STUDENT),requestOneOnOneValidation,requestSessionOneOnOne);

    }

    getRouter() {
        return this.router;
    }

    getRouterGroup() {
        return '/user';
    }
}