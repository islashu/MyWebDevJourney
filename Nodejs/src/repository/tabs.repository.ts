import {TabsRepositoryProps} from '../models/database/tabsRespository.model';
import {Tab, TabsDocumentProps} from '../models/tab.model';

export class TabsRepositoryMongo implements TabsRepositoryProps {
    constructor() {}
    async findAllTabs(): Promise<TabsDocumentProps[]> {
        const tabs: TabsDocumentProps[] = await Tab.find({});
        return tabs;
    }

    async save(tab: any): Promise<void> {
        await tab.save();
    }
    async delete(uuid: any): Promise<void> {
        await Tab.deleteOne({uuid: uuid});
    }
    async update(tab: any): Promise<void> {
        const oldTab = Tab.findById(tab.uuid);
    }

    async findbyUuid(uuid: string): Promise<TabsDocumentProps> {
        return Tab.findOne({uuid: uuid});
    }
}
