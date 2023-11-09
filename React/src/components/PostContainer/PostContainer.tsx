import React, {Fragment, useState} from 'react';
import CreatePost from '../Post/CreatePost';
import PostFeed from '../PostFeed/PostFeed';
import {Button} from '@mantine/core';
import {useAuthoriser} from '../../hooks/useAuthoriser.ts';
import MiniSideNavMenu from '../MiniSideNavMenu/MiniSideNavMenu.tsx';

const PostContainer = () => {
    const [isCreatePost, setIsCreatePost] = useState<boolean>(false);
    const {validateIsAdmin} = useAuthoriser();

    return (
        <Fragment>
            <section className="grid grid-cols-4 border border-red-500 gap-4">
                <div className="col-span-3 border-2 border-black">
                    {isCreatePost ? <CreatePost /> : <PostFeed />}
                    {validateIsAdmin() ? 'Generate Post Side Nav' : 'Generate something else'}
                </div>
                {/* TODO: Add styling for this so that it is center*/}
                {/* Add a create postDataFromFeed mini nav on the right side, only admins are allowed to create postDataFromFeed*/}

                <div className="col-span-1">
                    <label htmlFor="createPost"></label>
                    {validateIsAdmin() ? <MiniSideNavMenu onClickPost={() => setIsCreatePost(!isCreatePost)} /> : null}
                </div>
            </section>
        </Fragment>
    );
};

export default PostContainer;
