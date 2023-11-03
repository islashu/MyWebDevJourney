import {authErrorHandlerMiddleware} from '../middlewares/authErrorHandler.middleware';

const express = require('express');
const router = express.Router();
const passport = require('passport');
import {tabServiceCreateNewTab, tabServiceDeleteTab, tabServiceGetTabs, tabServiceUpdateTab} from '../services/tabService';
import {TabsControllerProps} from '../models/controller/tabsController.model';
import {TabsRepositoryProps} from '../models/database/tabsRespository.model';
import {TabsControllerHandler} from '../controllers/tabsControllerHandler';
import {TabsRepositoryMongo} from '../repository/tabs.repository';
import {Request, Response} from 'express';

const tabControllerHandler: TabsControllerProps = new TabsControllerHandler();
const TabRepositoryMongo: TabsRepositoryProps = new TabsRepositoryMongo();
router.get('/getTabs', (req: Request, res: Response, next: any) => {
    console.log('getTabs');
    return tabServiceGetTabs(req, res, next, tabControllerHandler, TabRepositoryMongo);
});
router.post(
    '/create',
    [passport.authenticate('jwt', {session: false, failWithError: true}), authErrorHandlerMiddleware],
    (req: Request, res: Response, next: any) => {
        console.log('create');
        return tabServiceCreateNewTab(req, res, next, tabControllerHandler, TabRepositoryMongo);
    }
);
router.put(
    '/update',
    [passport.authenticate('jwt', {session: false, failWithError: true}), authErrorHandlerMiddleware],
    (req: Request, res: Response, next: any) => {
        console.log('update');
        return tabServiceUpdateTab(req, res, next, tabControllerHandler, TabRepositoryMongo);
    }
);
router.delete(
    '/delete',
    [passport.authenticate('jwt', {session: false, failWithError: true}), authErrorHandlerMiddleware],
    (req: Request, res: Response, next: any) => {
        return tabServiceDeleteTab(req, res, next, tabControllerHandler, TabRepositoryMongo);
    }
);
module.exports = router;
