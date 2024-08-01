// store/Store.ts
import { Store as PullStateStore } from 'pullstate';
import { Pin } from '../mock/pin';

type StoreProps = {
  safeAreaTop: number;
  safeAreaBottom: number;
  menuOpen: boolean;
  notificationsOpen: boolean;
  currentPage: number | null;
  pins: Pin[];
  selectedList: Pin[] | undefined;
};

const Store = new PullStateStore<StoreProps>({
  safeAreaTop: 0,
  safeAreaBottom: 0,
  menuOpen: false,
  notificationsOpen: false,
  currentPage: null,
  pins: [],
  selectedList: [],
});

export default Store;
