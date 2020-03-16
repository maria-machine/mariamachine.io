import { CategoriesEnum } from '../enums/categories.enum';
import { ColorsEnum } from '../enums/colors.enum';

export interface IPost {
    readonly title: string;
    readonly description?: string;
    readonly content: string;
    readonly cover?: {
        readonly publicURL?: string | null;
    };
    readonly coverColor: ColorsEnum;
    readonly categories: CategoriesEnum[];
    readonly publicUrl: string;
    readonly date: string;
    readonly originName?: string;
    readonly originLink?: string;
    readonly originAuthor?: string;
}
