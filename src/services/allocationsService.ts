import {supabase} from "./supabaseClient.ts";
import Toast from "react-native-toast-message";

export async function createNewAllocation(
    title: string,
    type: string,
    amount: string
): Promise<void> {

    const {data: {user}} = await supabase.auth.getUser();

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
            position: 'bottom'
        });
        throw error;
    }

    Toast.show({
        type: 'success',
        text1: 'New allocation created successfully',
        position: 'bottom'
    });
}

export async function getAllAllocations(): Promise<any[]> {
    const {data: {user}} = await supabase.auth.getUser();

    const {data, error} = await supabase
        .from('allocations')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', {ascending: false});

    if (error) {
        Toast.show({
            type: 'error',
            text1: 'Error fetching allocations:',
            text2: error.message || 'An unexpected error occurred.',
            position: 'bottom'
        });
        throw error;
    }

    return data || [];
}

export async function saveAllocation(id: string): Promise<void> {
    const {data: {user}} = await supabase.auth.getUser();

    const {error} = await supabase
        .from('allocations')
        .update({is_saved: true})
        .eq('id', id)
        .eq('user_id', user?.id);

    if (error) {
        Toast.show({
            type: 'error',
            text1: 'Error saving allocation:',
            text2: error.message || 'An unexpected error occurred.',
            position: 'bottom'
        });
        throw error;
    }

    Toast.show({
        type: 'success',
        text1: 'Allocation saved successfully',
        position: 'bottom'
    });
}

export async function unsaveAllocation(id: string): Promise<void> {
    const {data: {user}} = await supabase.auth.getUser();

    const {error} = await supabase
        .from('allocations')
        .update({is_saved: false})
        .eq('id', id)
        .eq('user_id', user?.id);

    if (error) {
        Toast.show({
            type: 'error',
            text1: 'Error unsaving allocation:',
            text2: error.message || 'An unexpected error occurred.',
            position: 'bottom'
        });
        throw error;
    }

    Toast.show({
        type: 'success',
        text1: 'Allocation unsaved successfully',
        position: 'bottom'
    });
}

export async function getSavedAllocations(): Promise<any[]> {
    const {data: {user}} = await supabase.auth.getUser();

    const {data, error} = await supabase
        .from('allocations')
        .select('*')
        .eq('user_id', user?.id)
        .eq('is_saved', true)
        .order('created_at', {ascending: false});

    if (error) {
        Toast.show({
            type: 'error',
            text1: 'Error fetching saved allocations:',
            text2: error.message || 'An unexpected error occurred.',
            position: 'bottom'
        });
        throw error;
    }

    return data || [];
}

export async function countTotalAllocationAmount(): Promise<number> {
    const {data: {user}} = await supabase.auth.getUser();

    const {data, error} = await supabase
        .from('allocations')
        .select('amount')
        .eq('user_id', user?.id);

    if (error) {
        Toast.show({
            type: 'error',
            text1: 'Error counting allocations:',
            text2: error.message || 'An unexpected error occurred.',
            position: 'bottom'
        });
        throw error;
    }

    return (data ?? []).reduce((total, allocation) => total + allocation.amount, 0);
}


export async function deleteAllocation(id: string): Promise<void> {
    // const { data: { user } } = await supabase.auth.getUser();

    const {error} = await supabase
        .from('allocations')
        .delete()
        .eq('id', id)
    // .eq('user_id', user?.id);

    if (error) throw error;
}

export async function updateAllocation(
    id: string,
    title: string,
    type: string,
    transaction_type: 'added' | 'deducted',
    update_amount: string | null = null,
    remarks: string
): Promise<void> {
    const {data: {user}} = await supabase.auth.getUser();

    const {error} = await supabase
        .from('allocations')
        .update({title, type})
        .eq('id', id)
        .eq('user_id', user?.id);

    if (error) throw error;

    if (update_amount) {
        await addTransactionToAllocation(id, update_amount, transaction_type, remarks);
    }
}

export async function addTransactionToAllocation(
    allocationId: string,
    amount: string,
    transactionType: 'added' | 'deducted',
    remark?: string
): Promise<void> {

    const {error} = await supabase
        .from('transactions')
        .insert({
            allocation_id: allocationId,
            amount: parseFloat(amount),
            transaction_type: transactionType,
            remark,
        });

    if (error) throw error;
}

export async function getTransactionsForAllocation(allocationId: string): Promise<any[]> {

    const {data, error} = await supabase
        .from('transactions')
        .select('*')
        .eq('allocation_id', allocationId)
        .order('created_at', {ascending: false});

    if (error) throw error;

    return data || [];
}

export async function getAllTransactions(): Promise<any[]> {
    const {data: {user}} = await supabase.auth.getUser();

    const {data, error} = await supabase
        .from('transactions')
        .select(`
                *,
                allocations (
                    title,
                    user_id
                )
        `)
        .order('created_at', {ascending: false});

    if (error) throw error;

    return (data ?? [])
        .filter(t => t.allocations?.user_id === user?.id)
        .map(t => ({
            ...t,
            allocation_title: t.allocations?.title || ''
        }));
}
