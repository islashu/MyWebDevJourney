import React, {FC, Fragment, useEffect} from 'react';
import useEditFormField from './useEditFormField.tsx';
import {Button, Checkbox, Fieldset, TextInput} from '@mantine/core';
import {get} from 'react-hook-form';
import CustomButton from '../../CustomComponents/common/CustomButton/CustomButton.tsx';
import {CloseButton} from '@mantine/core';

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
                        <CustomButton className="grid col-span-1" type="button" onClick={() => addNewFormField()} name="Add Child Tab"></CustomButton>
                    </Fieldset>
                </section>

                <div className="pl-4">
                    {fields.map((field, index: number) => (
                        <Fragment key={field.id}>
                            <div className="absolute z-10 right-1/3">
                                <CloseButton size="lg" className="absolute" type="button" onClick={() => removeFormField(index)}></CloseButton>
                            </div>
                            <EditFormFields
                                prefix={`${prefix}childTabs.${index}.`}
                                tabData={tabData && tabData.childTabs ? tabData.childTabs[index] : {}}
                            />
                        </Fragment>
                    ))}
                </div>
            </div>
        </>
    );
};

export default EditFormFields;
