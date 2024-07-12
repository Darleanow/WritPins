import { createSelector } from 'reselect';
import { HomeItem, NotificationItem, Settings } from '../mock';
import { PinList } from '../mock/pin';
export interface RootState {
  homeItems: HomeItem[];
  lists: PinList[];
  notifications: NotificationItem[];
  settings: Settings;
}

export const createAppSelector = createSelector.withTypes<RootState>();

export const selectHomeItems = createAppSelector(
  [state => state.homeItems],
  homeItems => homeItems,
);

export const selectLists = createAppSelector(
  [state => state.lists],
  lists => lists,
);

export const selectNotifications = createAppSelector(
  [state => state.notifications],
  notifications => notifications,
);

export const selectSettings = createAppSelector(
  [state => state.settings],
  settings => settings,
);
