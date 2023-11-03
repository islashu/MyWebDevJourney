import {useReduxAuthSliceService} from '../redux/slices/auth/authSlice.service.ts';
import {ChildTabProps, TabsDocumentProps} from '../model/tab.model.ts';

/*
 * This custom hook is for validating user rights against components and routes
 *
 * The reason for a hook is so that in the future we can add more complex logic and rights
 * and not manually change every component and route.
 * */
export const useRightsValidator = () => {
    const {getReduxAuthSliceIsAdmin} = useReduxAuthSliceService();
    const isAdmin = getReduxAuthSliceIsAdmin();

    /*
     * We are passing in the entire prop so that if we add more rights in the future, we can them without the need to pass in more information
     * */
    const validateSideBarAccess = (tabsProps: TabsDocumentProps): boolean => {
        // true = show, false = no show
        return !tabsProps.isPrivate || (tabsProps.isPrivate && isAdmin);
    };

    const validateChildSideBarAccess = (tabsProps: ChildTabProps): boolean => {
        return !tabsProps.isPrivate || (tabsProps.isPrivate && isAdmin);
    };

    const validateIsAdmin = (): boolean => {
        return isAdmin;
    };

    return {validateSideBarAccess, validateChildSideBarAccess, validateIsAdmin};
};
