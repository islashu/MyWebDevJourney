import React from 'react';

/*
 * Provides custom styling for code editorContent and works in conjunction with the react-editor-js renderer
 * */
function CustomCodeRenderer({data}: any) {
    return (
        <>
            <pre className="font-bold p-4 border border-separate w-full shadow-md rounded-2xl">
                <code className="text-gray-600 text-sm w-full whitespace-pre-line rounded-md">{data.code}</code>
            </pre>
        </>
    );
}

export default CustomCodeRenderer;
