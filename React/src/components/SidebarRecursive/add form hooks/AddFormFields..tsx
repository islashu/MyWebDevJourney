import React, {FC, Fragment, useEffect} from 'react';
import useAddFormField from './useAddFormField.tsx';
import {Button, Checkbox, CloseButton, Fieldset, TextInput} from '@mantine/core';
import {get} from 'react-hook-form';
import CustomButton from '../../CustomComponents/common/CustomButton/CustomButton.tsx';

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
                <div className="relative">
                    <section className="grid grid-cols-3">
                        <Fieldset className="w-fit min-h-fit" legend="Fields">
                            {/*Add more fields here*/}
                            <TextInput label="Tab name" placeholder="Tab name" {...register(nameInputPath, {required: true})}></TextInput>
                            <p>{nameError && <span className="text-red-500">This field is required</span>}</p>

                            <TextInput label="Path" placeholder="Path" {...register(pathInputPath, {required: true})}></TextInput>
                            <p>{pathError && <span className="text-red-500">This field is required</span>}</p>

                            <Checkbox className="p-2" label="Is Private?" {...register(isPrivateInputPath)}></Checkbox>
                        </Fieldset>
                        <Fieldset className="w-fit" legend="Options">
                            <CustomButton
                                className="grid col-span-1"
                                type="button"
                                onClick={() => addNewFormField()}
                                name="Add Child Tab"
                            ></CustomButton>
                        </Fieldset>
                    </section>
                    {/*Add more fields here*/}
                    {/*<div className="grid col-span-3">*/}
                    {/*    <div className="border border-black w-full">*/}
                    {/*        <label className="font-bold px-3 ">Name</label>*/}
                    {/*        <input {...register(nameInputPath, {required: true})} placeholder="Name" />*/}
                    {/*    </div>*/}
                    {/*    {nameError && <span className="bg-red-600">This field is required</span>}*/}

                    {/*    <div className="border border-black w-full">*/}
                    {/*        <label className="font-bold px-1 ">isPrivate</label>*/}
                    {/*        <input type="checkbox" {...register(isPrivateInputPath)} placeholder="isPrivate" />*/}
                    {/*    </div>*/}

                    {/*    <div className="border border-black w-full">*/}
                    {/*        <label className="font-bold px-3 ">path</label>*/}
                    {/*        <input*/}
                    {/*            {...register(pathInputPath, {required: true})}*/}
                    {/*            placeholder="Reference full path to the tab e.g. /reference/react"*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    {pathError && <span className="bg-red-600">This field is required</span>}*/}
                    {/*</div>*/}

                    {/*--------- End --------*/}
                    {/*<Button className="grid col-span-1" type="button" onClick={() => addNewFormField()}>*/}
                    {/*    Add Tab*/}
                    {/*</Button>*/}
                </div>

                {/* Add a new name*/}

                <div className="pl-4">
                    {fields.map((field, index: number) => (
                        <Fragment key={field.id}>
                            <div className="absolute z-10 right-1/3">
                                <CloseButton size="lg" className="absolute" type="button" onClick={() => removeFormField(index)}></CloseButton>
                            </div>
                            <AddFormFields prefix={`${prefix}childTabs.${index}.`} />
                            {/*// This is the delete button */}
                        </Fragment>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AddFormFields;
