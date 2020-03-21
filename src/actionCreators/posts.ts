import { IPost } from '../interfaces/post.interface';

export interface ISetPosts {
    type: 'SET_POSTS';
    payload: {
        locale: string;
        posts: IPost[];
    };
}

export const setPosts = (locale: string, posts: IPost[]): ISetPosts => ({
    type: 'SET_POSTS',
    payload: {
        locale,
        posts
    }
});
