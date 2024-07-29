// pages/Register.tsx
import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from "../../app/firebaseConfig";
import {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonContent,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    IonText
} from '@ionic/react';

const getFriendlyErrorMessage = (error: any): string => {
    if (error.code) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                return 'The email address is already in use by another account.';
            case 'auth/invalid-email':
                return 'The email address is badly formatted.';
            case 'auth/weak-password':
                return 'The password is too weak. Please choose a stronger password.';
            case 'auth/operation-not-allowed':
                return 'Email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.';
            case 'auth/internal-error':
                return 'An internal error has occurred. Please try again.';
            default:
                return 'An error occurred. Please try again.';
        }
    }
    return 'An error occurred. Please try again.';
};

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const validatePassword = (password: string) => {
        const minLength = 8;
        return password.length >= minLength;
    };

    const validateFullName = (name: string) => {
        return name.trim().length > 0;
    };

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateFullName(fullName)) {
            setError('Full name is required.');
            return;
        }
        if (!validatePassword(password)) {
            setError('Password should be at least 8 characters.');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update the user profile with full name
            await updateProfile(user, {
                displayName: `${fullName}`, // Storing fullName
            });

            history.push('/feed'); // Redirect to feed after successful registration
        } catch (err) {
            setError(getFriendlyErrorMessage(err));
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Ready to Join us ?</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                {error && (
                    <IonText color="danger" style={{ textAlign: 'center' }}>
                        <p>{error}</p>
                    </IonText>
                )}
                <form onSubmit={handleRegister} style={{ marginTop: '20px' }}>
                    <IonItem>
                        <IonLabel position="floating">Full Name</IonLabel>
                        <IonInput
                            type="text"
                            value={fullName}
                            onIonChange={(e) => setFullName(e.detail.value!)}
                            required
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput
                            type="email"
                            value={email}
                            onIonChange={(e) => setEmail(e.detail.value!)}
                            required
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput
                            type="password"
                            value={password}
                            onIonChange={(e) => setPassword(e.detail.value!)}
                            required
                        />
                    </IonItem>
                    <IonButton expand="block" type="submit" style={{ marginTop: '20px' }}>
                        Register
                    </IonButton>
                </form>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <IonLabel>
                        Already have an account?{' '}
                        <a href="/login" style={{ color: '#3880ff' }}>
                            Login
                        </a>
                    </IonLabel>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Register;
