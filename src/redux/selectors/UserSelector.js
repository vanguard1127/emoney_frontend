import { createSelector } from 'reselect';

export const UserSelector = state => state.user;

export const getUser = createSelector([UserSelector], user => user);

export const getSubscription = createSelector(
  [UserSelector],
  user => user.subscription
);
