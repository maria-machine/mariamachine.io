import { IPost } from './post.interface';

export interface IStatePosts {
    [key: string]: IPost[];
}
