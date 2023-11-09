import React from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';

const useAddFormField = (prefix: string) => {
    const {control, register, setValue, getValues, formState} = useFormContext();

    // Field for name
    const nameInputPath = `${prefix}name` as 'name';
    // Field for isPrivate
    const isPrivateInputPath = `${prefix}isPrivate` as 'isPrivate';
    // Field for path
    const pathInputPath = `${prefix}path` as 'path';

    const childTabsArrayInputPath = `${prefix}childTabs`;
    const {fields, append, remove} = useFieldArray({
        control,
        name: childTabsArrayInputPath
    });

    const addNewFormField = () => {
        append({name: '', path: '', isPrivate: false});
    };

    const removeFormField = (index: number) => {
        remove(index);
    };

    return {fields, register, setValue, getValues, addNewFormField, removeFormField, nameInputPath, isPrivateInputPath, pathInputPath, formState};
};

export default useAddFormField;
