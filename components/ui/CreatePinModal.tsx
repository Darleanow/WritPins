import React, { useState } from 'react';
import {
    IonModal,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonInput,
    IonTextarea,
    IonItem,
    IonLabel,
    IonIcon,
    IonToast,
} from '@ionic/react';
import { closeOutline, addOutline, closeCircleOutline } from 'ionicons/icons';
import { Pin, Tag } from '../../mock/pin';

interface CreatePinModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newPin: Omit<Pin, 'id' | 'creation_date' | 'author'>) => void;
}

const CreatePinModal: React.FC<CreatePinModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [source, setSource] = useState<string>('');
    const [tag, setTag] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);

    const generatePastelColor = (): string => {
        const r = Math.floor(Math.random() * 127 + 127);
        const g = Math.floor(Math.random() * 127 + 127);
        const b = Math.floor(Math.random() * 127 + 127);
        return `rgba(${r}, ${g}, ${b}, 0.5)`;
    };

    const getSolidColor = (rgbaColor: string): string => {
        return rgbaColor.replace('0.5', '1');
    };

    const handleFormSubmit = () => {
        if (title && content && source && tags.length > 0) {
            onSubmit({ title, content, source, tags });
            setTitle('');
            setContent('');
            setSource('');
            setTag('');
            setTags([]);
            onClose();
            setToastMessage('Pin created successfully!');
            setShowToast(true);
        } else {
            setToastMessage('All fields must be filled');
            setShowToast(true);
        }
    };

    const handleTagInput = (e: CustomEvent) => {
        const inputTag = e.detail.value!;
        if (inputTag.length <= 10) {
            setTag(inputTag);
        } else {
            setToastMessage('Tag cannot be longer than 10 characters');
            setShowToast(true);
        }
    };

    const addTag = () => {
        if (tag.trim() === '') {
            setToastMessage('Tag cannot be empty');
            setShowToast(true);
            return;
        }

        if (tags.length >= 5) {
            setToastMessage('You can only add up to 5 tags');
            setShowToast(true);
            return;
        }

        if (tags.some((t) => t.name.toLowerCase() === tag.toLowerCase())) {
            setToastMessage('Duplicate tags are not allowed');
            setShowToast(true);
            return;
        }

        const pastelColor = generatePastelColor();
        setTags([...tags, { name: tag, color: pastelColor }]);
        setTag('');
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <>
            <IonModal isOpen={isOpen} onDidDismiss={onClose}>
                <IonHeader>
                    <IonToolbar className="bg-dark-bg-gray800">
                        <IonTitle className="text-xl font-semibold text-gray-100">Create a New Pin</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={onClose}>
                                <IonIcon icon={closeOutline} className="text-2xl text-gray-100" />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="bg-dark-bg-gray800 px-6 py-4">
                    <IonItem
                        lines="none"
                        className={`mx-4 my-8 bg-gray-800 rounded-lg shadow-md transition-all duration-150 ${focusedInput === 'title' ? 'ring-2 ring-blue-950' : ''}`}
                    >
                        <IonLabel position="stacked" className="text-gray-200">Title</IonLabel>
                        <IonInput
                            value={title}
                            onIonChange={(e) => setTitle(e.detail.value!)}
                            placeholder="Enter title"
                            className="text-gray-100"
                            onFocus={() => setFocusedInput('title')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </IonItem>

                    <IonItem
                        lines="none"
                        className={`mx-4 my-8 bg-gray-800 rounded-lg shadow-md transition-all duration-150 ${focusedInput === 'content' ? 'ring-2 ring-blue-950' : ''}`}
                    >
                        <IonLabel position="stacked" className="text-gray-200">Content</IonLabel>
                        <IonTextarea
                            value={content}
                            onIonChange={(e) => setContent(e.detail.value!)}
                            placeholder="Enter content"
                            className="text-gray-100"
                            onFocus={() => setFocusedInput('content')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </IonItem>

                    <IonItem
                        lines="none"
                        className={`mx-4 my-8 bg-gray-800 rounded-lg shadow-md transition-all duration-150 ${focusedInput === 'source' ? 'ring-2 ring-blue-950' : ''}`}
                    >
                        <IonLabel position="stacked" className="text-gray-200">Source</IonLabel>
                        <IonInput
                            value={source}
                            onIonChange={(e) => setSource(e.detail.value!)}
                            placeholder="Enter source"
                            className="text-gray-100"
                            onFocus={() => setFocusedInput('source')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </IonItem>

                    <div className="flex items-center mb-4 mx-4">
                        <IonInput
                            value={tag}
                            onIonChange={handleTagInput}
                            placeholder="Enter tag"
                            className={`bg-gray-800 text-gray-100 py-2 rounded-lg w-full h-14 transition-all duration-150 ${focusedInput === 'tag' ? 'ring-2 ring-blue-950' : ''}`}
                            style={{ paddingLeft: '4px' }}
                            onFocus={() => setFocusedInput('tag')}
                            onBlur={() => setFocusedInput(null)}
                        />
                        <IonButton onClick={addTag} className="h-14 w-14 flex items-center justify-center ml-2">
                            <IonIcon icon={addOutline} />
                        </IonButton>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2 mx-4">
                        {tags.map((t, index) => (
                            <div key={index} className="flex items-center">
                                <span
                                    className="text-xs font-semibold py-1 px-2 rounded-full flex items-center"
                                    style={{
                                        maxWidth: '100px',
                                        overflowWrap: 'break-word',
                                        backgroundColor: t.color,
                                        border: `1px solid ${getSolidColor(t.color)}`,
                                        color: 'white',
                                    }}
                                >
                                    {t.name}
                                    <IonIcon
                                        icon={closeCircleOutline}
                                        className="text-white ml-1 cursor-pointer"
                                        onClick={() => removeTag(index)}
                                    />
                                </span>
                            </div>
                        ))}
                    </div>

                    <IonButton expand="block" onClick={handleFormSubmit} className="mt-4 mx-4 text-white transition-all duration-150">
                        Create Pin
                    </IonButton>
                </IonContent>
            </IonModal>

            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={toastMessage}
                duration={2000}
                position="top"
                color={toastMessage.includes('success') ? 'success' : 'danger'}
            />
        </>
    );
};

export default CreatePinModal;
