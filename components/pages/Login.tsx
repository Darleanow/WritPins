// pages/Login.tsx
import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../app/firebaseConfig";
import { IonContent, IonHeader, IonItem, IonInput, IonButton, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';

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
            setError((err as Error).message);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonTitle size="large" className="ion-text-center">
                    Welcome Back!
                </IonTitle>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <form onSubmit={handleLogin} style={{ marginTop: '20px' }}>
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
