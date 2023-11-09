import React, {memo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuthoriser} from '../../hooks/useAuthoriser.ts';
import {useReduxAuthSliceService} from '../../redux/slices/auth/authSlice.service.ts';
import {TabsDocumentProps} from '../../model/tab.model.ts';

const SideBarChildTab = ({props}: {props: TabsDocumentProps}) => {
    const navigate = useNavigate();
    const {validateChildSideBarPrivateAccess} = useAuthoriser();

    const path: string = props.path;
    const childTab = props;

    const handleNavigate = () => {
        navigate(path);
    };

    return (
        <>
            {validateChildSideBarPrivateAccess(childTab) ? (
                <button className="border-black border border-solid bg-amber-50 w-full" onClick={() => handleNavigate()}>
                    {props.name}
                </button>
            ) : null}
        </>
    );
};

export default SideBarChildTab;
