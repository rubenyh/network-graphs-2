"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
	GoogleAuthProvider,
	User,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";

type AuthContextValue = {
	user: User | null;
	loading: boolean;
	signInWithEmail: (email: string, password: string) => Promise<void>;
	signUpWithEmail: (email: string, password: string) => Promise<void>;
	signInWithGoogle: () => Promise<void>;
	signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser ?? null);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = useMemo<AuthContextValue>(
		() => ({
			user,
			loading,
			signInWithEmail: async (email, password) => {
				await signInWithEmailAndPassword(auth, email, password);
			},
			signUpWithEmail: async (email, password) => {
				await createUserWithEmailAndPassword(auth, email, password);
			},
			signInWithGoogle: async () => {
				const provider = new GoogleAuthProvider();
				await signInWithPopup(auth, provider);
			},
			signOut: async () => {
				await firebaseSignOut(auth);
			},
		}),
		[user, loading]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return context;
}
