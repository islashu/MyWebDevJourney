import {authErrorHandlerMiddleware} from '../middlewares/authErrorHandler.middleware';

const express = require('express');
const router = express.Router();
const passport = require('passport');
import {tabServiceCreateNewTab, tabServiceDeleteTab, tabServiceGetTabs, tabServiceUpdateTab} from '../services/tabsService';
import {TabsControllerProps} from '../models/controller/tabsController.model';
import {TabsRepositoryProps} from '../models/repository/tabsRepository.model';
import {TabsController} from '../controllers/tabsController';
import {TabsRepositoryMongo} from '../repository/tabs.repository';
import {Request, Response} from 'express';

const tabController: TabsControllerProps = new TabsController();
const TabRepositoryMongo: TabsRepositoryProps = new TabsRepositoryMongo();
router.get('/getTabs', (req: Request, res: Response, next: any) => {
    console.log('getTabs');
    return tabServiceGetTabs(req, res, next, tabController, TabRepositoryMongo);
});
router.post(
    '/create',
    [passport.authenticate('jwt', {session: false, failWithError: true}), authErrorHandlerMiddleware],
    (req: Request, res: Response, next: any) => {
        console.log('create');
        return tabServiceCreateNewTab(req, res, next, tabController, TabRepositoryMongo);
    }
);
router.put(
    '/update',
    [passport.authenticate('jwt', {session: false, failWithError: true}), authErrorHandlerMiddleware],
    (req: Request, res: Response, next: any) => {
        console.log('update');
        return tabServiceUpdateTab(req, res, next, tabController, TabRepositoryMongo);
    }
);
router.delete(
    '/delete',
    [passport.authenticate('jwt', {session: false, failWithError: true}), authErrorHandlerMiddleware],
    (req: Request, res: Response, next: any) => {
        return tabServiceDeleteTab(req, res, next, tabController, TabRepositoryMongo);
    }
);
module.exports = router;
