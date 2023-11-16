import React, {Fragment, useState} from 'react';
import CreatePost from '../Post/CreatePost';
import PostFeed from '../PostFeed/PostFeed';
import {Button} from '@mantine/core';
import {useAuthoriser} from '../../hooks/useAuthoriser.ts';
import MiniSideNavMenu from '../MiniSideNavMenu/MiniSideNavMenu.tsx';
import {useNavigate} from 'react-router-dom';

const PostContainer = () => {
    // const [isCreatePost, setIsCreatePost] = useState<boolean>(false);
    const {validateIsAdmin} = useAuthoriser();
    const navigate = useNavigate();
    const createPostPath = window.location.pathname + '/createNewPost';

    return (
        <Fragment>
            <section className="mx-auto mb-10">
                <div className="">{<PostFeed />}</div>
                {/* TODO: Add styling for this so that it is center*/}
                {/* Add a create postData mini nav on the right side, only admins are allowed to create postData*/}

                <div className="">
                    <label htmlFor="createPost"></label>
                    {/*{validateIsAdmin() ? <MiniSideNavMenu onClickPost={() => navigate(createPostPath)} /> : null}*/}
                </div>
            </section>
        </Fragment>
    );
};

export default PostContainer;
