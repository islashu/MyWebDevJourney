'use client';

// import { formatTimeToNow } from '@/lib/utils'
// import { Post, User, Vote } from '@prisma/client'
import {MessageSquare} from 'lucide-react';
import React, {FC, useEffect, useRef, useState} from 'react';
import EditorOutput from '../Editor/EditorOutput';
import {Link, useNavigate} from 'react-router-dom';
import {Editor} from '../Editor/Editor.tsx';
import {Button} from '@mantine/core';
import {PostProps, PostTO} from '../../model/post.model.ts';
import TextareaAutosize from 'react-textarea-autosize';
import {useHttpPostsJwt} from '../../api/posts/posts.jwt.api.ts';
import DeleteConfirmationModal from '../Modal/DeleteConfirmationModal.tsx';
import {toast, ToastContainer} from 'react-toastify';
import {useAuthoriser} from '../../hooks/useAuthoriser.ts';
import {useForm} from 'react-hook-form';

/*
 * Each postDataFromFeed will manage the layout of the postDataFromFeed
 * */
const Post = ({postDataFromFeed, onUpdatePost}: {postDataFromFeed: PostProps; onUpdatePost: () => void}) => {
    // Each postDataFromFeed is essentially a form representation
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

    // Control if postDataFromFeed is a read only postDataFromFeed or in edit mode
    const [isEditing, setIsEditing] = useState<boolean>(false);
    // Store the editor data from the editor when editing mode is true
    const [editorBlocks, setEditorBlocks] = useState<any>([]);
    // Get the http request functions
    const {httpPostDeletePost, httpPostUpdatePost} = useHttpPostsJwt();
    // Store the newPostData before sending it to the backend
    const [updatedPostData, setUpdatedPostData] = useState({} as PostProps);
    // Control the delete modal open or close state
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    // Get the authoriser functions to check if user is an admin before allowing certain functions
    const {validateIsAdmin} = useAuthoriser();
    // A way to trigger the editor to send back the editorContent data
    const [isTriggerSubmit, setIsTriggerSubmit] = useState<boolean>(false);
    // A way to await on getting the editorContent data from editor since useState cannot be awaited
    const [lastAction, setLastAction] = useState<string>('');
    // Navigate to different pages
    const navigate = useNavigate();

    // Populate the postDataFromFeed into the form when edit mode is turned on
    useEffect(() => {
        setValue('title', postDataFromFeed.title);
        setValue('tabPath', postDataFromFeed.path);
    }, [isEditing]);

    // Auto execute deleting of postDataFromFeed by sending http requests
    const handleDelete = async () => {
        try {
            // As standardised by the backend, the postDataFromFeed is sent as a TO object
            const postTO: PostTO = new PostTO({uuid: postDataFromFeed.uuid});

            await httpPostDeletePost(postTO);
            setIsDeleteModalOpen(false);
            toast.success('Successfully deleted postDataFromFeed');
            // Refresh the postFeed on delete
            onUpdatePost();
            navigate(postDataFromFeed.path);
        } catch (err) {
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
            setIsTriggerSubmit(!isTriggerSubmit);
            setLastAction('save');
        } catch (err) {
            console.log(err);
        }
    };

    /*Helper function to await for editor to send back the editorContent data before creating the new Post Data to be sent to the backend*/
    useEffect(() => {
        const newPostData = {
            uuid: postDataFromFeed.uuid,
            title: getValues('title'),
            editorContent: editorBlocks,
            path: getValues('tabPath')
        } as PostProps;

        setUpdatedPostData(newPostData);
    }, [editorBlocks]);

    useEffect(() => {
        const submit = async () => {
            //--------- Change logic for sending request to backend here ------------
            await toast.promise(
                async () => {
                    return await httpPostUpdatePost(updatedPostData);
                },
                {
                    pending: 'Updating tab...',
                    success: 'Tab updated successfully',
                    error: 'Error updating tab'
                }
            );
            //--------- end of logic for sending request ------------
        };

        if (lastAction === 'save') {
            try {
                console.log('Updated post data');
                console.log(updatedPostData);
                submit().then((response) => {
                    // Refresh the postFeed on update
                    onUpdatePost();
                    navigate(updatedPostData.path);
                });
            } catch (err) {
                console.log(err);
            }
            return;
        }
    }, [updatedPostData]);
    /*--------------- End of Submit -------------------*/

    return (
        <div className="rounded-md bg-white shadow">
            <div className="px-6 py-4 flex justify-between">
                <div className="w-0 flex-1">
                    <TextareaAutosize
                        readOnly={!isEditing}
                        {...register('title', {required: true})}
                        placeholder="Title"
                        className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
                    ></TextareaAutosize>

                    {isEditing ? (
                        <>
                            <div className="border-blacks border w-40 h-8">
                                <label className="font-bold" htmlFor="pathInput">
                                    Path of new post:
                                </label>
                                <input
                                    type="text"
                                    id="tabPath"
                                    className="bg-sky-300"
                                    {...register('tabPath', {required: true})}
                                    placeholder="Relative Path"
                                ></input>
                            </div>
                        </>
                    ) : null}

                    <div className="max-h-40 min-w-400 mt-1 text-xs text-gray-500">
                        {/* post.editorContent vs post.editorContent.editorContent*/}
                        {isEditing && postDataFromFeed.editorContent ? (
                            <>
                                <Editor
                                    content={postDataFromFeed.editorContent}
                                    isEditMode={true}
                                    onSubmitSetBlockData={(blocks) => handSubmitSetBlockData(blocks)}
                                    onTriggerSubmit={isTriggerSubmit}
                                ></Editor>
                            </>
                        ) : (
                            <EditorOutput editorContent={postDataFromFeed.editorContent} />
                        )}
                    </div>
                </div>
            </div>

            {/*Allows the switching from editorOutput <-> Editor depending on value*/}
            {validateIsAdmin() ? (
                <>
                    <div className="w-full mx-auto">
                        {/* TODO: abstract into separate component*/}
                        {isEditing ? (
                            <Button type="submit" onClick={() => handleSave()}>
                                Save
                            </Button>
                        ) : null}
                        {isEditing ? <Button onClick={() => setIsEditing(false)}>Cancel</Button> : null}
                    </div>

                    <div>
                        <>
                            {/* TODO: abstract into separate component*/}
                            {/* Edit button for postDataFromFeed*/}
                            {isEditing ? null : <Button onClick={() => setIsEditing(true)}>Edit</Button>}
                            {/* Delete button for postDataFromFeed*/}
                            {isEditing ? null : <Button onClick={() => setIsDeleteModalOpen(true)}>Delete</Button>}
                        </>
                    </div>
                    <div className="bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6">
                        {/*{postData.author}*/}
                        {/*{postData.createdAt.toString()}*/}
                        {/*{postData.updatedAt.toString()}*/}
                    </div>
                </>
            ) : null}

            <DeleteConfirmationModal isOpen={isDeleteModalOpen} onDelete={() => handleDelete()} onCancel={() => setIsDeleteModalOpen(false)} />
            <ToastContainer position={'top-right'} autoClose={1000} closeOnClick={true} />
        </div>
    );
};
export default Post;
