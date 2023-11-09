import useAxiosJwt from '../config/interceptor/useAxiosJwt.ts';
import {PostTOProps} from '../../model/post.model.ts';

export const useHttpPostsJwt = () => {
    const {axiosPrivate} = useAxiosJwt();

    const httpPostCreateNewPost = async (postTO: PostTOProps, controllerSignal?: AbortSignal): Promise<boolean> => {
        return await axiosPrivate
            .post('/posts/create', {postTO: postTO}, {signal: controllerSignal})
            .then((response) => {
                return true;
            })
            .catch((err) => {
                console.log(err);
                throw new Error('Error with creating new post');
            });
    };

    const httpPostUpdatePost = async (postTO: PostTOProps, controllerSignal?: AbortSignal): Promise<boolean> => {
        return await axiosPrivate
            .put('/posts/update', {postTO: postTO}, {signal: controllerSignal})
            .then((response) => {
                return true;
            })
            .catch((err) => {
                console.log(err);
                throw new Error('Error with updating post');
            });
    };

    const httpPostDeletePost = async (postTO: PostTOProps, controllerSignal?: AbortSignal): Promise<boolean> => {
        return await axiosPrivate
            .delete('/posts/delete', {data: {postTO: postTO}, signal: controllerSignal, withCredentials: true})
            .then((response) => {
                return true;
            })
            .catch((err) => {
                console.log(err);
                throw new Error('Error with deleting post');
            });
    };

    return {httpPostCreateNewPost, httpPostUpdatePost, httpPostDeletePost};
};
