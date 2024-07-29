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
import { auth } from "../../app/firebaseConfig";

const getFriendlyErrorMessage = (error: any): string => {
    if (error.code) {
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
    }
    return 'An error occurred. Please try again.';
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            history.push('/feed'); // Redirect to feed after successful login
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
                <form onSubmit={handleLogin} style={{ marginTop: '20px' }}>
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
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <IonLabel>
                        Don&apos;t have an account?{' '}
                        <a href="/register" style={{ color: '#3880ff' }}>
                            Register
                        </a>
                    </IonLabel>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;
