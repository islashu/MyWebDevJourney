import React from 'react';
import Footer from '../../components/Footer/footer';
import PostFeed from '../../components/PostFeed/PostFeed.tsx';

const HomePage = () => {
    return (
        <>
            <div className="p-4">{<PostFeed />}</div>
        </>
    );
};

export default HomePage;
