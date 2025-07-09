import {createClient} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl: string = 'https://avygnyvqvuqpxorvwwif.supabase.co';
const supabaseAnonKey: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2eWdueXZxdnVxcHhvcnZ3d2lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MDUwODksImV4cCI6MjA2NzQ4MTA4OX0.Cc7jERFZxrNPU2lOIdRX6m1b2OaMz4lOsM4J21oDdY8';

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

    console.log("🔷 Signup response:", { data, error });

    if (data?.user) {
        console.log("✅ Signup successful:", data.user);
        return { status: 'signed_up', user: data.user, session: data.session };
    }

    if (error) {
        console.error("❌ Signup failed:", error);
        throw error;
    }
};


export const signInWithEmailPassword = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    console.log("🔷 Login response:", { data, error });

    if (data?.user) {
        console.log("✅ Login successful:", data.user);
        return { status: 'logged_in', user: data.user, session: data.session };
    }

    if (error) {
        console.error("❌ Login failed:", error);
        throw error;
    }
};


export const signInOrSignUp = async (email: string, password: string) => {
    if (await checkSignedUpWithEmailPassword(email, password)) {
        console.log("👤 User already exists, trying to log in…");

        signInWithEmailPassword(email, password)
    }
    else {
        console.log("🔷 Trying to sign up:", email);
        // SignUpWithEmailPassword(email, password)
    }

    throw new Error("Unexpected auth flow failure.");
};