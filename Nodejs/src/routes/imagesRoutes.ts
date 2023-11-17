import {ImagesController} from '../controllers/ImagesController';
import {authErrorHandlerMiddleware} from '../middlewares/authErrorHandler.middleware';
import {Request, Response} from 'express';

const express = require('express');
const router = express.Router();
const passport = require('passport');
import multer = require('multer');
import {ImagesControllerProps} from '../models/controller/imagesController.model';
import {imagesServiceUploadImage} from '../services/imagesService';

/*
 * Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files.
 * Using memoryStorage, we save the multipart/form-data in memory instead of saving into node js file system
 * This allows for faster processing of the image as it does not need to read the file again from the file system
 * upload.single('image'), the value image depends on the key in the form data. If you go into image.jwt.api.ts, you would see this
 * "formData.append('image', image);"
 * The key is called image. That is why we use "image" here.
 * */
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const imagesController: ImagesControllerProps = new ImagesController();

router.post(
    '/upload',
    // 3 middlewares before going to the controller
    [passport.authenticate('jwt', {session: false, failWithError: true}), authErrorHandlerMiddleware, upload.single('image')],
    async (req: Request, res: Response, next: any) => {
        return imagesServiceUploadImage(req, res, next, imagesController);
    }
);

module.exports = router;
