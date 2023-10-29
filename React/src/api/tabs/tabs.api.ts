import axios from '../config/axios';
import {SideBarTabProps} from '../../model/tab.model.ts'; // We need to import explicit from the configuration file
/* All apis are custom hooks by design*/
export const useHttpTabs = () => {
    const httpTabsGetAllTabs = async (controllerSignal?: AbortSignal): Promise<SideBarTabProps[]> => {
        return await axios
            .get('/tabs', {signal: controllerSignal})
            .then((response) => {
                // By doing this, we guarantee that the return value is not void, so we don't need to add a void to the types
                const tabs: SideBarTabProps[] = response.data || [];
                return tabs;
            })
            .catch((err) => {
                console.log(err);
                // By doing this, we guarantee that the return value is not void, so we don't need to add a void to the types
                return [];
            });
    };

    return {httpTabsGetAllTabs};
};
