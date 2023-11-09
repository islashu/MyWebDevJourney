import React, {FC, Fragment, useEffect} from 'react';
import useEditFormField from './useEditFormField.tsx';
import {Button} from '@mantine/core';
import {get} from 'react-hook-form';

interface Props {
    prefix?: string;
    tabData?: any;
}

/*
 * If you have an undefined error with index issue, this is due to the recursive component call
 * where it references tabs.childTabs[index] since tabs is undefined, undefined.childTabs[index] causes an error
 *
 * To solve this, we set a default value using tabData = {} and also check if the data even exist before supplying it
 * */
const EditFormFields: FC<Props> = ({prefix = '', tabData = {}}) => {
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
        removeAllFormFields,
        formState: {errors}
    } = useEditFormField(prefix);

    useEffect(() => {
        // This will automatically set the data for it
        setValue(nameInputPath, tabData.name);
        setValue(isPrivateInputPath, tabData.isPrivate);
        setValue(pathInputPath, tabData.path);

        // This will automatically open the tabs if there is tabData if available
        if (prefix === '') {
            removeAllFormFields();
        }

        if (tabData.childTabs && tabData.childTabs.length > 0) {
            // Because of some weird bug where react is rendering twice, the loop below runs twice.
            // This removes the previous render so that it doesn't duplicate the fields.
            removeAllFormFields();
            for (let i = 0; i < tabData.childTabs.length; i++) {
                addNewFormField();
            }
        }
    }, []);

    //-------- Add here for dynamic errors----------
    const nameError = get(errors, nameInputPath);
    const pathError = get(errors, pathInputPath);
    //----------------- End -----------------------

    return (
        <>
            <div>
                {/*Add more fields here*/}
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
                            <input {...register(pathInputPath, {required: true})} placeholder="path" />
                        </div>
                        {pathError && <span className="bg-red-600">This field is required</span>}
                    </div>

                    {/*--------- End --------*/}
                    <Button className="grid col-span-1" type="button" onClick={() => addNewFormField()}>
                        Add Tab
                    </Button>
                </div>
                <div className="pl-6">
                    {fields.map((field, index: number) => (
                        <Fragment key={field.id}>
                            <EditFormFields
                                prefix={`${prefix}childTabs.${index}.`}
                                tabData={tabData && tabData.childTabs ? tabData.childTabs[index] : {}}
                            />
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

export default EditFormFields;
