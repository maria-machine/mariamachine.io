import { ISetLayoutCategoriesColor } from '../../actionCreators';

import { IStateLayout } from '../../interfaces/state-layout.interface';

import { ColorsEnum } from '../../enums/colors.enum';

const initialState = {
    categories: {
        color: ColorsEnum.VALENCIA
    }
};

export type LayoutActionsType = ISetLayoutCategoriesColor;

export const layoutReducer = (state: IStateLayout = initialState, action: LayoutActionsType): IStateLayout => {
    switch (action.type) {
        case 'SET_LAYOUT_CATEGORIES_COLOR':
            return {...state, categories: {...state.categories, color: action.payload}};
        default:
            return state;
    }
};
