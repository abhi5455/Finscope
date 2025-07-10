import React, {Fragment, useCallback} from 'react';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import {useAppNavigation} from "../../common/navigationHelper.ts";
import {ITransaction} from "../../types/allocation_type.ts";
import {getAllTransactions} from "../../services/allocationsService.ts";
import {format} from "date-fns";
import HandCoins from '../../assets/svg/HandCoins.svg'
import {useFocusEffect} from "@react-navigation/native";

export default function AllTransactionScreen() {
    const navigation = useAppNavigation();
    const [transactions, setTransactions] = React.useState<ITransaction[] | null>(null);

    useFocusEffect(
        useCallback(() => {
            getAllTransactions()
                .then((data) => {
                    console.log('All Transactions:', data);
                    setTransactions(data);
                })
            return () => {

            };
        }, [])
    );

    return (
        <SafeAreaView className="flex-1 bg-secondary">
            {/* Header */}
            <View className="flex-row items-center justify-between gap-5 px-6 py-4 mt-2">
                <Text className="text-white text-xl font-interBold flex-1 text-left">
                    All Transactions
                </Text>
            </View>
            {/* Transaction List */}
            <ScrollView className="flex-1 px-7">
                {transactions && transactions.length > 0 ?
                    <Fragment>
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
                                    <View className="flex flex-row items-center justify-start gap-1.5">
                                        <View className="opacity-45">
                                            <HandCoins stroke={'#9ca3af'}/>
                                        </View>
                                        <Text className="text-gray-400 text-sm font-interMedium">
                                            {transaction?.allocation_title}
                                        </Text>
                                    </View>
                                </View>
                                {index < transactions.length - 1 && (
                                    <View className="h-px bg-[#494949]"/>
                                )}
                            </View>
                        ))}
                    </Fragment>
                    :
                    <View className="flex-1 min-h-full items-center justify-center py-48 opacity-20">
                        <Text className="text-gray-400 text-lg font-interMedium mb-1">
                            No Transactions yet!
                        </Text>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
};