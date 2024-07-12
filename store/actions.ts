import Store from '.';
import { Settings } from '../mock';
import {Pin, PinList } from '../mock/pin';

export const setMenuOpen = (open: boolean) => {
  Store.update(s => {
    s.menuOpen = open;
  });
};

export const setNotificationsOpen = (open: boolean) => {
  Store.update(s => {
    s.notificationsOpen = open;
  });
};

export const setSettings = (settings: Settings) => {
  Store.update(s => {
    s.settings = settings;
  });
};

// App-specific actions

export const setDone = (
  list: PinList,
  listItem: Pin,
  done: boolean,
) => {
  Store.update((s, o) => {
    const listIndex = o.lists.findIndex(l => l === list);
    const items = o.lists[listIndex].pin;
    const itemIndex = items?.findIndex(i => i === listItem);
    const item = items?.[itemIndex ?? -1];
    if (!item) return;
    if (list === o.selectedList) {
      s.selectedList = s.lists[listIndex];
    }
  });
};
