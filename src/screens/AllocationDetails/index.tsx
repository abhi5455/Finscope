import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import BackIcon from '../../assets/svg/BackIcon.svg';
import {useAppNavigation} from "../../common/navigationHelper.ts";

export default function AllocationDetails() {
    const navigation = useAppNavigation();

    const transactions = [
        {
            id: 1,
            amount: '+125455.00',
            description: 'Lorem ipsum dolor sit amet',
            date: '15 Nov, 2025',
            isPositive: true,
        },
        {
            id: 2,
            amount: '-1500.00',
            description: 'Lorem ipsum dolor sit amet',
            date: '15 Nov, 2025',
            isPositive: false,
        },
        {
            id: 3,
            amount: '-1500.00',
            description: 'Lorem ipsum dolor sit amet',
            date: '15 Nov, 2025',
            isPositive: false,
        },
        {
            id: 4,
            amount: '-1500.00',
            description: 'Lorem ipsum dolor sit amet',
            date: '15 Nov, 2025',
            isPositive: false,
        },
        {
            id: 5,
            amount: '+125455.00',
            description: 'Lorem ipsum dolor sit amet',
            date: '15 Nov, 2025',
            isPositive: true,
        },
        {
            id: 6,
            amount: '+125455.00',
            description: 'Lorem ipsum dolor sit amet',
            date: '15 Nov, 2025',
            isPositive: true,
        },
        {
            id: 7,
            amount: '+125455.00',
            description: 'Lorem ipsum dolor sit amet',
            date: '15 Nov, 2025',
            isPositive: true,
        },
        {
            id: 8,
            amount: '+125455.00',
            description: 'Lorem ipsum dolor sit amet',
            date: '15 Nov, 2025',
            isPositive: true,
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-secondary">
            {/* Header */}
            <View className="flex-row items-center justify-between gap-5 px-6 py-4 mt-2">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIcon/>
                </TouchableOpacity>
                <Text className="text-white text-xl font-interBold flex-1 text-left">
                    National bank Savings
                </Text>
            </View>

            {/* Transaction List */}
            <ScrollView className="flex-1 px-7">
                {transactions.map((transaction, index) => (
                    <View key={transaction.id}>
                        <View className="py-4">
                            <View className="flex-row items-start justify-between mb-2">
                                <Text
                                    className={`text-lg font-interSemiBold ${
                                        transaction.isPositive ? 'text-green-400' : 'text-red-400'
                                    }`}
                                >
                                    {transaction.amount}
                                </Text>
                                <Text className="text-gray-400 text-sm font-interMedium">
                                    {transaction.date}
                                </Text>
                            </View>
                            <Text className="text-gray-400 text-sm font-interMedium">
                                {transaction.description}
                            </Text>
                        </View>
                        {index < transactions.length - 1 && (
                            <View className="h-px bg-[#494949]" />
                        )}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};