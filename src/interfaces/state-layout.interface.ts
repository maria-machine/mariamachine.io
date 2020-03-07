import { ColorsEnum } from '../enums/colors.enum';

export interface IStateLayout {
    readonly categories: {
        readonly color?: ColorsEnum;
    };
}
