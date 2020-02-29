enum PostCategoryEnum {
    TRANSLATIONS = 'Translations',
    ARTICLES = 'Articles'
}

export interface IPost {
    readonly sys: {
        readonly id: string;
        readonly type: string;
        readonly createdAt: string;
        readonly updatedAt: string;
    };
    readonly fields: {
        readonly title: string;
        readonly description: string;
        readonly content: string;
        readonly category: PostCategoryEnum[];
        readonly publicUrl: string;
        readonly featured: boolean;
        readonly originName?: string;
        readonly originLink?: string;
        readonly originAuthor?: string;
    };
}
