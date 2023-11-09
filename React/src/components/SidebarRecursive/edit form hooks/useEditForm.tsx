import {useForm} from 'react-hook-form';

const useEditForm = () => {
    // Gain the ability to access the attributes of the edit form
    const methods = useForm({
        mode: 'onTouched'
    });

    return {methods, handleSubmit: methods.handleSubmit};
};

export default useEditForm;
