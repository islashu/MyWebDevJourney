/*
 * Provides custom styling for code editorContent and works in conjunction with the react-editor-js renderer
 * */
// function CustomListRenderer({data}: any) {
//     console.log('data inside list block');
//     console.log(data);
//
//     return (
//         <>
//             <div className="min-w-[400px] border border-black">
//                 {data.items.map((item: any, index) => {
//                     return (
//                         <Fragment key={index}>
//                             <div>{`${index + 1}. ${item}`}</div>
//                         </Fragment>
//                     );
//                 })}
//             </div>
//         </>
//     );
// }
//

import React from 'react';
import parse from 'html-react-parser';
import type {CSSProperties} from 'react';
//#endregion

/**********************************************      GLOBALS      ******************************************/

const validListStyles = ['ordered', 'unordered'];
const supportedKeys = ['container', 'listItem', 'list'];

const defaultStyle: {[key: string]: CSSProperties} = {
    container: {
        margin: '5px 0'
    }
};

/**********************************************       TYPES       ******************************************/

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

/**********************************************     FUNCTIONS     ******************************************/

const CustomListRenderer = ({data, style, classNames, config}: ListOutputProps): JSX.Element => {
    if (!data || !data.items || !Array.isArray(data.items)) return <></>;
    if (!style || typeof style !== 'object') style = {};
    if (!config || typeof config !== 'object') config = {disableDefaultStyle: false};
    if (!classNames || typeof classNames !== 'object') classNames = {};

    supportedKeys.forEach((key) => {
        if (!style[key] || typeof style[key] !== 'object') style[key] = {};
        if (!classNames[key] || typeof classNames[key] !== 'string') classNames[key] = '';
    });

    const containerStyle = config.disableDefaultStyle ? style.container : {...defaultStyle.container, ...style.container};
    const listItemStyle = config.disableDefaultStyle ? style.listItem : {...defaultStyle.listItem, ...style.listItem};

    const listType = validListStyles.includes(data.style) ? data.style : 'unordered';
    const content = data.items.map((item, index) => (
        <li key={index} style={listItemStyle} className={classNames.listItem}>
            {index + 1}. {parse(item)}
        </li>
    ));

    if (content.length <= 0) return <></>;
    if (listType === 'ordered')
        return (
            // <ol style={containerStyle} className={classNames.container}>
            <ol style={containerStyle} className="min-w-[400px] border border-black">
                {content}
            </ol>
        );

    return (
        <ul style={containerStyle} className={classNames.container}>
            {content}
        </ul>
    );
};

export default CustomListRenderer;
