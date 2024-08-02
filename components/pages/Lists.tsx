import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonButtons,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonModal,
  IonAlert,
} from '@ionic/react';
import { addOutline, arrowBackOutline, trashOutline } from 'ionicons/icons';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../../app/contexts/authContext';
import { app } from '../../app/firebaseConfig';
import FeedCard from '../ui/FeedCard';
import CreatePinModal from '../ui/CreatePinModal';
import { Pin } from '../../mock/pin';
import PinCard from '../ui/PinCard';

// Centralized Firestore database reference
const db = getFirestore(app);

/**
 * Lists component displaying a list of pins created by the logged-in user.
 * Provides functionality to view pin details, create new pins, and delete pins.
 */
const Lists: React.FC = () => {
  const { fullName } = useAuth(); // Fetch the full name of the currently logged-in user
  const [pins, setPins] = useState<Pin[]>([]); // State for storing all user-created pins
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null); // State for the selected pin for details view
  const [showCreatePinModal, setShowCreatePinModal] = useState(false); // State to control the create pin modal visibility
  const [showPinDetailsModal, setShowPinDetailsModal] = useState(false); // State to control the pin details modal visibility
  const [showDeleteAlert, setShowDeleteAlert] = useState(false); // State to control the delete confirmation alert

  /**
   * Fetches all pins created by the logged-in user from Firestore on component mount.
   */
  useEffect(() => {
    const fetchUserPins = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pins'));
        const userPins = querySnapshot.docs
          .map((doc) => ({
            id: doc.id, // Assign the document ID
            ...doc.data(),
            creation_date: doc.data().creation_date?.toDate(),
          } as Pin)) // Type assertion for the pin data
          .filter((pin) => pin.author?.name === fullName?.split('|')[0]);

        setPins(userPins); // Set the pins state with user-created pins
      } catch (error) {
        console.error('Error fetching user pins: ', error);
      }
    };

    fetchUserPins();
  }, [fullName]);

  /**
   * Opens the modal for creating a new pin.
   */
  const openCreatePinModal = () => {
    setShowCreatePinModal(true);
  };

  /**
   * Handles the creation of a new pin and updates the state.
   * @param {Omit<Pin, 'id' | 'creation_date' | 'author'>} newPin - New pin data.
   */
  const createPin = async (newPin: Omit<Pin, 'id' | 'creation_date' | 'author'>) => {
    try {
      await addDoc(collection(db, 'pins'), {
        ...newPin,
        creation_date: new Date(),
        author: {
          name: fullName?.split('|')[0] || 'Anonymous',
          scene_name: fullName?.split('|')[1] || 'Anonymous',
        },
      });
      setShowCreatePinModal(false);
      fetchUserPins(); // Refresh pins after creating a new one
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  /**
   * Fetches the updated list of pins after creating a new pin.
   */
  const fetchUserPins = async () => {
    const querySnapshot = await getDocs(collection(db, 'pins'));
    const updatedPins = querySnapshot.docs
      .map((doc) => ({
        id: doc.id, // Assign the document ID
        ...doc.data(),
        creation_date: doc.data().creation_date?.toDate(),
      } as Pin)) // Type assertion for the pin data
      .filter((pin) => pin.author?.name === fullName?.split('|')[0]);

    setPins(updatedPins); // Set the pins state with the updated user-created pins
  };

  /**
   * Opens the pin details modal.
   * @param {Pin} pin - The pin object to display in the details modal.
   */
  const openPinDetails = (pin: Pin) => {
    setSelectedPin(pin);
    setShowPinDetailsModal(true);
  };

  /**
   * Closes the pin details modal.
   */
  const closePinDetails = () => {
    setSelectedPin(null);
    setShowPinDetailsModal(false);
  };

  /**
   * Deletes the selected pin.
   */
  const deletePin = async () => {
    if (selectedPin) {
      try {
        await deleteDoc(doc(db, 'pins', selectedPin.id)); // Use the pin ID to delete the document
        setShowPinDetailsModal(false);
        fetchUserPins(); // Refresh pins after deletion
        setSelectedPin(null);
      } catch (error) {
        console.error('Error deleting pin: ', error);
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Pins</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Pins</IonTitle>
          </IonToolbar>
        </IonHeader>

        {pins.length > 0 ? (
          pins.map((pin, index) => (
            <div key={index} className="relative my-4">
              <FeedCard pin={pin} onClick={() => openPinDetails(pin)} />
              <IonButton
                fill="clear"
                color="danger"
                className="absolute top-0 right-0 m-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPin(pin);
                  setShowDeleteAlert(true);
                }}
              >
                <IonIcon icon={trashOutline} />
              </IonButton>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <IonIcon icon={addOutline} size="large" className="text-gray-400 mb-4" />
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No pins available. Start creating your first pin!
            </p>
          </div>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed" className="mb-4 mr-4">
          <IonFabButton size="small" onClick={openCreatePinModal} className="w-12 h-12">
            <IonIcon icon={addOutline} className="text-xl" />
          </IonFabButton>
        </IonFab>

        <CreatePinModal isOpen={showCreatePinModal} onClose={() => setShowCreatePinModal(false)} onSubmit={createPin} />

        {selectedPin && (
          <IonModal isOpen={showPinDetailsModal} onDidDismiss={closePinDetails}>
            <IonHeader>
              <IonToolbar className="bg-gray-800">
                <IonButtons slot="start">
                  <IonButton onClick={closePinDetails}>
                    <IonIcon icon={arrowBackOutline} className="text-2xl text-gray-100" />
                  </IonButton>
                </IonButtons>
                <IonTitle className="text-xl font-semibold text-gray-100">Pin Details</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="bg-gray-800 px-6 py-4">
              <PinCard pin={selectedPin} />
              <IonButton
                expand="block"
                color="danger"
                className="mt-4 mx-12"
                onClick={() => setShowDeleteAlert(true)}
              >
                Delete Pin
              </IonButton>
            </IonContent>
          </IonModal>
        )}

        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header={'Delete Pin'}
          message={'Are you sure you want to delete this pin?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => setShowDeleteAlert(false),
            },
            {
              text: 'Delete',
              handler: deletePin,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Lists;
