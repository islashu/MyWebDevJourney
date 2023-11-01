import mongoose from 'mongoose';
import {child} from 'winston';

export interface childTabProps {
    name: string;
    path: string;
    isPrivate: boolean;
}
export interface TabsDocument {
    name: string;
    childTabs: childTabProps[];
    isPrivate: boolean;
}

const tabSchema = new mongoose.Schema({
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
            }
        }
    ],
    isPrivate: {
        type: Boolean
    }
});

const Tab = mongoose.model('Tab', tabSchema);

module.exports = {Tab};
