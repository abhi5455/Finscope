import {supabase} from "./supabaseClient.ts";

export async function getUserDetails() {
    // get currently logged-in user
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError) throw authError;

    const user = authData?.user;
    if (!user) throw new Error("No user is signed in.");

    // now get profile info
    const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("display_name, email, created_at")
        .eq("id", user.id)
        .single();

    if (profileError) {
        // optionally, handle if profile doesn't exist yet
        if (profileError.code === "PGRST116") {
            // row not found
            return {
                id: user.id,
                email: user.email,
                display_name: null,
                created_at: null,
            };
        }
        throw profileError;
    }

    return {
        id: user.id,
        email: user.email,
        display_name: profileData.display_name,
        created_at: profileData.created_at,
    };
}

export async function updateUserProfile(displayName: string) {
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError) throw authError;

    const user = authData?.user;
    if (!user) throw new Error("No user is signed in.");

    const { data, error } = await supabase
        .from("profiles")
        .upsert({
            id: user.id,
            display_name: displayName,
        })
        .select()
        .single();

    if (error) throw error;

    return data;
}
