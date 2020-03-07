import { defineMessages } from 'react-intl';

import { CategoriesEnum } from '../enums/categories.enum';

export const messages = defineMessages({
    [CategoriesEnum.TRANSLATIONS]: {
        id: `app.categories.${CategoriesEnum.TRANSLATIONS}`
    },
    [CategoriesEnum.ARTICLES]: {
        id: `app.categories.${CategoriesEnum.ARTICLES}`
    },
    subscribeTitle: {
        id: 'app.subscribe.title'
    },
    author: {
        id: 'app.author'
    },
    page404: {
        id: 'app.404'
    },
    page404more: {
        id: 'app.404.more'
    },
    contactsCategory: {
        id: 'app.contacts.category'
    }
});
