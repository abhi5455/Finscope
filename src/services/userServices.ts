import {supabase} from "./supabaseClient.ts";

export async function getUserDetails(): Promise<any> {
    const { data, error } = await supabase.auth.getUser();

    console.log("🔷 User details response:", { data, error });
    return data?.user?.user_metadata;
}