import { Store as PullStateStore } from 'pullstate';
import { PinList, lists } from '../mock/pin';

import {
  homeItems,
  notifications,
  settings,
  HomeItem,
  NotificationItem,
  Settings,
} from '../mock';

type StoreProps = {
  safeAreaTop: number;
  safeAreaBottom: number;
  menuOpen: boolean;
  notificationsOpen: boolean;
  currentPage: number | null;
  homeItems: HomeItem[];
  lists: PinList[];
  notifications: NotificationItem[];
  settings: Settings;
  selectedList: PinList | undefined;
};

const Store = new PullStateStore<StoreProps>({
  safeAreaTop: 0,
  safeAreaBottom: 0,
  menuOpen: false,
  notificationsOpen: false,
  currentPage: null,
  homeItems,
  lists,
  notifications,
  settings,
  selectedList: undefined,
});

export default Store;
