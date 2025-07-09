export interface IAllocation{
    id: string;
    user_id: string;
    title: string;
    amount: number;
    type?: string;
    note?: string;
    is_saved?: boolean;
    created_at?: string;
    updated_at?: string;
};

export interface ITransaction{
    id: string;
    allocation_id: string;
    allocation_title?: string;
    amount: number;
    remark?: string;
    transaction_type: "added" | "deducted";
    created_at?: string;
};