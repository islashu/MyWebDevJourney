/*
 * This is what a postDataFromFeed in react is composed of
 * This is what we will send to the backend
 * */
export interface PostProps {
    uuid: string;
    title: string; // textautoarea size
    editorContent: any; // Blocks from editors
    createdAt: Date; // created by create postDataFromFeed
    updatedAt: Date; // created by create postDataFromFeed
    author: string; // To add first name or last name field in the future
    isPrivate: boolean;
    path: string; // relativePath to categorise each postDataFromFeed to each child tab, we should edit the relativePath of the postDataFromFeed
    // Banner object
    // herocard
}

/*
 * Blocks are the editorContent created from the editor
 * It is a JSON but editor js calls it Blocks
 * */
export interface BlockProps {
    content: any;
}

/*
 * This is the request/postDataFromFeed object that we will send to the backend
 * The issue is that
 * */
export interface PostTOProps {
    uuid: string;
    title: string;
    editorContent: any;
    createdAt: Date;
    updatedAt: Date;
    author: string;
    isPrivate: boolean;
    path: string;
}

export class PostTO implements PostTOProps {
    private _author: string;
    private _editorContent: [];
    private _createdAt: Date;
    private _isPrivate: boolean;
    private _path: string;
    private _title: string;
    private _updatedAt: Date;
    private _uuid: string;

    constructor(obj: {
        uuid?: string;
        title?: string;
        editorContent?: [];
        createdAt?: Date;
        updatedAt?: Date;
        author?: string;
        isPrivate?: boolean;
        path?: string;
    }) {
        this._uuid = obj.uuid || '';
        this._title = obj.title || '';
        this._editorContent = obj.editorContent || [];
        this._createdAt = obj.createdAt || new Date();
        this._updatedAt = obj.updatedAt || new Date();
        this._author = obj.author || '';
        this._isPrivate = obj.isPrivate || false;
        this._path = obj.path || '';
    }

    get author(): string {
        return this._author;
    }

    set author(value: string) {
        this._author = value;
    }

    get editorContent(): any {
        return this._editorContent;
    }

    set editorContent(value: any) {
        this._editorContent = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    get isPrivate(): boolean {
        return this._isPrivate;
    }

    set isPrivate(value: boolean) {
        this._isPrivate = value;
    }

    get path(): string {
        return this._path;
    }

    set path(value: string) {
        this._path = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    set updatedAt(value: Date) {
        this._updatedAt = value;
    }

    get uuid(): string {
        return this._uuid;
    }

    set uuid(value: string) {
        this._uuid = value;
    }
}

export interface PaginationTOProps {
    pageParam?: number;
    limit?: number;
    path?: string;
}
export class PaginationTO implements PaginationTOProps {
    private _pageParam?: number;
    private _limit?: number;
    private _path?: string;

    constructor({pageParam, limit, path}: {pageParam?: number; limit?: number; path?: string}) {
        this._pageParam = pageParam || 0;
        this._limit = limit || 0;
        this._path = path || '';
    }

    get pageParam(): number {
        return this._pageParam;
    }

    set pageParam(value: number) {
        this._pageParam = value;
    }

    get limit(): number {
        return this._limit;
    }

    set limit(value: number) {
        this._limit = value;
    }

    get path(): string {
        return this._path;
    }

    set path(value: string) {
        this._path = value;
    }
}

export function convertPostTOJson(postJson: any) {
    if (
        postJson._author ||
        postJson._editorContent ||
        postJson._createdAt ||
        postJson._isPrivate ||
        postJson._path ||
        postJson._title ||
        postJson._updatedAt ||
        postJson._uuid
    ) {
        console.log('postJson');
        console.log(postJson._editorContent);
        return new PostTO({
            author: postJson._author,
            editorContent: postJson._editorContent,
            createdAt: postJson._createdAt,
            isPrivate: postJson._isPrivate,
            path: postJson._path,
            title: postJson._title,
            updatedAt: postJson._updatedAt,
            uuid: postJson._uuid
        });
    } else {
        return new PostTO({
            author: postJson.author,
            editorContent: postJson.editorContent,
            createdAt: postJson.createdAt,
            isPrivate: postJson.isPrivate,
            path: postJson.path,
            title: postJson.title,
            updatedAt: postJson.updatedAt,
            uuid: postJson.uuid
        });
    }
}

export function convertPaginationTOJson(paginationJson: any) {
    if (paginationJson._pageParam || paginationJson._limit || paginationJson._path) {
        return new PaginationTO({
            pageParam: paginationJson._pageParam,
            limit: paginationJson._limit,
            path: paginationJson._path
        });
    } else {
        return new PaginationTO({
            pageParam: paginationJson.pageParam,
            limit: paginationJson.limit,
            path: paginationJson.path
        });
    }
}
