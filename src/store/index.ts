import { User } from "firebase/auth";
import { create } from "zustand";

interface AuthState {
    user: null | User;
    error: null | Error;
    isAuthenticated: boolean;
    isLoading: boolean;
    isError: boolean;
    onLogin: (user: User) => void;
    onLogout: () => void;
}

const initialAuthState: Omit<AuthState, "onLogin" | "onLogout"> = {
    user: null,
    error: null,
    isAuthenticated: false,
    isLoading: true,
    isError: false,
};

export const useAuthState = create<AuthState>((set, get) => ({
    ...initialAuthState,
    onLogin(user) {
        set({
            user,
            error: null,
            isAuthenticated: true,
            isError: false,
            isLoading: false,
        });
    },
    onLogout() {
        set({
            error: null,
            user: null,
            isAuthenticated: false,
            isError: false,
            isLoading: false,
        });
    },
}));
