import React, {memo} from 'react';
import {SideBarChildTabProps} from '../../../model/tab.model.ts';
import CustomButton from '../../CustomButton/CustomButton.tsx';
import {useNavigate} from 'react-router-dom';

const SideBarChildTab = ({props}: {props: SideBarChildTabProps}) => {
    const navigate = useNavigate();
    const path = props.path;

    const handleNavigate = () => {
        navigate(path);
    };

    return <>{<CustomButton onClick={() => handleNavigate()} buttonName={props.name}></CustomButton>}</>;
};

export default SideBarChildTab;
