import { Router } from 'express';
import { createClasses, fetchClasses } from '../controllers/class.controller.js';
import { classValidation } from '../validators/class.validators.js';

export default class ClassAPI {
    constructor() {
        this.router = Router();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', fetchClasses);
        this.router.post('/',classValidation,createClasses);
    }

    getRouter() {
        return this.router;
    }

    getRouterGroup() {
        return '/class';
    }
}
