import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonToast,
  IonAlert,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../app/firebaseConfig';

/**
 * Settings component to manage user account settings, including the logout functionality.
 * Provides options to the user for account management and application settings.
 */
const Settings: React.FC = () => {
  const history = useHistory();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  /**
   * Logs out the user by calling Firebase's `signOut` method. 
   * Displays a success or error message and redirects to the login page on success.
   * 
   * @async
   * @function
   */
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setToastMessage('Successfully logged out.');
      setShowToast(true);
      history.push('/login'); // Redirect to the login page after a successful logout
    } catch (error) {
      console.error('Error logging out: ', error);
      setToastMessage('Error logging out. Please try again.');
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding text-gray-100">
        <div className="flex justify-center mt-8">
          <IonButton
            expand="block"
            fill="outline"
            color="danger"
            onClick={() => setShowAlert(true)}
            className="w-full max-w-xs"
          >
            Logout
          </IonButton>
        </div>

        {/* Toast notification to display logout status */}
        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          position="top"
          onDidDismiss={() => setShowToast(false)}
        />

        {/* Alert dialog for confirming logout action */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Confirm Logout'}
          message={'Are you sure you want to logout?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
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