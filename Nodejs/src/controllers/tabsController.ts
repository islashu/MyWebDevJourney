import {Request, Response} from 'express';
const {Tab} = require('../models/tab.model');

export const handleGetTabs = async (req: Request, res: Response, next: any) => {
    try {
        const tabs = await Tab.find({});
        console.log(tabs);
        res.json({tabs});
    } catch (err) {
        next(err);
    }
};

export const handleCreateTabs = async (req: Request, res: Response, next: any) => {
    try {
        const tabTO = req.body.tabTO;
        console.log(req.body);
        const tab = new Tab({
            name: tabTO.name,
            isPrivate: tabTO.isPrivate,
            childTabs: tabTO.childTabs
        });
        console.log('tab');
        console.log(tab);

        await tab.save();
        return res.status(200);
    } catch (err) {
        next(err);
    }
};
