import {createClient} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";

const supabaseUrl: string = 'https://tfeewrujvuatxcghxbbm.supabase.co';
const supabaseAnonKey: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmZWV3cnVqdnVhdHhjZ2h4YmJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMDg5NDUsImV4cCI6MjA2Njg4NDk0NX0.sDlcpMzcMvSu0nDOd-utVvAq1RBCyfcqUUHlXOgpDx8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false, // important for RN
    },
});

export const checkSignedUpWithEmailPassword = async (email: string, password: string) => {
    const {data: signUpData, error: signUpError} = await supabase.auth.signUp({
        email,
        password,
    });

    console.log("IsSignedUp:", signUpError?.message === 'User already registered');

    return signUpError?.message === 'User already registered';
}

export const signUpWithEmailPassword = async (
    name: string,
    email: string,
    password: string
) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
            }
        }
    });

    console.log("Signup response:", { data, error });

    if (data?.user) {
        console.log("Signup successful:", data.user);

        // Add user metadata to profiles table
        const {data: {user}} = await supabase.auth.getUser();
        await supabase.from('profiles').insert({
            id: user?.id,
            email: user?.email,
            display_name: name
        });

        return { status: 'signed_up', user: data.user, session: data.session };
    }

    if (error) {
        console.error("Signup failed:", error);
        Toast.show({
            type: 'error',
            text1: 'Signup Error',
            text2: error.message || 'An unexpected error occurred during signup.',
            position: 'bottom'
        })
        throw error;
    }
};


export const signInWithEmailPassword = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    console.log("🔷 Login response:", { data, error });

    if (data?.user) {
        console.log("Login successful:", data.user);
        return { status: 'logged_in', user: data.user, session: data.session };
    }

    if (error) {
        console.error("Login failed:", error);
        Toast.show({
            type: 'error',
            text1: 'Login Error',
            text2: error.message || 'An unexpected error occurred during login.',
            position: 'bottom'
        });
        throw error;
    }
};


export const signInOrSignUp = async (email: string, password: string) => {
    if (await checkSignedUpWithEmailPassword(email, password)) {
        console.log("User already exists, trying to log in…");

        signInWithEmailPassword(email, password)
    }
    else {
        console.log("Trying to sign up:", email);
        // SignUpWithEmailPassword(email, password)
    }

    throw new Error("Unexpected auth flow failure.");
};