import {TabsDocumentProps} from '../tab.model';
import {TabsRepositoryProps} from '../database/tabsRespository.model';

export interface TabsControllerProps {
    handleGetTabs(db: TabsRepositoryProps): Promise<TabsDocumentProps[]>;
    handleCreateNewTab(tab: TabsDocumentProps, db: TabsRepositoryProps): Promise<void>;
    handleUpdateTab(tab: TabsDocumentProps, db: TabsRepositoryProps): Promise<void>;
    handleDeleteTab(uuid: string, db: TabsRepositoryProps): Promise<void>;
}
