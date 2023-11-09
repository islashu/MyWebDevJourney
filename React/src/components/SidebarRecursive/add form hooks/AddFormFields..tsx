import React, {FC, Fragment, useEffect} from 'react';
import useAddFormField from './useAddFormField.tsx';
import {Button} from '@mantine/core';
import {get} from 'react-hook-form';

interface Props {
    prefix?: string;
}
const AddFormFields: FC<Props> = ({prefix = ''}) => {
    // This is a form component that work exclusively with nested types

    // fields is an array containing newly added form fields
    const {
        fields,
        register,
        setValue,
        getValues,
        addNewFormField,
        removeFormField,
        nameInputPath,
        isPrivateInputPath,
        pathInputPath,
        formState: {errors}
    } = useAddFormField(prefix);

    //-------- Add here for dynamic errors----------
    const nameError = get(errors, nameInputPath);
    const pathError = get(errors, pathInputPath);
    //----------------- End -----------------------

    return (
        <>
            <div>
                <div className="grid grid-cols-4 grid-row-3 w-1/2 p-2">
                    {/*Add more fields here*/}
                    <div className="grid col-span-3">
                        <div className="border border-black w-full">
                            <label className="font-bold px-3 ">Name</label>
                            <input {...register(nameInputPath, {required: true})} placeholder="Name" />
                        </div>
                        {nameError && <span className="bg-red-600">This field is required</span>}

                        <div className="border border-black w-full">
                            <label className="font-bold px-1 ">isPrivate</label>
                            <input type="checkbox" {...register(isPrivateInputPath)} placeholder="isPrivate" />
                        </div>

                        <div className="border border-black w-full">
                            <label className="font-bold px-3 ">path</label>
                            <input
                                {...register(pathInputPath, {required: true})}
                                placeholder="Reference full path to the tab e.g. /reference/react"
                            />
                        </div>
                        {pathError && <span className="bg-red-600">This field is required</span>}
                    </div>

                    {/*--------- End --------*/}
                    <Button className="grid col-span-1" type="button" onClick={() => addNewFormField()}>
                        Add Tab
                    </Button>
                </div>

                {/* Add a new name*/}

                <div className="pl-6">
                    {fields.map((field, index: number) => (
                        <Fragment key={field.id}>
                            <AddFormFields prefix={`${prefix}childTabs.${index}.`} />
                            {/*// This is the delete button */}
                            <div className="pb-1">
                                <Button type="button" onClick={() => removeFormField(index)}>
                                    Remove Name
                                </Button>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AddFormFields;
