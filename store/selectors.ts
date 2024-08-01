import { createSelector } from 'reselect';
import { Pin } from '../mock/pin';
export interface RootState {
  pins: Pin[];
}

export const createAppSelector = createSelector.withTypes<RootState>();

export const selectPinLists = createAppSelector(
  [state => state.pins],
  pins => pins,
);
