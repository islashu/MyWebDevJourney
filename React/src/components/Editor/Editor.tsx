import EditorJS from '@editorjs/editorjs';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
// import { uploadFiles } from '@/lib/uploadthing'
// import { PostCreationRequest, PostValidator } from '@/lib/validators/postDataFromFeed'
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';

import {useNavigate} from 'react-router-dom';
import {Button} from '@mantine/core';
import {BlockProps, PostProps} from '../../model/post.model.ts';
import {uploadFiles} from '../../util/uploadthing.ts';

interface EditorProps {
    // If you want to render prev data into the editor, pass it in here
    content?: any;
    // Editor has two modes, edit mode and create mode, if false, assume create mode with no data loaded in
    isEditMode: boolean;
    // Pass a parent function here to retrieve the data from the editor
    onSubmitSetBlockData?: (blocks: any) => void;
    // This is a dummy dependency variable to trigger the useEffect to submit the data. This is a hacky way to get the editor to pass you data since parent cannot directly cause children to send data outwards
    onTriggerSubmit: boolean;
}

export const Editor = ({
    content,
    isEditMode,
    onSubmitSetBlockData,
    onTriggerSubmit
}: {
    content?: any;
    isEditMode: boolean;
    onTriggerSubmit: boolean;
    onSubmitSetBlockData?: (blocks: any) => void;
}) => {
    const {
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>({
        // resolver: zodResolver(PostValidator),
        // defaultValues: {
        //     subredditId,
        //     title: '',
        //     editorContent: null
        // }
    });

    const ref = useRef<EditorJS>();

    const [isMounted, setIsMounted] = useState<boolean>(false);
    // const pathname = usePathname();

    // const {mutate: createPost} = useMutation({
    //     mutationFn: async ({title, editorContent, subredditId}: PostCreationRequest) => {
    //         const payload: PostCreationRequest = {title, editorContent, subredditId};
    //         const {data} = await axios.postDataFromFeed('/api/subreddit/postDataFromFeed/create', payload);
    //         return data;
    //     },
    //     onError: () => {
    //         return toast({
    //             title: 'Something went wrong.',
    //             description: 'Your postDataFromFeed was not published. Please try again.',
    //             variant: 'destructive'
    //         });
    //     },
    //     onSuccess: () => {
    //         // turn pathname /r/mycommunity/submit into /r/mycommunity
    //         const newPathname = pathname.split('/').slice(0, -1).join('/');
    //         router.push(newPathname);
    //
    //         router.isRefresh();
    //
    //         return toast({
    //             description: 'Your postDataFromFeed has been published.'
    //         });
    //     }
    // });

    const initializeEditor = useCallback(async () => {
        const EditorJS = (await import('@editorjs/editorjs')).default;
        const Header = (await import('@editorjs/header')).default;
        const Embed = (await import('@editorjs/embed')).default;
        const Table = (await import('@editorjs/table')).default;
        const List = (await import('@editorjs/list')).default;
        const Code = (await import('@editorjs/code')).default;
        const LinkTool = (await import('@editorjs/link')).default;
        const InlineCode = (await import('@editorjs/inline-code')).default;
        const ImageTool = (await import('@editorjs/image')).default;

        if (!ref.current) {
            const editor = new EditorJS({
                holder: 'editor',
                onReady() {
                    console.log("Editor's ready!");

                    // Storing the editor location into ref
                    ref.current = editor;
                    // isEditMode = true, then render the data into the editor, else assume that user wants to create new postDataFromFeed
                    console.log('isEditMode', isEditMode);
                    console.log('content', content);
                    if (isEditMode) {
                        renderDataIntoEditor(content);
                    }
                },
                placeholder: 'Type here to write your post...',
                inlineToolbar: true,
                data: {blocks: []},
                tools: {
                    header: Header,
                    // Drag and drop only, the link does not work as of now
                    linkTool: {
                        class: LinkTool
                    },
                    list: List,
                    code: Code,
                    inlineCode: InlineCode,
                    table: Table,
                    embed: Embed
                    /*
                     * TODO: Fix the image uploader
                     * */
                    // image: {
                    //     class: ImageTool,
                    //     config: {
                    //         uploader: {
                    //             // Automatic upload by Editorjs when user tries to upload a file
                    //             async uploadByFile(file: File) {
                    //                 let array = [];
                    //                 array.push(file);
                    //                 // upload to uploadthing
                    //                 const [res] = await uploadFiles(array, 'imageUploader');
                    //
                    //                 return {
                    //                     success: 1,
                    //                     file: {
                    //                         url: res.url
                    //                     }
                    //                 };
                    //             }
                    //         }
                    //     }
                    // },
                }
            });
        }
    }, []);

    /*
     Sets the data into the editor for editing
    */
    const renderDataIntoEditor = (postData) => {
        // This is supposed to be a json but it is expecting a string for some reason
        ref.current?.render(postData);
    };

    /*
     * There is no submit button, wrap the editor with an on submit button on the outside and attach it to the form id
     * This design allows for buttons to not depend on this editor
     * So editor will not come auto-fit with a button allowing for a better customisation
     * */

    async function onSubmit() {
        const blocks = await ref.current?.save();
        // Pass data to createPost
        onSubmitSetBlockData(blocks);
    }

    useEffect(() => {
        async function triggerSubmit() {
            console.log('triggered clicked inside editor');
            // To test if the other useEffect will work in sequence
            // await new Promise((resolve) => setTimeout(resolve, 5000));
            await onSubmit();
        }

        triggerSubmit();
    }, [onTriggerSubmit]);

    /* --------------------- Dismounting and initialising of editor (MUST BE THE LAST FUNCTIONS IN THIS FILE) -----------------------------------*/

    /* Checks if the editor is mounted because if the user decides to navigate to a different tab with no editors
     * we do not need to initialise the editor by importing the heavy dependencies at the top
     * */

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMounted(true);
        }
    }, []);

    /* Initialise the editor and destroys if it unmounted*/
    useEffect(() => {
        const init = async () => {
            await initializeEditor();
        };

        if (isMounted) {
            init();

            return () => {
                ref.current?.destroy();
                ref.current = undefined;
            };
        }
    }, [isMounted, initializeEditor]);

    /*
     * This must be after all the useEffect or else editor will not be initialised
     * */
    if (!isMounted) {
        return null;
    }
    /* --------------------- End -----------------------------------*/

    /*
     useEffect(() => {
         if (Object.keys(errors).length) {
             for (const [_key, value] of Object.entries(errors)) {
                 value;
                 toast({
                     title: 'Something went wrong.',
                     description: (value as {message: string}).message,
                     variant: 'destructive'
                 });
             }
         }
     }, [errors]);
    */

    return (
        <div className=" p-4 bg-zinc-50 rounded-lg border border-zinc-200">
            <form id="reference-post-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="prose prose-stone dark:prose-invert">
                    {/*Editor*/}
                    <div id="editor" />
                    <p className="text-sm text-gray-500">
                        Use <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd> to open the command menu.
                    </p>
                </div>
            </form>
        </div>
    );
};
