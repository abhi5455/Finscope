// import { MMKV } from 'react-native-mmkv';
//
// const storage = new MMKV();

import {supabase} from "./supabaseClient.ts";

export function setSignedIn(){
    // storage.set('is_logged_in', true);
}

export function setSignedOut(){
    // storage.set('is_logged_in', false);
}

export async function checkIsSignedIn(){
    const { data, error } = await supabase.auth.getSession();

    if (data.session) {
        console.log("User is logged in:", data.session.user.id);
        return true
    } else {
        console.log("No active session.");
        return false
    }
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Error logging out:", error.message);
        throw error;
    } else {
        console.log("User logged out successfully.");
        return true;
    }
}
