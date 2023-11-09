import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Editor} from '../Editor/Editor';
import {Button} from '@mantine/core';
import EditorOutput from '../Editor/EditorOutput.tsx';
import TextareaAutosize from 'react-textarea-autosize';
import PreviewSection from '../Preview/PreviewSection.tsx';
import {PostProps} from '../../model/post.model.ts';
import useStateWithCallback, {useStateWithCallbackLazy} from 'use-state-with-callback';
import {useHttpPostsJwt} from '../../api/posts/posts.jwt.api.ts';

const CreatePost = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isValid, isSubmitSuccessful},
        setValue,
        getValues,
        reset
    } = useForm();

    // For storing the editor editorContent, to be insided into editorOutput
    const [content, setContent] = useState<any>({});
    const [editorBlocks, setEditorBlocks] = useState<any>([]);
    const [isTriggerSubmit, setIsTriggerSubmit] = useState<boolean>(false);
    const [newPost, setNewPost] = useState<PostProps>(null);
    const {httpPostCreateNewPost} = useHttpPostsJwt();
    // A way to await on getting the editorContent data from editor since useState cannot be awaited
    const [lastAction, setLastAction] = useState<string>('');

    /*
     * Extract the editor editorContent data from the editor to be store in the create postDataFromFeed component for usage
     * */
    const handSubmitSetBlockData = (blocks) => {
        setEditorBlocks(blocks);
    };

    /* -------------- Preview-------------------*/
    const handlePreview = async () => {
        setIsTriggerSubmit(!isTriggerSubmit);
        setLastAction('preview');
        console.log('Preview clicked');
    };

    /*Helper function to wait for editor to send back the editorContent data before creating the new post data to be send to the backends*/
    useEffect(() => {
        const newPost = {
            title: getValues('title'),
            editorContent: editorBlocks,
            path: getValues('path')
        } as PostProps;

        console.log('Setting new postDataFromFeed');
        setNewPost(newPost);
    }, [editorBlocks]);
    /* -------------- End of Preview-------------------*/

    /*--------------- Submit -------------------*/
    const onSubmit = async (data) => {
        console.log('Submit clicked');
        // Save
        setIsTriggerSubmit(!isTriggerSubmit);
        setLastAction('submit');
        // We want to only run this after newPost is set
    };

    useEffect(() => {
        const submit = async () => {
            //--------- Change logic for sending request to backend here ------------
            return await httpPostCreateNewPost(newPost);
            //--------- end of logic for sending request ------------
        };

        if (lastAction === 'submit') {
            try {
                const result = submit().then((response) => {
                    console.log('Response came back');
                });
            } catch (err) {
                console.log(err);
            }
            return;
        }
    }, [newPost]);
    /*--------------- End of Submit -------------------*/
    return (
        <>
            <title> Create a post</title>
            <main className="max-w-2xl mx-auto">
                <section>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>Title</label>
                        <TextareaAutosize
                            placeholder="Title"
                            {...register('title', {required: true})}
                            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
                        ></TextareaAutosize>

                        <label>Content</label>
                        <Editor
                            isEditMode={false}
                            onTriggerSubmit={isTriggerSubmit}
                            onSubmitSetBlockData={(blocks) => handSubmitSetBlockData(blocks)}
                        />

                        <label htmlFor="pathInput">Path of new post</label>
                        <input {...register('path', {required: true})}></input>

                        {/*Only triggers the migration of editorContent data from editor to createPost component */}
                        <Button onClick={() => handlePreview()}>Preview</Button>
                        <Button type="submit">Submit</Button>
                    </form>
                </section>
                <section>{newPost ? <PreviewSection post={newPost} /> : null}</section>
            </main>
        </>
    );
};
export default CreatePost;
