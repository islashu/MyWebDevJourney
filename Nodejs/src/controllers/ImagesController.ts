import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';
import {ImageMultipartUploadResponseProps, ImageMultipartUploadResponseTOProps} from '../models/image.model';
import {ResponseError} from '../models/error.model';
import {BAD_REQUEST, INTERNAL_SERVER_ERROR} from '../util/codes/response.code';

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
const AWS_ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY;

const s3 = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
});

export class ImagesController {
    constructor() {}

    async handleUploadImageToS3(fileName: string, fileBuffer: Buffer, contentType: string) {
        if (!fileName || !fileBuffer || !contentType) throw new ResponseError(BAD_REQUEST, 'Filename, fileBuffer and contentType is required');
        // Image object to be saved in S3 bucket
        if (!AWS_BUCKET_NAME || !AWS_BUCKET_REGION || !AWS_ACCESS_KEY || !AWS_SECRET_KEY)
            throw new ResponseError(INTERNAL_SERVER_ERROR, 'AWS S3 credentials is required');
        const params = {
            Bucket: AWS_BUCKET_NAME,
            Key: fileName,
            Body: fileBuffer,
            ContentType: contentType
        };

        // Take the image Object and put into the query command and send into S3 bucket
        const command = new PutObjectCommand(params);
        await s3.send(command);

        // This is the image url to access the image.
        const url = `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;

        // Return the specific format for the image plugin of editor js to use
        return {
            success: 1,
            file: {
                url: url
            }
        } as ImageMultipartUploadResponseTOProps;
    }
}
