import React, {useEffect} from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import BackIcon from '../../assets/svg/BackIcon.svg';
import {useAppNavigation} from "../../common/navigationHelper.ts";
import {IAllocation, ITransaction} from "../../types/allocation_type.ts";
import {RouteProp, useRoute} from "@react-navigation/native";
import {getTransactionsForAllocation} from "../../services/allocationsService.ts";
import Toast from "react-native-toast-message";
import {format} from "date-fns";

interface RouteParams {
    allocation: IAllocation
}

export default function AllocationDetails() {
    const route = useRoute<RouteProp<{ AllocationDetails: RouteParams }, 'AllocationDetails'>>();
    const {allocation} = route.params;
    const navigation = useAppNavigation();

    const [transactions, setTransactions] = React.useState<ITransaction[] | null>(null);

    useEffect(() => {
        getTransactionsForAllocation(allocation.id)
            .then((data) => {
                setTransactions(data);
            })

    }, []);

    return (
        <SafeAreaView className="flex-1 bg-secondary">
            {/* Header */}
            <View className="flex-row items-center justify-between gap-5 px-6 py-4 mt-2">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIcon/>
                </TouchableOpacity>
                <Text className="text-white text-xl font-interBold flex-1 text-left">
                    {allocation.title}
                </Text>
            </View>

            {/* Transaction List */}
            <ScrollView className="flex-1 px-7">
                {transactions?.map((transaction, index) => (
                    <View key={transaction.id}>
                        <View className="py-4">
                            <View className="flex-row items-start justify-between mb-2">
                                <Text
                                    className={`text-lg font-interSemiBold ${
                                        transaction.transaction_type === 'added' ? 'text-green-400' : 'text-red-400'
                                    }`}
                                >
                                    {transaction.transaction_type === 'added' ? '+' : '-'}{transaction.amount}
                                </Text>
                                <Text className="text-gray-400 text-sm font-interMedium">
                                    {transaction?.created_at && format(transaction.created_at, 'dd MMM, yyyy')}
                                </Text>
                            </View>
                            <Text className="text-gray-400 text-sm font-interMedium">
                                {transaction.remark}
                            </Text>
                        </View>
                        {index < transactions.length - 1 && (
                            <View className="h-px bg-[#494949]"/>
                        )}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};