import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';

export interface TabsDocumentProps {
    uuid?: string;
    name: string;
    childTabs: [];
    isPrivate: boolean;
    path: string;
}

export class TabsDocument implements TabsDocumentProps {
    private _uuid?: string;
    private _name: string;
    private _childTabs: [];
    private _isPrivate: boolean;
    private _path: string;

    constructor(obj: {uuid?: string; name?: string; childTabs?: []; isPrivate?: boolean; path?: string}) {
        this._uuid = obj.uuid || uuidv4();
        this._name = obj.name || '';
        this._childTabs = obj.childTabs || [];
        this._isPrivate = obj.isPrivate || false;
        this._path = obj.path || '';
    }

    get uuid(): string {
        return this._uuid;
    }

    set uuid(value: string) {
        this._uuid = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get childTabs(): [] {
        return this._childTabs;
    }

    set childTabs(value: []) {
        this._childTabs = value;
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
}

export interface TabsTOProps {
    uuid?: string;
    name: string;
    childTabs: [];
    isPrivate: boolean;
    path: string;
}

class TabsTO implements TabsTOProps {
    private _uuid?: string;
    private _childTabs?: [];
    private _isPrivate?: boolean;
    private _name?: string;
    private _path?: string;

    constructor(obj: {uuid?: string; name?: string; childTabs?: []; isPrivate?: boolean; path?: string}) {
        this._uuid = obj.uuid || uuidv4();
        this._name = obj.name || '';
        this._childTabs = obj.childTabs || [];
        this._isPrivate = obj.isPrivate || false;
        this._path = obj.path || '';
    }

    get uuid(): string {
        return this._uuid;
    }

    set uuid(value: string) {
        this._uuid = value;
    }

    get childTabs(): [] {
        return this._childTabs;
    }

    set childTabs(value: []) {
        this._childTabs = value;
    }

    get isPrivate(): boolean {
        return this._isPrivate;
    }

    set isPrivate(value: boolean) {
        this._isPrivate = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get path(): string {
        return this._path;
    }

    set path(value: string) {
        this._path = value;
    }
}

function convertTabsTOJson(tabsJson) {
    if (tabsJson._uuid || tabsJson._childTabs || tabsJson._isPrivate || tabsJson._name || tabsJson._path) {
        return new TabsTO({
            uuid: tabsJson._uuid,
            childTabs: tabsJson._childTabs,
            isPrivate: tabsJson._isPrivate,
            name: tabsJson._name,
            path: tabsJson._path
        });
    } else {
        return new TabsTO({
            uuid: tabsJson.uuid,
            childTabs: tabsJson.childTabs,
            isPrivate: tabsJson.isPrivate,
            name: tabsJson.name,
            path: tabsJson.path
        });
    }
}

const tabSchema = new mongoose.Schema({
    uuid: {
        type: String,
        unique: true,
        immutable: true
    },
    name: {
        type: String
    },
    childTabs: [
        {
            name: {
                type: String
            },
            path: {
                type: String
            },
            isPrivate: {
                type: Boolean
            },
            childTabs: {
                type: Array
            }
        }
    ],
    isPrivate: {
        type: Boolean
    },
    path: {
        type: String
    }
});

export const Tab = mongoose.model('Tab', tabSchema);

module.exports = {Tab, convertTabsTOJson, TabsTO};
