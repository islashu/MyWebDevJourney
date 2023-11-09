export interface TabsDocumentProps {
    // Accept multiple
    uuid?: string;
    name: string;
    childTabs: [];
    // Show to public or not
    isPrivate: boolean;
    path: string;
}

// Add a class type so that we can construct a new TabsDocumentProps object with a unique uuid as the uuid

export interface TabsTOProps {
    uuid?: string;
    name: string;
    childTabs: [];
    isPrivate: boolean;
    path: string;
}

export class TabsTO implements TabsTOProps {
    private _uuid?: string;
    private _childTabs: [];
    private _isPrivate: boolean;
    private _name: string;
    private _path: string;

    constructor(obj: {uuid?: string; name?: string; childTabs?: []; isPrivate?: boolean; path?: string}) {
        this._uuid = obj.uuid || '';
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

export function convertTabsTOJson(tabsJson: any): TabsTO {
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
            path: tabsJson._path
        });
    }
}
