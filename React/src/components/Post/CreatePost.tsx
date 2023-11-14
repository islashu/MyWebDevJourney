import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Editor} from '../Editor/Editor';
import {Button, Fieldset, Group, TextInput} from '@mantine/core';
import EditorOutput from '../Editor/EditorOutput.tsx';
import TextareaAutosize from 'react-textarea-autosize';
import PreviewSection from '../Preview/PreviewSection.tsx';
import {PostProps} from '../../model/post.model.ts';
import useStateWithCallback, {useStateWithCallbackLazy} from 'use-state-with-callback';
import {useHttpPostsJwt} from '../../api/posts/posts.jwt.api.ts';
import CustomButton from '../CustomComponents/common/CustomButton/CustomButton.tsx';
import {useNavigate, useParams} from 'react-router-dom';

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
    const navigate = useNavigate();
    const fullPath = window.location.pathname;

    /*
     * Extract the editor editorContent data from the editor to be store in the create postDataFromFeed component for usage
     * */
    const handSubmitSetBlockData = (blocks) => {
        setEditorBlocks(blocks);
    };

    /*
     Set the entire path from root automatically based on the current params
    */
    useEffect(() => {
        setValue('path', fullPath);
    }, []);

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
                    navigate(fullPath);
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
            <main className="max-w-2xl mx-auto shadow-xl">
                <Fieldset legend="Create a new post">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <section>
                            <TextInput
                                label="Title"
                                placeholder="Title"
                                {...register('title', {required: true})}
                                className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
                            ></TextInput>
                        </section>

                        <section>
                            <TextInput label="Path of new post" placeholder="Path of new post" {...register('path', {required: true})}></TextInput>
                        </section>

                        <section>
                            <label className="font-medium text-sm">Content</label>
                            {/*Only triggers the migration of editorContent data from editor to createPost component */}
                            <Editor
                                isEditMode={false}
                                onTriggerSubmit={isTriggerSubmit}
                                onSubmitSetBlockData={(blocks) => handSubmitSetBlockData(blocks)}
                            />
                        </section>

                        <Group justify="flex-end" mt="md">
                            <section className="flex justify-between">
                                <div className="mr-2">
                                    <CustomButton onClick={() => handlePreview()} name="Preview"></CustomButton>
                                </div>
                                <Button type="submit">Submit</Button>
                            </section>
                        </Group>
                    </form>
                </Fieldset>
            </main>
            <section className="max-w-2xl mx-auto shadow-xl my-4">{newPost ? <PreviewSection post={newPost} /> : null}</section>
        </>
    );
};
export default CreatePost;
