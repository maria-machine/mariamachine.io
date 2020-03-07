export interface ISetSubscription {
    type: 'SET_SUBSCRIPTION';
    payload: boolean;
}

export const setSubscription = (subscription: boolean): ISetSubscription => ({
    type: 'SET_SUBSCRIPTION',
    payload: subscription
});
