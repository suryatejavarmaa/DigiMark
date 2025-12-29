import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { db, auth } from '../lib/firebase';

export interface UserProfile {
    // Step 1A - Personal Info (Optional)
    fullName?: string;
    dateOfBirth?: string;
    gender?: string;

    // Step 1B - Business Identity (Required)
    role: string;
    businessName: string;
    businessType: string;
    ownerName?: string;
    websiteUrl: string;

    // Step 2 - Brand & AI Settings
    primaryColor: string;
    accentColor: string;
    visualStyle: string;
    brandVoiceTone: number;
    businessDescription: string;

    // Step 3 - Social Connections
    connectedSocials: string[];

    createdAt: Date;
    email?: string;
}

export const UserService = {
    /**
     * Sign Up: Create Auth User + Save Profile to Firestore
     */
    signUp: async (email: string, password: string, profileData: Omit<UserProfile, 'createdAt' | 'email'>) => {
        try {
            // A. Create User in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // B. Save Profile to Firestore (using Auth UID as Doc ID)
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, {
                ...profileData,
                email: email,
                createdAt: new Date(),
            });

            console.log('User created and profile saved:', user.uid);
            return user.uid;
        } catch (error) {
            console.error('Error signing up:', error);
            throw error;
        }
    },

    /**
     * Login: Sign in with Email/Password
     */
    login: async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user.uid;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    },

    /**
     * Logout: Sign out current user
     */
    logout: async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    },

    /**
     * Get User Profile from Firestore
     */
    getUserProfile: async (userId: string) => {
        try {
            const docRef = doc(db, 'users', userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data() as UserProfile;
            } else {
                console.log("No such profile!");
                return null;
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            throw error;
        }
    },

    /**
     * Update User Profile
     */
    updateUserProfile: async (userId: string, data: Partial<UserProfile>) => {
        try {
            const docRef = doc(db, 'users', userId);
            await setDoc(docRef, data, { merge: true });
            console.log('Profile updated:', userId);
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    }
};
