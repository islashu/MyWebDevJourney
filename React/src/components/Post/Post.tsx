'use client';

// import { formatTimeToNow } from '@/lib/utils'
// import { Post, User, Vote } from '@prisma/client'
import {MessageSquare} from 'lucide-react';
import React, {FC, useEffect, useRef, useState} from 'react';
import EditorOutput from '../Editor/EditorOutput';
import {Link, useNavigate} from 'react-router-dom';
import {Editor} from '../Editor/Editor.tsx';
import {Alert, Button, Fieldset, Group, Modal, TextInput} from '@mantine/core';
import {PostProps, PostTO} from '../../model/post.model.ts';
import TextareaAutosize from 'react-textarea-autosize';
import {useHttpPostsJwt} from '../../api/posts/posts.jwt.api.ts';
import DeleteConfirmationModal from '../Modal/DeleteConfirmationModal.tsx';
import {useAuthoriser} from '../../hooks/useAuthoriser.ts';
import {useForm} from 'react-hook-form';
import {TbAlertCircleFilled} from 'react-icons/tb';
import CustomButton from '../CustomMantineComponents/common/CustomButton/CustomButton.tsx';
import {useToast} from '../../hooks/useToast.tsx';
import {StringSplicerBuilder} from '../../util/stringSplicerBuilder.ts';

// If empty postData incase of server has issues sending back data
const emptyPostData = {
    uuid: '',
    title: '',
    editorContent: {
        blocks: []
    },
    path: '',
    updatedAt: '',
    createdAt: '',
    author: ''
};

/*
 * Each postData will manage the layout of the postData
 * */

