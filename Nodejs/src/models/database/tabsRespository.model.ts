import {RepositoryProps} from './repository.model';
import {Tab, TabsDocumentProps} from '../tab.model';

export interface TabsRepositoryProps extends RepositoryProps {
    findAllTabs(): Promise<TabsDocumentProps[]>;
    save(tab: any): Promise<void>;
    delete(tab: any): Promise<void>;
    update(tab: any): Promise<void>;
    findbyUuid(uuid: string): Promise<TabsDocumentProps>;
}
