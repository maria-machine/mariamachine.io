import { ColorsEnum } from '../enums/colors.enum';

export interface ISetLayoutCategoriesColor {
    type: 'SET_LAYOUT_CATEGORIES_COLOR';
    payload: ColorsEnum | undefined;
}

export const setLayoutCategoriesColor = (color?: ColorsEnum): ISetLayoutCategoriesColor => ({
    type: 'SET_LAYOUT_CATEGORIES_COLOR',
    payload: color
});
