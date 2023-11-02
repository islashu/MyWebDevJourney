export interface TabsDocumentProps {
    // Accept multiple
    uuid?: string;
    name: string;
    childTabs: ChildTabProps[];
    // Show to public or not
    isPrivate: boolean;
}

// Add a class type so that we can construct a new TabsDocumentProps object with a unique uuid as the uuid

export interface ChildTabProps {
    uuid?: string;
    name: string;
    path: string;
    isPrivate: boolean;
}

export interface TabsTOProps {
    uuid?: string;
    name: string;
    childTabs: ChildTabProps[];
    isPrivate: boolean;
}

export class TabsTO implements TabsTOProps {
    private _uuid?: string;
    private _childTabs: ChildTabProps[];
    private _isPrivate: boolean;
    private _name: string;

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

export function convertTabsTOJson(tabsJson: any): TabsTO {
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
