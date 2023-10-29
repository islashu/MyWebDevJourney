export interface SideBarTabProps {
    // Accept multiple
    id: number;
    name: string;
    childTabs: SideBarChildTabProps[];
    // Show to public or not
    isPrivate: boolean;
}

// Add a class type so that we can construct a new SideBarTabProps object with a unique uuid as the id

export interface SideBarChildTabProps {
    id: number;
    name: string;
    path: string;
    isPrivate: boolean;
}