interface PostComponentProps {
    postData: PostProps;
    onUpdatePost: () => void;
}
const Post: FC<PostComponentProps> = ({postData = emptyPostData, onUpdatePost}) => {
    // Each postData is essentially a form representation
    // In react hook form, you don't need to record the onChange value, as it is done automatically by the library without re-rendering.
    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isValid, isSubmitSuccessful},
        setValue,
        getValues,
        reset
    } = useForm();

    // Control if postData is a read only postData or in edit mode
    const [isEditing, setIsEditing] = useState<boolean>(false);
    // Store the editor data from the editor when editing mode is true
    const [editorBlocks, setEditorBlocks] = useState<any>([]);
    // Get the http request functions
    const {httpPostDeletePost, httpPostUpdatePost} = useHttpPostsJwt();
    // Store the newPostData before sending it to the backend
    const [updatedPostData, setUpdatedPostData] = useState({} as PostProps);
    // Control the delete modal open or close state
    const [isToggle, setIsToggle] = useState<boolean>(false);
    // Get the authoriser functions to check if user is an admin before allowing certain functions
    const {validateIsAdmin} = useAuthoriser();
    // A way to trigger the editor to send back the editorContent data
    const [isTriggerSubmit, setIsTriggerSubmit] = useState<boolean>(false);
    // A way to await on getting the editorContent data from editor since useState cannot be awaited
    const [lastAction, setLastAction] = useState<string>('');
    // Navigate to different pages
    const navigate = useNavigate();
    // Toasts
    const {toastSuccess, toastFailure, toastLoading, updateToastLoadingToSuccess, updateToastLoadingToFailure} = useToast();
    // Loading state
    const [isLoading, setIsLoading] = useState(false);

    // Populate the postData into the form when edit mode is turned on
    useEffect(() => {
        setValue('title', postData.title);
        setValue('tabPath', postData.path);
    }, [isEditing]);

    // Auto execute deleting of postData by sending http requests
    const handleDelete = async () => {
        try {
            // As standardised by the backend, the postData is sent as a TO object
            const postTO: PostTO = new PostTO({uuid: postData.uuid});
            toastLoading('loadPostDelete');
            setIsLoading(true);
            await httpPostDeletePost(postTO);
            setIsToggle(false);
            updateToastLoadingToSuccess('loadPostDelete', 'Delete successful', 'Post has been deleted!');
            // Refresh the postFeed on delete
            setIsLoading(false);
            onUpdatePost();
            navigate(postData.path);
        } catch (err) {
            updateToastLoadingToFailure('loadPostDelete', 'Delete failed', 'Please try again');
            setIsLoading(false);
            console.log(err);
        }
    };

    // This is the helper parent function (required by the child) to pass to child to get and set editorContent data from editor
    const handSubmitSetBlockData = (blocks) => {
        setEditorBlocks(blocks);
    };

    /*--------------- Submit functions -------------------*/
    const handleSave = async () => {
        /*
         Due to the react state update restriction where updating state is uses a different queue behind the scenes.
         Calling set consecutively will not update the state immediately.

         We use this method so simulate an await like behaviour.
         1. handleSave triggers isTriggerState change
         2. Editor which depends on this isTriggerState change, re-renders which send back data to post component and save
         3. editorBlocks state changes which useEffect depends on which causes the inner function to run to create new Post object
         4. useEffect depends on the change of the new Post object, executes when newPostData changes which sends out.

        */
        try {
            toastLoading('loadPostUpdate');
            setIsLoading(true);
            setIsTriggerSubmit(!isTriggerSubmit);
            setLastAction('save');
        } catch (err) {
            setIsLoading(false);
            updateToastLoadingToFailure('loadPostUpdate', 'Update failed', 'Please try again');
            console.log(err);
        }
    };

    /*Helper function to await for editor to send back the editorContent data before creating the new Post Data to be sent to the backend*/
    useEffect(() => {
        const newPostData = {
            uuid: postData.uuid,
            title: getValues('title'),
            editorContent: editorBlocks,
            path: getValues('tabPath')
        } as PostProps;

        setUpdatedPostData(newPostData);
    }, [editorBlocks]);

    useEffect(() => {
        const submit = async () => {
            //--------- Change logic for sending request to backend here ------------
            await httpPostUpdatePost(updatedPostData);
            updateToastLoadingToSuccess('loadPostUpdate', 'Update successful', `Post < ${updatedPostData.title} > has been Updated!`);
            setIsLoading(false);
            //--------- end of logic for sending request ------------
        };

        if (lastAction === 'save') {
            try {
                submit().then((response) => {
                    // Refresh the postFeed on update
                    onUpdatePost();
                    navigate(updatedPostData.path);
                });
            } catch (err) {
                updateToastLoadingToFailure('loadPostUpdate', 'Update failed', 'Please try again');
                console.log(err);
                setIsLoading(false);
            }
            return;
        }
    }, [updatedPostData]);
    /*--------------- End of Submit -------------------*/

    return (
        <div className=" max-w-4xl mx-auto relative">
            <div className="px-6 py-1 relative  rounded-2xl border-separate border border-slate-300">
                <section>
                    {isEditing ? (
                        <>
                            <TextInput
                                label="Title"
                                placeholder="Title"
                                {...register('title', {required: true})}
                                className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none pb-2"
                            ></TextInput>
                        </>
                    ) : (
                        <TextareaAutosize
                            {...register('title', {required: true})}
                            readOnly={!isEditing}
                            placeholder="Title"
                            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold focus:outline-none"
                        ></TextareaAutosize>
                    )}
                </section>

                <section className="w-full pb-2">
                    {isEditing ? (
                        <>
                            <TextInput
                                label="Path of new post"
                                type="text"
                                id="tabPath"
                                {...register('tabPath', {required: true})}
                                placeholder="Full path of post"
                            ></TextInput>
                        </>
                    ) : null}
                </section>

                <section className="w-full">
                    {/* post.editorContent vs post.editorContent.editorContent*/}
                    {isEditing && postData.editorContent ? (
                        <>
                            <Editor
                                content={postData.editorContent}
                                isEditMode={true}
                                onSubmitSetBlockData={(blocks) => handSubmitSetBlockData(blocks)}
                                onTriggerSubmit={isTriggerSubmit}
                            ></Editor>
                        </>
                    ) : (
                        <div className="w-full">
                            <EditorOutput editorContent={postData.editorContent} />
                        </div>
                    )}
                </section>
            </div>

            {/*Allows the switching from editorOutput <-> Editor depending on value*/}
            <Group className="px-6 relative" justify="flex-end" mt="md">
                <span className="text-xs">{'By: ' + (postData.author || 'Anonymous')} </span>
                <span className="italic text-xs">{'Last Update: ' + postData.updatedAt.toString().split('T')[0] || 'No date'}</span>
                <span className="italic text-xs">{'Last Update: ' + postData.updatedAt.toString().split('T')[0] || 'No date'}</span>
            </Group>

            {validateIsAdmin() ? (
                <>
                    <Group className="px-6 relative" justify="flex-end" mt="md">
                        <section className="flex justify-between">
                            {isEditing ? (
                                <>
                                    <Button type="submit" onClick={() => handleSave()}>
                                        Save
                                    </Button>
                                    <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                                </>
                            ) : (
                                <>
                                    <Button onClick={() => setIsEditing(true)}>Edit</Button>
                                    <Button onClick={() => setIsToggle(true)}>Delete</Button>
                                </>
                            )}
                        </section>
                    </Group>
                </>
            ) : null}

            <Modal opened={isToggle} onClose={() => setIsToggle(!isToggle)} size="50%" title="Delete existing tab">
                <Fieldset>
                    <div className="text-xl p-4">Are you sure you want to continue deleting this parent post?</div>
                    <Alert className=" p-4 italic" title="Note" icon={<TbAlertCircleFilled size={20} />}>
                        You can edit the post if you would like to amend the post.
                    </Alert>
                </Fieldset>

                <Group justify="flex-end" mt="md">
                    <CustomButton onClick={() => handleDelete()} color="red" name="Delete"></CustomButton>
                    <CustomButton onClick={() => setIsToggle(false)} name="Cancel"></CustomButton>
                </Group>
            </Modal>
        </div>
    );
};
export default Post;
