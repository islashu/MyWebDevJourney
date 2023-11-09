import {PostsController} from '../controllers/postsController';
import {PostsRepositoryProps} from '../models/repository/postsRepository.model';
import {PostsControllerProps} from '../models/controller/postsController.model';
import {PostsRepositoryMongo} from '../repository/posts.repository';
import {
    postsServiceCreateNewPost,
    postsServiceDeletePost,
    postsServiceGetPostsWithPagination,
    postsServiceUpdatePost
} from '../services/postsService';
import {authErrorHandlerMiddleware} from '../middlewares/authErrorHandler.middleware';
import {Request, Response} from 'express';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController: PostsControllerProps = new PostsController();
const postsRepositoryMongo: PostsRepositoryProps = new PostsRepositoryMongo();
router.get('/getPostsWithPagination', (req: Request, res: Response, next: any) => {
    return postsServiceGetPostsWithPagination(req, res, next, postsController, postsRepositoryMongo);
});

router.post(
    '/create',
    [passport.authenticate('jwt', {session: false, failWithError: true}), authErrorHandlerMiddleware],
    (req: Request, res: Response, next: any) => {
        return postsServiceCreateNewPost(req, res, next, postsController, postsRepositoryMongo);
    }
);

router.put(
    '/update',
    [passport.authenticate('jwt', {session: false, failWithError: true}), authErrorHandlerMiddleware],
    (req: Request, res: Response, next: any) => {
        return postsServiceUpdatePost(req, res, next, postsController, postsRepositoryMongo);
    }
);

router.delete(
    '/delete',
    [passport.authenticate('jwt', {session: false, failWithError: true}), authErrorHandlerMiddleware],
    (req: Request, res: Response, next: any) => {
        return postsServiceDeletePost(req, res, next, postsController, postsRepositoryMongo);
    }
);

module.exports = router;
