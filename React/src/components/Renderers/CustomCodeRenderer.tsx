import React from 'react';

/*
 * Provides custom styling for code editorContent and works in conjunction with the react-editor-js renderer
 * */
function CustomCodeRenderer({data}: any) {
    return (
        <>
            <pre className="font-bold border-black rounded-md p-4 border-solid border-2 w-96">
                <code className="text-gray-600 text-sm">{data.code}</code>
            </pre>
        </>
    );
}

export default CustomCodeRenderer;
