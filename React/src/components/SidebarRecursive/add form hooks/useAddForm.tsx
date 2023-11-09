import {useForm} from 'react-hook-form';

const useAddForm = () => {
    // Gain the ability to access the attributes of the edit form
    const methods = useForm({
        mode: 'onTouched'
    });

    const reset = (): void => {
        methods.reset();
    };

    return {methods, handleSubmit: methods.handleSubmit, reset};
};

export default useAddForm;
