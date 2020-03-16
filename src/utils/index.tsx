import { IPost } from '../interfaces/post.interface';

import { PostsQuery } from '../../graphql-types';

import { ColorsEnum } from '../enums/colors.enum';
import { CategoriesEnum } from '../enums/categories.enum';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPost = (node: any) => {
    const frontmatter = node.frontmatter;

    if (frontmatter) {
        return {
            title: frontmatter.title || '',
            content: node.html || '',
            cover: frontmatter.cover || undefined,
            coverColor: frontmatter.coverColor as ColorsEnum || ColorsEnum.GREY,
            categories: (frontmatter.categories || '').split(',') as CategoriesEnum[],
            publicUrl: frontmatter.publicUrl || '',
            date: frontmatter.date || '',
            originName: frontmatter.originName || '',
            originLink: frontmatter.originLink || '',
            originAuthor: frontmatter.originAuthor || ''
        };
    }

    return {} as IPost;
};

export const getPosts = (data: PostsQuery, locale: string): IPost[] => {
    return data.allMarkdownRemark.edges
        .filter(({node}) => node.frontmatter?.lang === locale)
        .map(({node}) => getPost(node));
};
