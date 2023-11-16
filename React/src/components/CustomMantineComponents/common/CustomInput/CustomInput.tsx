import React, {FC} from 'react';
import {TextInput} from '@mantine/core';

interface CustomInputProps {
    label?: string;
    placeholder?: string;
}
const CustomInput: FC<CustomInputProps> = ({label, placeholder}) => {
    return (
        <>
            <TextInput label={label} placeholder={placeholder} />
        </>
    );
};

export default CustomInput;
