import { IStateLang } from './state-lang.interface';
import { IStateLayout } from './state-layout.interface';

export interface IState {
    readonly subscription: boolean;
    readonly lang: IStateLang;
    readonly layout: IStateLayout;
}
