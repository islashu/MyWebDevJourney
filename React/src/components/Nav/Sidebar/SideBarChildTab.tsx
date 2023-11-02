import React, {memo} from 'react';
import {ChildTabProps} from '../../../model/tab.model.ts';
import {useNavigate} from 'react-router-dom';

const SideBarChildTab = ({props}: {props: ChildTabProps}) => {
    const navigate = useNavigate();
    const path = props.path;

    const handleNavigate = () => {
        navigate(path);
    };

    return (
        <>
            {
                <button className="border-black border border-solid bg-amber-50 w-40" onClick={() => handleNavigate()}>
                    {props.name}
                </button>
            }
        </>
    );
};

export default SideBarChildTab;
