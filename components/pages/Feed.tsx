import React, { useEffect, useState, useRef } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenuButton,
  IonFab,
  IonFabButton,
  IonModal,
} from '@ionic/react';
import { addOutline, funnelOutline, arrowBackOutline } from 'ionicons/icons';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { useAuth } from '../../app/contexts/authContext';
import { app } from '../../app/firebaseConfig';
import FeedCard from '../ui/FeedCard';
import CreatePinModal from '../ui/CreatePinModal';
import FilterPinsModal from '../ui/FilterPinsModal';
import { Pin, Tag } from '../../mock/pin';
import PinCard from '../ui/PinCard';

/**
 * Centralized Firestore database reference.
 */
const db = getFirestore(app);

/**
 * Feed component displaying a list of pins, filtering options, and pin creation functionality.
 */
const Feed: React.FC = () => {
  // State for storing all pins, filtered pins, selected pin, and modal visibility flags.
  const [pins, setPins] = useState<Pin[]>([]);
  const [filteredPins, setFilteredPins] = useState<Pin[]>([]);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [showCreatePinModal, setShowCreatePinModal] = useState(false);
  const [showFilterPinsModal, setShowFilterPinsModal] = useState(false);
  const [showPinDetailsModal, setShowPinDetailsModal] = useState(false);
  const { fullName } = useAuth();
  const tagColorMapping = useRef<{ [key: string]: string }>({});

  /**
   * Fetches pins from Firestore on component mount.
   */
  useEffect(() => {
    const fetchPins = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pins'));
        const pinsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          creation_date: doc.data().creation_date?.toDate(),
        })) as Pin[];

        setPins(pinsData);
        setFilteredPins(pinsData);
        setTagColors(pinsData);
      } catch (error) {
        console.error('Error fetching pins: ', error);
      }
    };

    fetchPins();
  }, []);

  /**
   * Sets unique colors for each tag name.
   * @param {Pin[]} pinsData - Array of pin data.
   */
  const setTagColors = (pinsData: Pin[]) => {
    pinsData.forEach((pin) => {
      pin.tags.forEach((tag) => {
        const tagNameLower = tag.name.toLowerCase();
        if (!tagColorMapping.current[tagNameLower]) {
          tagColorMapping.current[tagNameLower] = tag.color;
        }
      });
    });
  };

  /**
   * Opens the modal for creating a new pin.
   */
  const openCreatePinModal = () => {
    setShowCreatePinModal(true);
  };

  /**
   * Opens the modal for filtering pins.
   */
  const openFilterPinsModal = () => {
    setShowFilterPinsModal(true);
  };

  /**
   * Applies the selected tag filters to the pins.
   * @param {Tag[]} selectedTags - Array of selected tag objects.
   */
  const applyFilter = (selectedTags: Tag[]) => {
    if (selectedTags.length === 0) {
      setFilteredPins(pins);
      return;
    }

    const filtered = pins.filter((pin) =>
      selectedTags.some((tag) => pin.tags.some((ptag) => ptag.name === tag.name))
    );
    setFilteredPins(filtered);
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
      fetchUpdatedPins();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  /**
   * Fetches updated pins after creating a new pin.
   */
  const fetchUpdatedPins = async () => {
    const querySnapshot = await getDocs(collection(db, 'pins'));
    const updatedPins = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      creation_date: doc.data().creation_date?.toDate(),
    })) as Pin[];
    setPins(updatedPins);
    setFilteredPins(updatedPins);
    setTagColors(updatedPins);
  };

  /**
   * Handles pin click and shows the pin details modal.
   * @param {Pin} pin - The pin object that was clicked.
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

  // Extracts unique tags from all pins
  const allTags = Array.from(
    new Set(pins.flatMap((pin) => pin.tags.map((tag) => tag.name)))
  ).map((name) => {
    const tag = pins.flatMap((pin) => pin.tags).find((t) => t.name === name);
    return {
      name,
      color: tag ? tag.color : 'grey', // Fallback color if no tag found
    };
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome back, {fullName}</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Writ&apos;Pins</IonTitle>
          </IonToolbar>
        </IonHeader>

        {filteredPins.length > 0 ? (
          filteredPins.map((pin, index) => (
            <div key={index}>
              <FeedCard pin={pin} onClick={() => openPinDetails(pin)} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <IonIcon icon={addOutline} size="large" className="text-gray-400 mb-4" />
            <p className="text-lg text-gray-500 dark:text-gray-400">No pins available. Start creating your first pin!</p>
          </div>
        )}

        <IonFab vertical="bottom" horizontal="start" slot="fixed" className="mb-4 ml-4">
          <IonFabButton size="small" onClick={openFilterPinsModal} className="w-12 h-12">
            <IonIcon icon={funnelOutline} className="text-xl" />
          </IonFabButton>
        </IonFab>
        <IonFab vertical="bottom" horizontal="end" slot="fixed" className="mb-4 mr-4">
          <IonFabButton size="small" onClick={openCreatePinModal} className="w-12 h-12">
            <IonIcon icon={addOutline} className="text-xl" />
          </IonFabButton>
        </IonFab>
        <CreatePinModal isOpen={showCreatePinModal} onClose={() => setShowCreatePinModal(false)} onSubmit={createPin} />
        <FilterPinsModal
          isOpen={showFilterPinsModal}
          onClose={() => setShowFilterPinsModal(false)}
          onApplyFilter={applyFilter}
          allTags={allTags}
        />

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
            </IonContent>
          </IonModal>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Feed;
