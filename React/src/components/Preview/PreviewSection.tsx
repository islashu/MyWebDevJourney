import React from 'react';
import {PostProps} from '../../model/post.model.ts';
import TextareaAutosize from 'react-textarea-autosize';
import {Editor} from '../Editor/Editor.tsx';
import EditorOutput from '../Editor/EditorOutput.tsx';

const PreviewSection = ({post}: {post: PostProps}) => {
    console.log('post from within preview', post);
    return (
        <>
            <section>
                <TextareaAutosize
                    placeholder="Title"
                    readOnly={true}
                    className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
                    value={post.title}
                ></TextareaAutosize>
                {/* If you pass an empty array as editorContent it will crash for some reason*/}
                {<EditorOutput editorContent={post.editorContent}></EditorOutput>}
            </section>
        </>
    );
};

export default PreviewSection;
