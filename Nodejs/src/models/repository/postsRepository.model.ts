import {RepositoryProps} from './repository.model';
import {Post, PostDocumentProps} from '../post.model';

export interface PostsRepositoryProps extends RepositoryProps {
    findPostByPaginationAndPath(pageParam: number, limit: number, path: string): Promise<PostDocumentProps[]>;
    save(post: any): Promise<void>;
    delete(uuid: any): Promise<void>;
    findByUuid(uuid: string): Promise<PostDocumentProps>;
}
