import { auth, googleProvider } from "../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from "firebase/auth"
import { useState } from "react";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email..."
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Passeord..."
            />
            <button onClick={signIn}> Sign In </button>
            <br />
            <br />
            <button onClick={signInWithGoogle}> Sign In With Google </button>
            <br />
            <button onClick={logout}> LogOut With Google </button>
        </div>
    );
};