import {convertPostTOJson, PaginationTO, PaginationTOProps, PostProps, PostTOProps} from '../../model/post.model';
import axios from '../config/axios';

export const useHttpPosts = () => {
    const httpPostsGetPostWithPagination = async (PaginationTO: PaginationTOProps, controllerSignal?: AbortSignal) => {
        // Pass in pageParam
        console.log('getting posts with pagination', PaginationTO);
        return await axios
            .get('/posts/getPostsWithPagination', {
                signal: controllerSignal,
                params: {
                    paginationTO: JSON.stringify(PaginationTO)
                }
            })
            .then((response) => {
                const postTOs: PostTOProps[] = [];
                console.log('response', response);
                response.data.postTOs.forEach((postTO) => {
                    postTOs.push(convertPostTOJson(postTO));
                });
                console.log('receiving', postTOs);
                return postTOs;
            })
            .catch((err) => {
                throw new Error('Error with getting posts');
            });
    };

    return {httpPostsGetPostWithPagination};
};
