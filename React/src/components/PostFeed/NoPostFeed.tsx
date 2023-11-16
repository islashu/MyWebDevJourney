import React from 'react';
import {Alert, Button, Fieldset, Group, Modal, TextInput} from '@mantine/core';
import {useParams} from 'react-router-dom';

const NoPostFeed = () => {
    const {parentTab, childTab} = useParams();

    return (
        <div className=" max-w-4xl mx-auto relative">
            <div className="px-6 py-1 relative  rounded-2xl border-separate border border-slate-300 text-center">
                <Fieldset>
                    <span className="text-4xl font-bold">No post available for {childTab}</span>
                </Fieldset>
            </div>
        </div>
    );
};

export default NoPostFeed;
