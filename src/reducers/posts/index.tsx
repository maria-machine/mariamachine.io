import { ISetPosts } from '../../actionCreators';

import { IStatePosts } from '../../interfaces/state-posts.interface';

const initialState = {
    ru: [],
    en: []
};

export type PostsActionsType = ISetPosts;

export const postsReducer = (state: IStatePosts = initialState, action: PostsActionsType): IStatePosts => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                ...state,
                [action.payload.locale]: action.payload.posts
            };
        default:
            return state;
    }
};
