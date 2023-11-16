import React from 'react';
import CustomButton from '../../components/CustomMantineComponents/common/CustomButton/CustomButton.tsx';
import Footer from '../../components/Footer/footer.tsx';
import Post from '../../components/Post/Post.tsx';
import {PostProps, PostTO} from '../../model/post.model.ts';
import PostFeed from '../../components/PostFeed/PostFeed.tsx';

const ReferencePage = () => {
    return (
        <>
            <section className="border-3 border-red-500">
                <div className="text-4xl"></div>
                {/*<div>*/}
                {/*    This is a collection of all my knowledge, this is a work in progress and will contain the vast majority of my knowledge in all*/}
                {/*    aspects of programming to which I best know of to the date it was updated. By no means is all the information in here correct,*/}
                {/*    this is simply a knowledge bank. The purpose of this is not to provide you with the information to do solve problems. Go to*/}
                {/*    stackoverflow instead. The purpose of this is to document my entire journey as well as my thought processes and logical thinking*/}
                {/*    for performing the actions. It serves as a gateway to why I do the things that I do. and how I have gotten better overtime. It is*/}
                {/*    an uncensored representation my ability at each step of my journey. It is to document how much I have grown in the years and my*/}
                {/*    thought processes have changed over the years with new knowledge. This website serve more as a motivation for other aspiring web*/}
                {/*    developers such as myself and want to relate to the struggles of becoming a great developer. It is a counteract to the existing*/}
                {/*    state of developers, showing that it seems amazingly easy to just become a developer but hide the amount of effort require to*/}
                {/*    really become one.*/}
                {/*</div>*/}
                <div className="p-4">{<PostFeed />}</div>
                {/*<CustomButton name="Get Started"></CustomButton>*/}
            </section>
        </>
    );
};

export default ReferencePage;
