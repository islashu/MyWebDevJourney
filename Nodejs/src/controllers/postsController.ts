import {PostsControllerProps} from '../models/controller/postsController.model';
import {PostsRepositoryProps} from '../models/repository/postsRepository.model';
import {Post, PostDocumentProps, PostTOProps} from '../models/post.model';
import {INTERNAL_SERVER_ERROR} from '../util/codes/response.code';
import {ResponseError} from '../models/error.model';

/*
 * When to deconstruct vs when to pass in the whole TO object
 *
 * It all depends on the purpose of the function
 * What does the function do? if the function all the information in the TO object from the request
 * then it makes sense to pass in the whole TO object
 * else if the function only needs a few properties from the TO object then it makes sense to deconstruct
 * the TO object. In the case of creating a new post, you need all the post information from the TO object
 * so it makes sense to pass in the whole TO object. But for pagination, we really only need certain things.
 * We can use both here because we have dedicated an entire type of object to just params.
 *
 * Should we use the TO object or the Document object?
 * TO object will end its life cycle at the controller level. We will switch to the Document objects.
 *
 * */
export class PostsController implements PostsControllerProps {
    constructor() {}

    async handleGetPostsWithPagination(pageParam: number, limit: number, path: string, db: PostsRepositoryProps): Promise<PostDocumentProps[]> {
        return await db.findPostByPaginationAndPath(pageParam, limit, path);
    }

    async handleCreateNewPost(post: PostTOProps, db: PostsRepositoryProps): Promise<void> {
        const newPost = new Post({
            uuid: post.uuid,
            title: post.title,
            editorContent: post.editorContent,
            path: post.path,
            isPrivate: post.isPrivate,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            author: post.author
        });
        await db.save(newPost);
    }

    async handleUpdatePost(post: PostTOProps, db: PostsRepositoryProps): Promise<void> {
        const postFound = await db.findByUuid(post.uuid);
        if (!postFound) throw new ResponseError(INTERNAL_SERVER_ERROR, 'No post found');

        // Update postFound
        postFound.title = post.title;
        postFound.editorContent = post.editorContent;
        postFound.path = post.path;
        postFound.isPrivate = post.isPrivate;
        postFound.updatedAt = new Date();
        postFound.author = post.author;

        await db.save(postFound);
    }

    async handleDeletePost(uuid: string, db: PostsRepositoryProps): Promise<void> {
        await db.delete(uuid);
    }
}
