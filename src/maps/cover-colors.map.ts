import { ColorsEnum } from '../enums/colors.enum';

export const COVER_COLORS_MAP = {
    [ColorsEnum.BOSTON]: {
        category: ColorsEnum.CORNFLOWER,
        title: ColorsEnum.BOTTICELLI,
        date: ColorsEnum.BOTTICELLI
    },
    [ColorsEnum.BOTTICELLI]: {
        category: ColorsEnum.GRAPHITE,
        title: ColorsEnum.SAN_JUAN,
        date: ColorsEnum.SAN_JUAN
    },
    [ColorsEnum.CORNFLOWER]: {
        category: ColorsEnum.GRAPHITE,
        title: ColorsEnum.SAN_JUAN,
        date: ColorsEnum.SAN_JUAN
    },
    [ColorsEnum.SAN_JUAN]: {
        category: ColorsEnum.BOTTICELLI,
        title: '#fff',
        date: '#fff'
    },
    [ColorsEnum.SEA_PINK]: {
        category: '#ccc',
        title: '#ccc',
        date: '#ccc'
    },
    [ColorsEnum.VALENCIA]: {
        category: ColorsEnum.BOTTICELLI,
        title: ColorsEnum.CREAM,
        date: ColorsEnum.CREAM
    },
    [ColorsEnum.GREY]: {
        category: '#ccc',
        title: '#ccc',
        date: '#ccc'
    },
    [ColorsEnum.GRAPHITE]: {
        category: ColorsEnum.BOTTICELLI,
        title: ColorsEnum.GREY,
        date: ColorsEnum.GREY
    },
    [ColorsEnum.CREAM]: {
        category: ColorsEnum.GRAPHITE,
        title: ColorsEnum.VALENCIA,
        date: ColorsEnum.VALENCIA
    }
};
