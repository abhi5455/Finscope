import {supabase} from "./supabaseClient.ts";
import Toast from "react-native-toast-message";

export async function createNewAllocation(
    title: string,
    type: string,
    amount: string
): Promise<void> {

    const { data: { user } } = await supabase.auth.getUser();

    const allocation = {
        title,
        type,
        amount: parseFloat(amount),
        user_id: user?.id
    }

    const {data, error} = await supabase
        .from('allocations')
        .insert([allocation])
        .single()

    if (error) {
        Toast.show({
            type: 'error',
            text1: 'Error creating allocation:',
            text2: error.message || 'An unexpected error occurred.',
            position:'bottom'
        });
        throw error;
    }

    Toast.show({
        type: 'success',
        text1: 'New allocation created successfully',
        position:'bottom'
    });
}

export async function getAllAllocations(): Promise<any[]> {
    const { data, error } = await supabase
        .from('allocations')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        Toast.show({
            type: 'error',
            text1: 'Error fetching allocations:',
            text2: error.message || 'An unexpected error occurred.',
            position:'bottom'
        });
        throw error;
    }

    return data || [];
}

export async function countTotalAllocationAmount(): Promise<number> {
    const { data, error } = await supabase
        .from('allocations')
        .select('amount', { count: 'exact' });

    if (error) {
        Toast.show({
            type: 'error',
            text1: 'Error counting allocations:',
            text2: error.message || 'An unexpected error occurred.',
            position:'bottom'
        });
        throw error;
    }

    return data.reduce((total, allocation) => total + allocation.amount, 0);
}