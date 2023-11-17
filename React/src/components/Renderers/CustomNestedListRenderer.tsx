import React, {CSSProperties} from 'react';

const validListStyles = ['ordered', 'unordered'];
const supportedKeys = ['container', 'listItem', 'list', 'items'];

type ListOutputData = {
    items: string[];
    style?: 'ordered' | 'unordered';
};

type ListOutputClassNames = {
    container?: string;
    listItem?: string;
};

type ListOutputStyles = {
    container?: CSSProperties;
    listItem?: CSSProperties;
};
type ListOutputProps = {
    data: ListOutputData;
    style?: ListOutputStyles;
    classNames?: ListOutputClassNames;
    config?;
};
const CustomNestedListRenderer = ({data, style, classNames, config}: ListOutputProps) => {
    if (!data || !data.items || !Array.isArray(data.items)) return <></>;
    if (!style || typeof style !== 'object') style = {};
    if (!config || typeof config !== 'object') config = {disableDefaultStyle: false};
    if (!classNames || typeof classNames !== 'object') classNames = {};

    supportedKeys.forEach((key) => {
        if (!style[key] || typeof style[key] !== 'object') style[key] = {};
        if (!classNames[key] || typeof classNames[key] !== 'string') classNames[key] = '';
    });

    // We need to extract each level out because of the nested list and display it
    function dfs(data) {
        if (data.items.length === 0) return;
    }

    return;
};

export default CustomNestedListRenderer;
