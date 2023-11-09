import React from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import useEditForm from './useEditForm.tsx';

const useEditFormField = (prefix: string) => {
    // Gain the ability to add form fields dynamically
    const {control, register, setValue, getValues, formState} = useFormContext();

    // ------ If you want to add more fields and add here ------
    const nameInputPath = `${prefix}name` as 'name';
    const isPrivateInputPath = `${prefix}isPrivate` as 'isPrivate';
    const pathInputPath = `${prefix}path` as 'path';
    // ----------------------------------------------------------
    const childTabsArrayInputPath = `${prefix}childTabs`;
    const {fields, append, remove} = useFieldArray({
        control,
        name: childTabsArrayInputPath
    });

    const addNewFormField = () => {
        append({name: '', isPrivate: false, path: ''});
    };

    const removeFormField = (index: number) => {
        remove(index);
    };

    const removeAllFormFields = () => {
        remove();
    };

    return {
        fields,
        register,
        setValue,
        getValues,
        addNewFormField,
        removeFormField,
        nameInputPath,
        isPrivateInputPath,
        pathInputPath,
        removeAllFormFields,
        formState
    };
};

export default useEditFormField;
