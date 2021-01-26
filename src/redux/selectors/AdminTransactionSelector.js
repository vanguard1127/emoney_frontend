import { createSelector } from 'reselect';

export const AdminTransactionSelector = state => state.transaction;

export const getTransactionList = createSelector([AdminTransactionSelector], transaction => transaction.list);

export const getTransaction = createSelector([AdminTransactionSelector], transaction => transaction.selected);