import axios from '../config/axios';
import {convertTabsTOJson, TabsDocumentProps} from '../../model/tab.model.ts'; // We need to import explicit from the configuration file
/* All apis are custom hooks by design*/
export const useHttpTabs = () => {
    const httpTabsGetTabs = async (controllerSignal?: AbortSignal): Promise<TabsDocumentProps[]> => {
        return await axios
            .get('/tabs/getTabs', {signal: controllerSignal})
            .then((response) => {
                // By doing this, we guarantee that the return value is not void, so we don't need to add a void to the types
                const tabsTOs: TabsDocumentProps[] = [];
                response.data.tabsTOs.forEach((tabTO: TabsDocumentProps) => {
                    tabsTOs.push(convertTabsTOJson(tabTO));
                });
                return tabsTOs || [];
            })
            .catch((err) => {
                console.log(err);
                // By doing this, we guarantee that the return value is not void, so we don't need to add a void to the types
                return [];
            });
    };

    return {httpTabsGetTabs};
};
