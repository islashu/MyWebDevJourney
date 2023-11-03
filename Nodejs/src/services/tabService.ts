import {TabsRepositoryProps} from '../models/database/tabsRespository.model';
import {TabsControllerProps} from '../models/controller/tabsController.model';
import {Request, Response} from 'express';
import {OK} from '../util/codes/response.code';
import {TabsDocumentProps, TabsTOProps} from '../models/tab.model';
const {convertTabsTOJson, TabsTO} = require('../models/tab.model');

export const tabServiceGetTabs = async (
    req: Request,
    res: Response,
    next: any,
    tabsController: TabsControllerProps,
    tabRepository: TabsRepositoryProps
) => {
    try {
        const tabs: TabsDocumentProps[] = await tabsController.handleGetTabs(tabRepository);
        const tabsTOs = [];

        tabs.forEach((tab: TabsDocumentProps) => {
            tabsTOs.push(new TabsTO(tab));
        });
        res.json({tabsTOs});
    } catch (err) {
        next(err);
    }
};

export const tabServiceCreateNewTab = async (
    req: Request,
    res: Response,
    next: any,
    tabsController: TabsControllerProps,
    tabRepository: TabsRepositoryProps
) => {
    try {
        const tabsTO: TabsTOProps = convertTabsTOJson(req.body.tabsTO);
        await tabsController.handleCreateNewTab(tabsTO, tabRepository);
        res.sendStatus(OK);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const tabServiceUpdateTab = async (
    req: Request,
    res: Response,
    next: any,
    tabsController: TabsControllerProps,
    tabRepository: TabsRepositoryProps
) => {
    try {
        const tabsTO: TabsTOProps = convertTabsTOJson(req.body.tabsTO);
        await tabsController.handleUpdateTab(tabsTO, tabRepository);
        res.json({tabsTO});
    } catch (err) {
        next(err);
    }
};

export const tabServiceDeleteTab = async (
    req: Request,
    res: Response,
    next: any,
    tabsController: TabsControllerProps,
    tabRepository: TabsRepositoryProps
) => {
    try {
        console.log('req.body', req.body);
        const {uuid}: {uuid: string} = convertTabsTOJson(req.body.tabsTO);
        await tabsController.handleDeleteTab(uuid, tabRepository);
        res.sendStatus(OK);
    } catch (err) {
        next(err);
    }
};
