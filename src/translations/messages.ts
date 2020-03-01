import { defineMessages } from 'react-intl';

import { PostCategoriesEnum } from '../enums/post-categories.enum';

export const messages = defineMessages({
    [PostCategoriesEnum.TRANSLATIONS]: {
        id: `app.categories.${PostCategoriesEnum.TRANSLATIONS}`
    },
    [PostCategoriesEnum.ARTICLES]: {
        id: `app.categories.${PostCategoriesEnum.ARTICLES}`
    },
    subscribeTitle: {
        id: 'app.subscribe.title'
    },
    author: {
        id: 'app.author'
    }
});
