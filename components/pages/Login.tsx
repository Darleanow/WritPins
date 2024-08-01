import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonText,
} from '@ionic/react';
import { auth } from '../../app/firebaseConfig';

/**
 * Returns a user-friendly error message based on the Firebase authentication error code.
 * @param {any} error - The error object returned from Firebase authentication.
 * @returns {string} - A user-friendly error message.
 */
const getFriendlyErrorMessage = (error: any): string => {
    switch (error.code) {
        case 'auth/invalid-credential':
            return 'Invalid login credentials. Please check your email and password.';
        case 'auth/email-already-in-use':
            return 'The email address is already in use by another account.';
        case 'auth/invalid-email':
            return 'The email address is badly formatted.';
        case 'auth/user-disabled':
            return 'This user account has been disabled.';
        case 'auth/user-not-found':
            return 'No user found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/too-many-requests':
            return 'Too many unsuccessful login attempts. Please try again later.';
        case 'auth/weak-password':
            return 'The password is too weak. Please choose a stronger password.';
        default:
            return 'An error occurred. Please try again.';
    }
};

/**
 * The main Login component that handles user authentication.
 */
const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const history = useHistory();

    /**
     * Handles the login form submission.
     * @param {FormEvent} e - The form event.
     */
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            history.push('/feed'); // Redirect to the feed page after successful login
        } catch (err) {
            setError(getFriendlyErrorMessage(err));
        }
    };

    return (
        <IonPage>
            <IonHeader mode="ios">
                <IonToolbar>
                    <IonTitle>Welcome Back!</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {error && (
                    <IonText color="danger" style={{ textAlign: 'center' }}>
                        <p>{error}</p>
                    </IonText>
                )}
                <LoginForm 
                    email={email} 
                    setEmail={setEmail} 
                    password={password} 
                    setPassword={setPassword} 
                    onSubmit={handleLogin} 
                />
                <RegisterLink />
            </IonContent>
        </IonPage>
    );
};

/**
 * The form component for user login.
 * @param {object} props - The component props.
 * @param {string} props.email - The email input value.
 * @param {Function} props.setEmail - The function to update the email state.
 * @param {string} props.password - The password input value.
 * @param {Function} props.setPassword - The function to update the password state.
 * @param {Function} props.onSubmit - The function to handle form submission.
 */
const LoginForm: React.FC<{
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    onSubmit: (e: FormEvent) => void;
}> = ({ email, setEmail, password, setPassword, onSubmit }) => (
    <form onSubmit={onSubmit} style={{ marginTop: '20px' }}>
        <IonItem lines="full" mode="ios">
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                required
            />
        </IonItem>
        <IonItem lines="full" mode="ios">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                required
            />
        </IonItem>
        <IonButton expand="block" type="submit" style={{ marginTop: '20px' }}>
            Login
        </IonButton>
    </form>
);

/**
 * Component displaying the registration link.
 */
const RegisterLink: React.FC = () => (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <IonLabel>
            Don&apos;t have an account?{' '}
            <a href="/register" style={{ color: '#3880ff' }}>
                Register
            </a>
        </IonLabel>
    </div>
);

export default Login;
