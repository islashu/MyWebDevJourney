import React from 'react';
import {PostProps} from '../../model/post.model.ts';
import TextareaAutosize from 'react-textarea-autosize';
import {Editor} from '../Editor/Editor.tsx';
import EditorOutput from '../Editor/EditorOutput.tsx';
import {Fieldset, TextInput} from '@mantine/core';

const PreviewSection = ({post}: {post: PostProps}) => {
    console.log('post from within preview', post);
    return (
        <>
            <Fieldset legend="Preview">
                <section>
                    <TextInput
                        placeholder="Title"
                        readOnly={true}
                        className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
                        value={post.title}
                    ></TextInput>
                    {/* If you pass an empty array as editorContent it will crash for some reason*/}
                </section>
                <section>{<EditorOutput editorContent={post.editorContent}></EditorOutput>}</section>
            </Fieldset>
        </>
    );
};

export default PreviewSection;
