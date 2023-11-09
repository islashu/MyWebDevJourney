//#region imports
import React from 'react';
import parse from 'html-react-parser';
import type {CSSProperties} from 'react';
//#endregion

/**********************************************      GLOBALS      ******************************************/

const supportedKeys = ['video', 'figure', 'figcaption'];

const defaultStyle: {[key: string]: CSSProperties} = {
    iframeStyle: {
        maxWidth: '100%',
        width: '100%',
        height: '400px',
        maxHeight: '400px',
        borderRadius: '5px',
        boxShadow: 'none',
        outline: 'none',
        border: 'none'
    },
    figureStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px 0',
        width: '100%',
        maxWidth: '100%',
        height: '400px',
        maxHeight: '400px',
        overflow: 'hidden'
    },
    figcaptionStyle: {
        padding: '5px 10px',
        fontSize: '12px',
        borderRadius: '2px',
        cursor: 'default'
    }
};

/**********************************************       TYPES       ******************************************/

type EmbedOutputData = {
    embed: string;
    width?: number;
    height?: number;
    caption?: string;
};

type EmbedOutputClassNames = {
    video?: string;
    figure?: string;
    figcaption?: string;
};

type EmbedOutputStyles = {
    video?: CSSProperties;
    figure?: CSSProperties;
    figcaption?: CSSProperties;
};

type EmbedOutputProps = {
    data: EmbedOutputData;
    style?: EmbedOutputStyles;
    classNames?: EmbedOutputClassNames;
    config?;
};

/**********************************************     FUNCTIONS     ******************************************/

const CustomEmbeddedRenderer = ({data, style, classNames, config}: EmbedOutputProps): JSX.Element => {
    if (!data || !data.embed) return <></>;
    if (!style || typeof style !== 'object') style = {};
    if (!config || typeof config !== 'object') config = {disableDefaultStyle: false};
    if (!classNames || typeof classNames !== 'object') classNames = {};

    supportedKeys.forEach((key) => {
        if (!style[key] || typeof style[key] !== 'object') style[key] = {};
        if (!classNames[key] || typeof classNames[key] !== 'string') classNames[key] = '';
    });

    const iframeStyle = config.disableDefaultStyle ? style.video : {...defaultStyle.iframeStyle, ...style.video};

    if (data.width) iframeStyle['width'] = data.width;
    if (data.height) iframeStyle['height'] = data.height;

    const figureStyle = config.disableDefaultStyle ? style.figure : {...defaultStyle.figureStyle, ...style.figure};
    const figcaptionStyle = config.disableDefaultStyle ? style.figcaption : {...defaultStyle.figcaptionStyle, ...style.figcaption};

    return (
        <figure style={figureStyle} className="min-w-[400px]">
            <iframe src={data.embed} style={iframeStyle} className={classNames.video}></iframe>
            {data.caption && (
                <figcaption style={figcaptionStyle} className={classNames.figcaption}>
                    {parse(data.caption)}
                </figcaption>
            )}
        </figure>
    );
};

export default CustomEmbeddedRenderer;
