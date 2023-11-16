import EditorJS from '@editorjs/editorjs';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
// import { uploadFiles } from '@/lib/uploadthing'
// import { PostCreationRequest, PostValidator } from '@/lib/validators/postData'
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
    //         const {data} = await axios.postData('/api/subreddit/postData/create', payload);
    //         return data;
    //     },
    //     onError: () => {
    //         return toast({
    //             title: 'Something went wrong.',
    //             description: 'Your postData was not published. Please try again.',
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
    //             description: 'Your postData has been published.'
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
        const ColorPlugin = (await import('editorjs-text-color-plugin')).default;
        const Undo = (await import('editorjs-undo')).default;
        const DragDrop = (await import('editorjs-drag-drop')).default;
        const Warning = (await import('@editorjs/warning')).default;
        const Checklist = (await import('@editorjs/checklist')).default;
        // const Alert = (await import('editorjs-alert')).default; // requires custom renderer
        // const NestedCheckList = (await import('@calumk/editorjs-nested-checklist')).default; // requires custom renderer
        // const NestedList = (await import('@editorjs/nested-list')).default; // requires custom renderer

        if (!ref.current) {
            const editor = new EditorJS({
                holder: 'editor',
                onReady() {
                    // Storing the editor location into ref
                    ref.current = editor;
                    new DragDrop(editor);
                    new Undo({editor});
                    // isEditMode = true, then render the data into the editor, else assume that user wants to create new postData
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
                    embed: Embed,
                    color: {
                        class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
                        config: {
                            colorCollections: [
                                '#EC7878',
                                '#9C27B0',
                                '#673AB7',
                                '#3F51B5',
                                '#0070FF',
                                '#03A9F4',
                                '#00BCD4',
                                '#4CAF50',
                                '#8BC34A',
                                '#CDDC39',
                                '#FFF'
                            ],
                            defaultColor: '#FF1300',
                            type: 'text',
                            customPicker: true // add a button to allow selecting any colour
                        }
                    },
                    marker: {
                        class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
                        config: {
                            defaultColor: '#FFBF00',
                            type: 'marker',
                            icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`
                        }
                    },
                    checklist: {
                        class: Checklist,
                        inlineToolbar: true
                    }
                    // warning: {
                    //     class: Warning,
                    //     inlineToolbar: true,
                    //     shortcut: 'SHIFT+W',
                    //     config: {
                    //         titlePlaceholder: 'Title',
                    //         messagePlaceholder: 'Message'
                    //     }
                    // },
                    // alert: {
                    //     class: Alert,
                    //     inlineToolbar: true,
                    //     shortcut: 'SHIFT+A',
                    //     config: {
                    //         defaultType: 'primary',
                    //         messagePlaceholder: 'Enter something'
                    //     }
                    // },
                    // nestedchecklist: NestedCheckList
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
                    // }
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
            <div id="reference-post-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="prose prose-stone dark:prose-invert">
                    {/*Editor*/}
                    <div id="editor" />
                    <p className="text-sm text-gray-500">
                        Use <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd> to open the command menu.
                    </p>
                </div>
            </div>
        </div>
    );
};
