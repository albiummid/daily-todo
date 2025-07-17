import { firebaseAuth } from "@/libs/firebase";
import { useAuthState } from "@/store";
import { FirebaseError } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const credentialSignUp = async (email: string, password: string) => {
    try {
        const response = await createUserWithEmailAndPassword(
            firebaseAuth,
            email,
            password
        );
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

export const logout = async () => {
    try {
        await signOut(firebaseAuth);
        toast.success("Logged out successfully");
    } catch (error) {
        toast.error("Failed to logout");
        console.error("Logout error:", error);
    }
};
