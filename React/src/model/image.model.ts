/*
 The following describes the image data object specifically for the image editor plugin only.
 This is not a description of the image data object for the renderers.
 That is a totally different object
*/

export interface ImageMultipartUploadResponseProps {
    success: number;
    file: {
        url: string;
    };
}

export interface ImageMultipartUploadResponseTOProps {
    success: number;
    file: {
        url: string;
    };
}

export class ImageMultipartUploadResponseTO implements ImageMultipartUploadResponseTOProps {
    private _success: number;
    private _file: {
        url: string;
    };

    constructor(success: number, file: {url: string}) {
        this._success = success;
        this._file = file;
    }

    get success(): number {
        return this._success;
    }

    set success(value: number) {
        this._success = value;
    }

    get file(): {url: string} {
        return this._file;
    }

    set file(value: {url: string}) {
        this._file = value;
    }
}

export function convertImageMultipartUploadResponseTOJson(multipartJson: any) {
    if (multipartJson._success || multipartJson._file) {
        return new ImageMultipartUploadResponseTO(multipartJson._success, multipartJson._file);
    } else {
        return new ImageMultipartUploadResponseTO(multipartJson.success, multipartJson.file);
    }
}
