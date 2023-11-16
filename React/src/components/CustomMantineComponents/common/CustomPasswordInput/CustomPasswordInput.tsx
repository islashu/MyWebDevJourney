import {PasswordInput} from '@mantine/core';
import React, {FC} from 'react';

interface CustomPasswordInputProps {
    label?: string;
    placeholder?: string;
    description?: string;
}
const CustomPasswordInput: FC<CustomPasswordInputProps> = ({label, placeholder, description}) => {
    return (
        <>
            <PasswordInput label={label} placeholder={placeholder} description={description} />
        </>
    );
};

export default CustomPasswordInput;
