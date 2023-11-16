import {Checkbox, Fieldset, Group, TextInput} from '@mantine/core';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useReduxAuthSliceService} from '../../redux/slices/auth/authSlice.service';
import CustomButton from '../CustomMantineComponents/common/CustomButton/CustomButton.tsx';
import {AuthTO, AuthTOProps} from '../../model/auth.model.ts';
import {useToast} from '../../hooks/useToast.tsx';
import {useHttpAuthJwt} from '../../api/auth/auth.jwt.api.ts';

const Settings = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isValid},
        setValue,
        getValues
    } = useForm({mode: 'onTouched'});
    const {
        getReduxAuthSliceUsername,
        getReduxAuthSliceIsAdmin,
        getReduxAuthSliceIsSuperAdmin,
        setReduxAuthSliceIsAdmin,
        setReduxAuthSliceIsSuperAdmin
    } = useReduxAuthSliceService();
    const [isLoading, setIsLoading] = useState(false);
    const {toastSuccess, toastFailure, updateToastLoadingToSuccess, updateToastLoadingToFailure, toastLoading} = useToast();
    const {httpAuthJwtUpdateUserDetails} = useHttpAuthJwt();
    useEffect(() => {
        setValue('settingsUsername', getReduxAuthSliceUsername());
        setValue('settingsIsAdmin', getReduxAuthSliceIsAdmin());
        setValue('settingsIsSuperAdmin', getReduxAuthSliceIsSuperAdmin());
    }, []);

    const onSave = async (data) => {
        try {
            setIsLoading(true);
            toastLoading('settingsLoading');
            const updatedUser = new AuthTO({
                username: getReduxAuthSliceUsername(),
                isAdmin: data.settingsIsAdmin,
                isSuperAdmin: data.settingsIsSuperAdmin
            });
            await httpAuthJwtUpdateUserDetails(updatedUser).then((res) => {
                setReduxAuthSliceIsAdmin(res.isAdmin);
                setReduxAuthSliceIsSuperAdmin(res.isSuperAdmin);
                updateToastLoadingToSuccess('settingsLoading', 'User updated', 'Settings updated!');
            });
            // Update this to one method only
        } catch (err) {
            console.log(err);
            updateToastLoadingToFailure('settingsLoading', 'Error updating user', 'Please try again!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div>
                <Fieldset className="w-1/2 mx-auto m-4" legend="Settings">
                    <form onSubmit={handleSubmit(onSave)}>
                        <section>
                            <TextInput
                                label="Username"
                                disabled
                                placeholder="username"
                                {...register('settingsUsername', {required: true})}
                            ></TextInput>
                            <p>{errors.username && <span className="text-red-500">This field is required</span>}</p>
                        </section>

                        <section className="py-2">
                            <label className="font-medium text-sm">Rights</label>
                            <Checkbox className="p-2" label="Admin Rights" {...register('settingsIsAdmin')}></Checkbox>
                            <Checkbox className="p-2" label="Super Admin Rights" {...register('settingsIsSuperAdmin')}></Checkbox>
                        </section>

                        <Group justify="flex-end" mt="md">
                            <CustomButton isDisabled={!isValid || isLoading} name="save" type="submit"></CustomButton>
                        </Group>
                    </form>
                </Fieldset>
            </div>
        </>
    );
};

export default Settings;
