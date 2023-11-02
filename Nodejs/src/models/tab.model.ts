import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';

export interface ChildTabProps {
    uuid?: string;
    name: string;
    path: string;
    isPrivate: boolean;
}
export interface TabsDocumentProps {
    uuid?: string;
    name: string;
    childTabs: ChildTabProps[];
    isPrivate: boolean;
}

export class TabsDocument implements TabsDocumentProps {
    private _uuid?: string;
    private _name: string;
    private _childTabs: ChildTabProps[];
    private _isPrivate: boolean;

    constructor(obj: {uuid?: string; name?: string; childTabs?: ChildTabProps[]; isPrivate?: boolean}) {
        this._uuid = obj.uuid || '';
        this._name = obj.name || '';
        this._childTabs = obj.childTabs || [];
        this._isPrivate = obj.isPrivate || false;
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

    get childTabs(): ChildTabProps[] {
        return this._childTabs;
    }

    set childTabs(value: ChildTabProps[]) {
        this._childTabs = value;
    }

    get isPrivate(): boolean {
        return this._isPrivate;
    }

    set isPrivate(value: boolean) {
        this._isPrivate = value;
    }
}

export interface TabsTOProps {
    uuid?: string;
    name: string;
    childTabs: ChildTabProps[];
    isPrivate: boolean;
}

class TabsTO implements TabsTOProps {
    private _uuid?: string;
    private _childTabs?: ChildTabProps[];
    private _isPrivate?: boolean;
    private _name?: string;

    constructor(obj: {uuid?: string; name?: string; childTabs?: ChildTabProps[]; isPrivate?: boolean}) {
        this._uuid = obj.uuid || uuidv4();
        this._name = obj.name || '';
        this._childTabs = obj.childTabs || [];
        this._isPrivate = obj.isPrivate || false;
    }

    get uuid(): string {
        return this._uuid;
    }

    set uuid(value: string) {
        this._uuid = value;
    }

    get childTabs(): ChildTabProps[] {
        return this._childTabs;
    }

    set childTabs(value: ChildTabProps[]) {
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
}

function convertTabsTOJson(tabsJson) {
    console.log(tabsJson._uuid);
    if (tabsJson._uuid || tabsJson._childTabs || tabsJson._isPrivate || tabsJson._name) {
        return new TabsTO({
            uuid: tabsJson._uuid,
            childTabs: tabsJson._childTabs,
            isPrivate: tabsJson._isPrivate,
            name: tabsJson._name
        });
    } else {
        return new TabsTO({
            uuid: tabsJson.uuid,
            childTabs: tabsJson.childTabs,
            isPrivate: tabsJson.isPrivate,
            name: tabsJson.name
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
            uuid: {
                type: String,
                unique: true,
                immutable: true
            },
            name: {
                type: String
            },
            path: {
                type: String
            },
            isPrivate: {
                type: Boolean
            }
        }
    ],
    isPrivate: {
        type: Boolean
    }
});

export const Tab = mongoose.model('Tab', tabSchema);

module.exports = {Tab, convertTabsTOJson, TabsTO};
