/*
Editor Output renders the editors value. We no longer need to change the editor to readonly mode.
Using an editor to render the output is a bad idea because an editor is a very heavy component and it will take a much longer time for it to render
Now imagine it is a blog postData with 1000 words and 10 images. It will take a lot of time to render the output.
 */
import React, {FC, useEffect, useState} from 'react';
import Output from 'editorjs-react-renderer';
import CustomImageRenderer from '../Renderers/CustomImageRenderer';
import CustomCodeRenderer from '../Renderers/CustomCodeRenderer';
import CustomListRenderer from '../Renderers/CustomListRenderer.tsx';
import CustomEmbeddedRenderer from '../Renderers/CustomEmbeddedRenderer.tsx';
import CustomNestedListRenderer from '../Renderers/CustomNestedListRenderer.tsx';

/*
 * Child component to Post
 * To take in data and display it as a postData
 * */
interface EditorOutputProps {
    blocks: any;
}

const renderers = {
    image: CustomImageRenderer,
    code: CustomCodeRenderer,
    list: CustomListRenderer,
    embed: CustomEmbeddedRenderer
};

const style = {
    paragraph: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem'
    }
};

// Based on the editorContent, if the editorContent key matches the renderers, the renderer will render the custom css instead of the default css of the editor output

// TODO:
//  Be able to render image

// Only accepts editorContent, not blocks, if you ever get undefined error
const EditorOutput = ({editorContent}) => {
    // console.log(editorContent);
    // console.log(editor);
    return <>{editorContent !== undefined ? <Output style={style} className="text-sm w-full" renderers={renderers} data={editorContent} /> : null}</>;
};

export default EditorOutput;
