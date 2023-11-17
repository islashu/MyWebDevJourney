export interface ImagesControllerProps {
    handleUploadImageToS3(fileName: string, fileBuffer: Buffer, contentType: string): Promise<any>;
}
