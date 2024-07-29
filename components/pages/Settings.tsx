import {
  IonPage,
  IonHeader,
  IonItem,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonToggle,
  IonButton,
  IonToast,
  IonAlert,
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../app/firebaseConfig';

import Store from '../../store';
import * as selectors from '../../store/selectors';
import { setSettings } from '../../store/actions';

const Settings = () => {
  const settings = Store.useState(selectors.selectSettings);
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setToastMessage('Successfully logged out.');
      setShowToast(true);
      history.push('/login');
    } catch (error) {
      console.error('Error logging out: ', error);
      setToastMessage('Error logging out. Please try again.');
      setShowToast(true);
    }
  };

  const handleToggleNotifications = (e: any) => {
    const updatedSettings = { ...settings, enableNotifications: e.detail.checked };
    setSettings(updatedSettings);
    setToastMessage(`Notifications ${e.detail.checked ? 'enabled' : 'disabled'}.`);
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList className="ion-margin-top">
          <IonItem>
            <IonToggle
              checked={settings.enableNotifications}
              onIonChange={handleToggleNotifications}
            >Enable Notifications</IonToggle>
          </IonItem>
          <IonItem className="ion-justify-content-center">
            <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '5%' }}>
              <IonButton
                fill="outline"
                size='default'
                style={{ width: '100%' }}
                onClick={() => setShowAlert(true)}
              >
                Logout
              </IonButton>
            </div>
          </IonItem>
        </IonList>
        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          position="top" // Set position to top
          onDidDismiss={() => setShowToast(false)}
        />
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Confirm Logout'}
          message={'Are you sure you want to logout?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => setShowAlert(false),
            },
            {
              text: 'Logout',
              handler: handleLogout,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Settings;
