// pages/Register.tsx
import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from "../../app/firebaseConfig";
import { IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonItem, IonLabel, IonButton, IonInput } from '@ionic/react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update the user profile with full name and username
            await updateProfile(user, {
                displayName: `${fullName}`, // Storing fullName and username in displayName
            });

            history.push('/feed'); // Redirect to feed after successful registration
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonTitle size="large" className="ion-text-center">
                    Ready to join us ?
                </IonTitle>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
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
                        Login
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
