import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, firebaseConfigured } from './firebase';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(firebaseConfigured);

  useEffect(() => {
    if (!auth) {
      setAuthLoading(false);
      return undefined;
    }

    return onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      authLoading,
      firebaseConfigured,
      async createAccount({ email, password, profile }) {
        if (!auth || !db) throw new Error('Firebase is not configured yet.');

        const credential = await createUserWithEmailAndPassword(auth, email, password);
        const firstName = profile.firstName.trim();
        const lastName = profile.lastName.trim();
        const displayName = [firstName, lastName].filter(Boolean).join(' ');
        const cleanProfile = {
          firstName,
          lastName,
          displayName,
          email: email.trim().toLowerCase(),
          phone: profile.phone.trim(),
          addressLine1: profile.addressLine1.trim(),
          addressLine2: profile.addressLine2.trim(),
          city: profile.city.trim(),
          state: profile.state.trim(),
          postalCode: profile.postalCode.trim(),
          promoOptIn: profile.promoOptIn,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        if (displayName) {
          await updateProfile(credential.user, { displayName });
          setCurrentUser(credential.user);
        }

        await setDoc(doc(db, 'users', credential.user.uid), cleanProfile);
        return credential.user;
      },
      async login(email, password) {
        if (!auth) throw new Error('Firebase is not configured yet.');
        const credential = await signInWithEmailAndPassword(auth, email, password);
        return credential.user;
      },
      async logout() {
        if (!auth) return;
        await signOut(auth);
      },
      async resetPassword(email) {
        if (!auth) throw new Error('Firebase is not configured yet.');
        await sendPasswordResetEmail(auth, email);
      },
    }),
    [authLoading, currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
