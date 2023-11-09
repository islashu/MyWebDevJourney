import {Request, Response} from 'express';
import {TabsControllerProps} from '../models/controller/tabsController.model';
import {TabsRepositoryProps} from '../models/repository/tabsRepository.model';
import {TabsDocumentProps, TabsTOProps} from '../models/tab.model';
import {INTERNAL_SERVER_ERROR} from '../util/codes/response.code';
import {ResponseError} from '../models/error.model';
const {Tab} = require('../models/tab.model');

/*
 * Mongoose things to note:
 * Save() is better than update() as it has built in validation.
 * if you are going to use update() run the validation first by calling myModel.validate()
 * */
export class TabsController implements TabsControllerProps {
    constructor() {}

    async handleGetTabs(db: TabsRepositoryProps): Promise<TabsDocumentProps[]> {
        const tabs: TabsDocumentProps[] = await db.findAllTabs();
        if (!tabs) throw new ResponseError(INTERNAL_SERVER_ERROR, 'No tabs found');

        return tabs;
    }
    async handleCreateNewTab(tab: TabsTOProps, db: TabsRepositoryProps): Promise<void> {
        /*
         * By creating a new mongoose Tab object, we guarantee that the tab object that is saved
         * will have the correct mongoose schema. Only then will calling the save() method work.
         * */
        const newTab = new Tab({
            uuid: tab.uuid,
            name: tab.name,
            isPrivate: tab.isPrivate,
            childTabs: tab.childTabs,
            path: tab.path
        });
        await db.save(newTab);
    }
    async handleUpdateTab(tab: TabsTOProps, db: TabsRepositoryProps): Promise<void> {
        const tabFound = await db.findByUuid(tab.uuid);
        if (!tabFound) throw new ResponseError(INTERNAL_SERVER_ERROR, 'No tab found');
        // Replace everything in the tabFound object with the new tab object
        tabFound.name = tab.name;
        tabFound.isPrivate = tab.isPrivate;
        tabFound.childTabs = tab.childTabs;
        tabFound.path = tab.path;

        await db.save(tabFound);
    }

    async handleDeleteTab(uuid: string, db: TabsRepositoryProps): Promise<void> {
        await db.delete(uuid);
    }
}
