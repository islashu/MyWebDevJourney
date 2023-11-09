import {PostsControllerProps} from '../models/controller/postsController.model';
import {PostsRepositoryProps} from '../models/repository/postsRepository.model';
const {convertPostTOJson, convertPaginationTOJson, PostTO} = require('../models/post.model');
import {Request, Response} from 'express';
import {OK} from '../util/codes/response.code';
import {PostTOProps} from '../models/post.model';

export const postsServiceGetPostsWithPagination = async (
    req: Request,
    res: Response,
    next: any,
    postsController: PostsControllerProps,
    postRepository: PostsRepositoryProps
) => {
    try {
        const {pageParam, limit, path}: {pageParam: number; limit: number; path: string} = convertPaginationTOJson(
            // This is how you get the query params from the request if it is a get request
            JSON.parse(<string>req.query.paginationTO)
        );
        const postTOs: PostTOProps[] = [];
        const posts = await postsController.handleGetPostsWithPagination(pageParam, limit, path, postRepository);
        posts.map((post) => {
            console.log('post', post);
            postTOs.push(new PostTO(post));
        });
        console.log('postsTO sending out', postTOs);
        res.json({postTOs});
    } catch (err) {
        next(err);
    }
};

export const postsServiceCreateNewPost = async (
    req: Request,
    res: Response,
    next: any,
    postsController: PostsControllerProps,
    postRepository: PostsRepositoryProps
) => {
    try {
        const postTO: PostTOProps = convertPostTOJson(req.body.postTO);
        await postsController.handleCreateNewPost(postTO, postRepository);
        res.sendStatus(OK);
    } catch (err) {
        next(err);
    }
};

export const postsServiceUpdatePost = async (
    req: Request,
    res: Response,
    next: any,
    postsController: PostsControllerProps,
    postRepository: PostsRepositoryProps
) => {
    try {
        const postTO: PostTOProps = convertPostTOJson(req.body.postTO);
        await postsController.handleUpdatePost(postTO, postRepository);
        res.sendStatus(OK);
    } catch (err) {
        next(err);
    }
};

export const postsServiceDeletePost = async (
    req: Request,
    res: Response,
    next: any,
    postsController: PostsControllerProps,
    postRepository: PostsRepositoryProps
) => {
    try {
        const {uuid}: {uuid: string} = convertPostTOJson(req.body.postTO);
        await postsController.handleDeletePost(uuid, postRepository);
        res.sendStatus(OK);
    } catch (err) {
        next(err);
    }
};
