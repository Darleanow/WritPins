// AppShell.tsx
'use client';
import React from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import Tabs from './pages/Tabs';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider, useAuth } from "../app/contexts/authContext";
import PrivateRoute from './Routing/PrivateRoute';

setupIonicReact({});

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', async (status) => {
    try {
      await StatusBar.setStyle({
        style: status.matches ? Style.Dark : Style.Light,
      });
    } catch { }
  });

const AuthChecker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>; // Replace with a proper loading indicator
  }
  return <>{children}</>;
};

const AppShell = () => {
  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          <IonRouterOutlet id="main">
            <AuthChecker>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <PrivateRoute path="/feed" component={Tabs} />
              <PrivateRoute path="/lists" component={Tabs} />
              <PrivateRoute path="/settings" component={Tabs} />
              <Route path="/" exact render={() => <Redirect to="/feed" />} />
            </AuthChecker>
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
};

export default AppShell;
