import React, {memo} from 'react';
import {ChildTabProps} from '../../../model/tab.model.ts';
import {useNavigate} from 'react-router-dom';
import {useRightsValidator} from '../../../hooks/useRightsValidator.ts';

const SideBarChildTab = ({props}: {props: ChildTabProps}) => {
    const navigate = useNavigate();
    const {validateChildSideBarAccess} = useRightsValidator();

    const path: string = props.path;
    const childTab: ChildTabProps = props;

    const handleNavigate = () => {
        navigate(path);
    };

    return (
        <>
            {validateChildSideBarAccess(childTab) ? (
                <button className="border-black border border-solid bg-amber-50 w-40" onClick={() => handleNavigate()}>
                    {props.name}
                </button>
            ) : null}
        </>
    );
};

export default SideBarChildTab;
