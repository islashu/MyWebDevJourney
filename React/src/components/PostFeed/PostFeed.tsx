import React, {Fragment, useEffect, useRef, useState} from 'react';
import Post from '../Post/Post.tsx';
import {useIntersection} from '@mantine/hooks';
import {useInfiniteQuery} from '@tanstack/react-query';
import axios from '../../api/config/axios.ts';
import {Loader2} from 'lucide-react';
import {mockdata1, mockdata3, mockdata2, getDataBasedOnURL} from '../../api/posts/mockdata.ts';
import {useParams} from 'react-router-dom';
import {PaginationTO, PostTO, PostTOProps} from '../../model/post.model.ts';
import {POSTS_INFINITE_SCROLL_PAGINATION_RESULTS} from '../config.ts';
import {useHttpPosts} from '../../api/posts/posts.api.ts';

/*
 * This is a container that will render out all the postDataFromFeed and will have infinite scroll.
 * */
const PostFeed = () => {
    const {tab} = useParams();
    // -----------------Test-----------------
    const initialPosts = [];
    // -----------------Test-----------------
    // The value does not matter as long as it changes to cause a re-render
    const [isRerender, setIsRerender] = useState<boolean>(false);
    const lastPostRef = useRef<HTMLElement>(null);
    const {httpPostsGetPostWithPagination} = useHttpPosts();
    /*
     Equivalent to findDocumentById, locates the second last postDataFromFeed so it can render the next set of posts
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
    }, [tab, isRerender]);

    // Infinite scroll
    let {data, fetchNextPage, isFetchingNextPage, remove} = useInfiniteQuery(
        ['infinite-query'],
        // Change this for max page before fetching next page, this run the fetchNextPage function below
        async ({pageParam = 1}) => {
            const INFINITE_SCROLL_PAGINATION_RESULTS = 2;

            const relativePath = '/reference/' + tab;
            const paginationTO = new PaginationTO({path: relativePath, pageParam: pageParam, limit: POSTS_INFINITE_SCROLL_PAGINATION_RESULTS});
            try {
                const posts: PostTOProps[] = await httpPostsGetPostWithPagination(paginationTO);
                console.log('posts');
                // console.log(posts);
                // console.log(posts.length);
                // console.log(posts[0]);
                // console.log(posts[0].title);
                // console.log(posts[0].editorContent);
                // console.log(posts[0].uuid);
                // console.log(posts[0].path);
                console.log(posts.length > 0);
                if (posts.length > 0) {
                    return posts;
                }
                return [];
            } catch (err) {}
            // let start = (pageParam - 1) * POSTS_INFINITE_SCROLL_PAGINATION_RESULTS;
            // let end = pageParam * POSTS_INFINITE_SCROLL_PAGINATION_RESULTS;
            // let data = await getDataBasedOnURL('/reference/' + tab, start, end);
            // console.log(data);
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

    // Check if the last postDataFromFeed is in view
    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage(); // Load more posts when the last postDataFromFeed comes into view
        }
    }, [entry, fetchNextPage]);

    /*
     ?? if callback returns a null or undefined from the infinite query then return the initialPosts
    */
    let posts = data?.pages.flatMap((page) => page) ?? initialPosts;
    console.log('posts', posts);

    return (
        <>
            <title className="text-4xl font-bold">Post Feed</title>

            <ul className="flex flex-col col-span-2 space-y-6">
                {posts.length > 0
                    ? posts.map((post, index) => {
                          // console.log(index);
                          if (index === posts.length - 1) {
                              // Add a ref to the last postDataFromFeed in the list
                              return (
                                  <li key={index} ref={ref}>
                                      <Post postDataFromFeed={post} onUpdatePost={() => setIsRerender(!isRerender)} />
                                  </li>
                              );
                          } else {
                              return (
                                  <li key={index}>
                                      <Post postDataFromFeed={post} onUpdatePost={() => setIsRerender(!isRerender)} />
                                  </li>
                              );
                          }
                      })
                    : null}

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
