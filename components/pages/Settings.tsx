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
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../app/firebaseConfig';

import Store from '../../store';
import * as selectors from '../../store/selectors';
import { setSettings } from '../../store/actions';

const Settings = () => {
  const settings = Store.useState(selectors.selectSettings);
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      history.push('/login'); // Redirect to the login page after logging out
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonToggle
              checked={settings.enableNotifications}
              onIonChange={e => {
                setSettings({
                  ...settings,
                  enableNotifications: e.target.checked,
                });
              }}
            >
              Enable Notifications
            </IonToggle>
          </IonItem>
          <IonItem>
            <IonButton onClick={handleLogout}>Logout</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
