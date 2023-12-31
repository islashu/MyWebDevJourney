import React, {Fragment, useEffect, useRef, useState} from 'react';
import Post from '../Post/Post.tsx';
import {useIntersection} from '@mantine/hooks';
import {useInfiniteQuery} from '@tanstack/react-query';
import axios from '../../api/config/axios.ts';
import {Loader2} from 'lucide-react';
import {Outlet, useParams} from 'react-router-dom';
import {PaginationTO, PostTO, PostTOProps} from '../../model/post.model.ts';
import {POSTS_INFINITE_SCROLL_PAGINATION_RESULTS} from '../config.ts';
import {useHttpPosts} from '../../api/posts/posts.api.ts';
import NoPostFeed from './NoPostFeed.tsx';
import Footer from '../Footer/footer.tsx';

/*
 * This is a container that will render out all the postData and will have infinite scroll.
 * */
const PostFeed = () => {
    // -----------------Test-----------------
    const initialPosts = [];
    // -----------------Test-----------------
    // The value does not matter as long as it changes to cause a re-render
    const [isRerender, setIsRerender] = useState<boolean>(false);
    const lastPostRef = useRef<HTMLElement>(null);
    const {httpPostsGetPostWithPagination} = useHttpPosts();
    const fullPath = window.location.pathname;
    const {tab} = useParams();
    /*
     Equivalent to findDocumentById, locates the second last postData so it can render the next set of posts
    */
    const {ref, entry} = useIntersection({
        root: lastPostRef.current,
        threshold: 1
    });

    /*
     This resets the useInfiniteQuery hook when the link changes.

     This is the most important function in this file, please do not remove this.

     Due to the caching properties of useInfiniteQuery, it will not reset the data even when the page re-renders,
     So since are using the same component to load different posts, we need to reset the data when the link changes.
     Without this function, the data will be cached and will not be reset when the link changes, so the data will be the same as the previous link.
     And when requesting for more posts it will append the new posts to the old posts of the previous link.

     This took hours upon hours to figure out, please do not remove this.
    */
    useEffect(() => {
        remove();
    }, [tab, fullPath, isRerender]);

    // Infinite scroll
    let {data, fetchNextPage, isFetchingNextPage, remove} = useInfiniteQuery(
        ['infinite-query'],
        // Change this for max page before fetching next page, this run the fetchNextPage function below
        async ({pageParam = 1}) => {
            const INFINITE_SCROLL_PAGINATION_RESULTS = 2;

            const relativePath = fullPath;
            const paginationTO = new PaginationTO({path: relativePath, pageParam: pageParam, limit: POSTS_INFINITE_SCROLL_PAGINATION_RESULTS});
            try {
                const posts: PostTOProps[] = await httpPostsGetPostWithPagination(paginationTO);
                if (posts.length > 0) {
                    return posts;
                }
                return [];
            } catch (err) {}
        },
        /*
         Appending the results above into an internal cache where pages and pageParams are stored in an ever increasing array. Note that this is design like so because infinite query is build specifically for pageParam only
         That is why we don't seem to need to create an array to store all these
        */
        {
            // Increments the pageParam by 1, this function runs before the async function above
            getNextPageParam: (lastPage, allPages) => {
                return allPages.length ? allPages.length + 1 : undefined;
            },
            initialData: {pages: [initialPosts], pageParams: [1]}
        }
    );

    // Check if the last postData is in view
    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage(); // Load more posts when the last postData comes into view
        }
    }, [entry, fetchNextPage]);

    /*
     ?? if callback returns a null or undefined from the infinite query then return the initialPosts
    */
    let posts = data?.pages.flatMap((page) => page) ?? initialPosts;

    return (
        <>
            <ul className="flex flex-col col-span-2 space-y-2">
                {posts.length > 0 ? (
                    posts.map((post, index) => {
                        // console.log(index);
                        if (index === posts.length - 1) {
                            // Add a ref to the last postData in the list
                            return (
                                <li key={index} ref={ref}>
                                    <Post postData={post} onUpdatePost={() => setIsRerender(!isRerender)} />
                                </li>
                            );
                        } else {
                            return (
                                <li key={index}>
                                    <Post postData={post} onUpdatePost={() => setIsRerender(!isRerender)} />
                                </li>
                            );
                        }
                    })
                ) : (
                    <NoPostFeed />
                )}

                {isFetchingNextPage && (
                    <li className="flex justify-center">
                        <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
                    </li>
                )}
            </ul>
        </>
    );
};

export default PostFeed;
