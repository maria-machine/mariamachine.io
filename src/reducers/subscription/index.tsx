import { ISetSubscription } from '../../actionCreators';

const initialState = false;

export type SubscriptionActionsType = ISetSubscription;

export const subscriptionReducer = (state: boolean = initialState, action: SubscriptionActionsType): boolean => {
    switch (action.type) {
        case 'SET_SUBSCRIPTION':
            return action.payload;
        default:
            return state;
    }
};
