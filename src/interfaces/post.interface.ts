// import { Asset } from 'contentful';

import { CategoriesEnum } from '../enums/categories.enum';
import { ColorsEnum } from '../enums/colors.enum';

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
        // readonly cover?: Asset;
        readonly coverColor?: ColorsEnum;
        readonly categories: CategoriesEnum[];
        readonly publicUrl: string;
        readonly date: string;
        readonly showOnProduction: boolean;
        readonly originName?: string;
        readonly originLink?: string;
        readonly originAuthor?: string;
    };
}
