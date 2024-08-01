import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../app/firebaseConfig';
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
    IonText,
} from '@ionic/react';

/**
 * Returns a user-friendly error message based on the Firebase authentication error code.
 * @param {any} error - The error object returned from Firebase authentication.
 * @returns {string} - A user-friendly error message.
 */
const getFriendlyErrorMessage = (error: any): string => {
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
};

/**
 * A functional component that renders the registration page.
 */
const Register: React.FC = () => {
    // State variables for form inputs and error message
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [error, setError] = useState<string>('');
    const history = useHistory();

    /**
     * Validates the password to ensure it meets the minimum length requirement.
     * @param {string} password - The password to validate.
     * @returns {boolean} - True if the password meets the requirement, false otherwise.
     */
    const validatePassword = (password: string): boolean => password.length >= 8;

    /**
     * Validates the full name to ensure it is not empty.
     * @param {string} name - The full name to validate.
     * @returns {boolean} - True if the full name is valid, false otherwise.
     */
    const validateFullName = (name: string): boolean => name.trim().length > 0;

    /**
     * Handles the registration form submission.
     * @param {FormEvent} e - The form event.
     */
    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        // Validate the full name and password
        if (!validateFullName(fullName)) {
            setError('Full name is required.');
            return;
        }
        if (!validatePassword(password)) {
            setError('Password should be at least 8 characters.');
            return;
        }

        try {
            // Create a new user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update the user profile with the full name
            await updateProfile(user, {
                displayName: fullName,
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
                    <IonTitle>Ready to Join us?</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                {error && (
                    <IonText color="danger" style={{ textAlign: 'center' }}>
                        <p>{error}</p>
                    </IonText>
                )}
                <RegistrationForm
                    fullName={fullName}
                    setFullName={setFullName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    onSubmit={handleRegister}
                />
                <LoginLink />
            </IonContent>
        </IonPage>
    );
};

/**
 * A functional component that renders the registration form.
 * @param {object} props - The component props.
 * @param {string} props.fullName - The full name input value.
 * @param {Function} props.setFullName - The function to update the full name state.
 * @param {string} props.email - The email input value.
 * @param {Function} props.setEmail - The function to update the email state.
 * @param {string} props.password - The password input value.
 * @param {Function} props.setPassword - The function to update the password state.
 * @param {Function} props.onSubmit - The function to handle form submission.
 */
const RegistrationForm: React.FC<{
    fullName: string;
    setFullName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    onSubmit: (e: FormEvent) => void;
}> = ({ fullName, setFullName, email, setEmail, password, setPassword, onSubmit }) => (
    <form onSubmit={onSubmit} style={{ marginTop: '20px' }}>
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
);

/**
 * A functional component that renders the login link.
 */
const LoginLink: React.FC = () => (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <IonLabel>
            Already have an account?{' '}
            <a href="/login" style={{ color: '#3880ff' }}>
                Login
            </a>
        </IonLabel>
    </div>
);

export default Register;
