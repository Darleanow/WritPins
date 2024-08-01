import React, { useState } from 'react';
import {
    IonModal,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonToast,
    IonIcon,
} from '@ionic/react';
import { closeOutline, checkmarkOutline } from 'ionicons/icons';
import { Tag } from '../../mock/pin';
import { getSolidColor } from '../utils/utils';

interface FilterPinsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyFilter: (selectedTags: Tag[]) => void;
    allTags: Tag[];
}

const FilterPinsModal: React.FC<FilterPinsModalProps> = ({ isOpen, onClose, onApplyFilter, allTags }) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [showToast, setShowToast] = useState<boolean>(false);

    const toggleTagSelection = (tag: Tag) => {
        setSelectedTags(prevSelectedTags =>
            prevSelectedTags.some(t => t.name === tag.name)
                ? prevSelectedTags.filter(t => t.name !== tag.name)
                : [...prevSelectedTags, tag]
        );
    };

    const handleApplyFilter = () => {
        onApplyFilter(selectedTags);
        onClose();
    };

    const isSelected = (tag: Tag) => selectedTags.some(t => t.name === tag.name);

    return (
        <>
            <IonModal isOpen={isOpen} onDidDismiss={onClose}>
                <IonHeader>
                    <IonToolbar className="bg-dark-bg-gray800">
                        <IonTitle className="text-xl font-semibold text-gray-100 ml-6">Filter Pins</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={onClose}>
                                <IonIcon icon={closeOutline} className="text-2xl text-gray-100" />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="bg-dark-bg-gray800 px-6 py-4">
                    <h3 className="text-lg text-gray-300 mb-4 ml-6 font-bold">Tags</h3>
                    <div className="flex flex-wrap gap-2 ml-6">
                        {allTags.map((tag, index) => (
                            <div
                                key={index}
                                className={`py-1 px-2 rounded-full cursor-pointer transition-all duration-150 border ${isSelected(tag) ? 'ring-2 ring-blue-900' : ''}`}
                                style={{
                                    backgroundColor: tag.color,
                                    border: `1px solid ${getSolidColor(tag.color)}`,
                                    color: 'white',
                                }}
                                onClick={() => toggleTagSelection(tag)}
                            >
                                <div className="flex items-center font-medium">
                                    <span>{tag.name}</span>
                                    <IonIcon
                                        icon={isSelected(tag) ? checkmarkOutline : closeOutline}
                                        className="ml-1 text-sm"
                                        style={{ verticalAlign: 'middle' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <IonButton expand="block" onClick={handleApplyFilter} className="mt-6 mx-12 text-white transition-all duration-150">
                        Apply Filter
                    </IonButton>
                </IonContent>
            </IonModal>

            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Please select at least one tag"
                duration={2000}
                position="top"
                color="warning"
            />
        </>
    );
};

export default FilterPinsModal;
