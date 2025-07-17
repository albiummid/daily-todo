import { firebaseAuth } from "@/libs/firebase";
import { useAuthState } from "@/store";
import { FirebaseError } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { useEffect } from "react";

export const credentialSignUp = async (email: string, password: string) => {
    try {
        const response = await createUserWithEmailAndPassword(
            firebaseAuth,
            email,
            password
        );
        console.log(response, "CREATED_USER");
        return response.user;
    } catch (error) {
        console.log("SignUp Error:", error);
        if (error instanceof FirebaseError) {
            throw new Error(error.message);
        }
        throw error;
    }
};

export const updateUserDisplayName = async (displayName: string) => {
    try {
        const currentUser = firebaseAuth.currentUser;
        if (!currentUser) {
            throw new Error("No user is currently signed in");
        }

        await updateProfile(currentUser, {
            displayName: displayName,
        });

        console.log("Display name updated successfully");
        return currentUser;
    } catch (error) {
        console.log("Update Display Name Error:", error);
        if (error instanceof FirebaseError) {
            throw new Error(error.message);
        }
        throw error;
    }
};

export const credentialSignIn = async (email: string, password: string) => {
    try {
        const response = await signInWithEmailAndPassword(
            firebaseAuth,
            email,
            password
        );
        console.log(response, "SignedIn user.");
        return response.user;
    } catch (error) {
        console.log("SignUp Error:", error);
        if (error instanceof FirebaseError) {
            throw new Error(error.message);
        }
        throw error;
    }
};

export const useAuthListener = () => {
    const { onLogin, onLogout, ...authStates } = useAuthState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            firebaseAuth,
            (authUser) => {
                if (authUser) {

                    onLogin(authUser);
                } else {
                    onLogout();
                }
            },
            (authError) => {
                onLogout();
                useAuthState.setState({
                    error: authError,
                    isError: true,
                });
            }
        );

        return () => {
            // cleanup
            unsubscribe();
        };
    }, []);

    return authStates;
};
