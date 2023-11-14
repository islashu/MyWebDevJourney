import {Fieldset} from '@mantine/core';
import React, {FC} from 'react';

interface CustomFieldsetProps {
    children: React.ReactNode;
    legend?: string;
}
const CustomFieldset: FC<CustomFieldsetProps> = ({children, legend}) => {
    return (
        <>
            <Fieldset legend={legend}></Fieldset>
        </>
    );
};

export default CustomFieldset;
