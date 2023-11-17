import useAxiosJwt from '../config/interceptor/useAxiosJwt.ts';
import {convertImageMultipartUploadResponseTOJson} from '../../model/image.model.ts';

export const useHttpImagesJwt = () => {
    const {axiosPrivate} = useAxiosJwt();

    const httpImageUploadImage = async (image: File, controllerSignal?: AbortSignal) => {
        let formData = new FormData();
        formData.append('image', image);
        return await axiosPrivate
            .post('/images/upload', formData, {signal: controllerSignal, headers: {'Content-Type': 'multipart/form-data'}})
            .then((response) => {
                const multipartResponse = convertImageMultipartUploadResponseTOJson(response.data);
                if (!multipartResponse.success || !multipartResponse.file) throw new Error('No data returned from server!');
                return multipartResponse;
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    };

    return {httpImageUploadImage};
};
