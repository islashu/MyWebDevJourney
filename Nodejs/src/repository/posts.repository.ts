import {Post, PostDocumentProps} from '../models/post.model';
import {PostsRepositoryProps} from '../models/repository/postsRepository.model';

export class PostsRepositoryMongo implements PostsRepositoryProps {
    constructor() {}

    async findPostByPaginationAndPath(pageParam: number, limit: number, path: string): Promise<PostDocumentProps[]> {
        if (!pageParam) {
            pageParam = 1;
        }

        if (!limit) {
            limit = 2;
        }

        const result = await Post.find({path: path})
            .sort({createdAt: 'desc'})
            .limit(limit)
            .skip((pageParam - 1) * limit)
            .exec();
        return result;
    }

    async save(post: any): Promise<void> {
        await post.save();
    }

    async delete(uuid: any): Promise<void> {
        await Post.deleteOne({uuid: uuid});
    }

    async findByUuid(uuid: string): Promise<PostDocumentProps> {
        return Post.findOne({uuid: uuid});
    }
}
