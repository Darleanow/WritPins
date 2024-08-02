// pages/Tabs.tsx
import { Redirect, Route } from 'react-router-dom';
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { cog, flash, list } from 'ionicons/icons';

import Home from './Feed';
import Lists from './Lists';
// import ListDetail from './ListDetail';
import Settings from './Settings';

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/feed" render={() => <Home />} exact={true} />
        <Route path="/lists" render={() => <Lists />} exact={true} />
        <Route path="/settings" render={() => <Settings />} exact={true} />
        <Route path="" render={() => <Redirect to="/feed" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <IonTabButton tab="tab1" href="/feed" className="flex flex-col items-center">
          <IonIcon icon={flash} className="text-xl text-gray-600 dark:text-gray-400" />
          <IonLabel className="text-xs text-gray-600 dark:text-gray-400">Feed</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/lists" className="flex flex-col items-center">
          <IonIcon icon={list} className="text-xl text-gray-600 dark:text-gray-400" />
          <IonLabel className="text-xs text-gray-600 dark:text-gray-400">My Pins</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/settings" className="flex flex-col items-center">
          <IonIcon icon={cog} className="text-xl text-gray-600 dark:text-gray-400" />
          <IonLabel className="text-xs text-gray-600 dark:text-gray-400">Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
