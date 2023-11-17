import {ImagesControllerProps} from '../models/controller/imagesController.model';
import {Request, Response} from 'express';
import {ImageMultipartUploadResponseTOProps} from '../models/image.model';
const {ImageMultipartUploadResponseTO} = require('../models/image.model');

export const imagesServiceUploadImage = async (req: Request, res: Response, next: any, imagesController: ImagesControllerProps) => {
    try {
        // This route purely accesses S3 bucket and does not interact with the database.
        // fileBuffer is a fancy term for image data
        // mimetype is the type of the image e.g. png, jpeg
        const {originalname, buffer, mimetype}: {originalname: string; buffer: Buffer; mimetype: string} = req.file;
        const multipartResponse: ImageMultipartUploadResponseTOProps = await imagesController.handleUploadImageToS3(originalname, buffer, mimetype);
        // Returns the S3 url to the image
        const response = new ImageMultipartUploadResponseTO(multipartResponse.success, multipartResponse.file);
        res.json(response);
    } catch (err) {
        next(err);
    }
};
