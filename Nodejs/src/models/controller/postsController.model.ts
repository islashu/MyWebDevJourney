import {PaginationTOProps, PostDocumentProps} from '../post.model';
import {PostsRepositoryProps} from '../repository/postsRepository.model';

export interface PostsControllerProps {
    handleGetPostsWithPagination(pageParam: number, limit: number, path: string, db: PostsRepositoryProps): Promise<PostDocumentProps[]>;
    handleCreateNewPost(post: PostDocumentProps, db: PostsRepositoryProps): Promise<void>;
    handleUpdatePost(post: PostDocumentProps, db: PostsRepositoryProps): Promise<void>;
    handleDeletePost(uuid, db: PostsRepositoryProps): Promise<void>;
}
