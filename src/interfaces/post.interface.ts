import { PostCategoriesEnum } from '../enums/post-categories.enum';

export interface IPost {
    readonly sys: {
        readonly id: string;
        readonly type: string;
        readonly createdAt: string;
        readonly updatedAt: string;
    };
    readonly fields: {
        readonly title: string;
        readonly description?: string;
        readonly content: string;
        readonly categories: PostCategoriesEnum[];
        readonly publicUrl: string;
        readonly date: string;
        readonly featured: boolean;
        readonly originName?: string;
        readonly originLink?: string;
        readonly originAuthor?: string;
    };
}
