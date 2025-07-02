import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import SaveIcon from '../../assets/svg/SaveIcon.svg'
import MagicPencilIcon from '../../assets/svg/MagicPencilIcon.svg';
import Pattern from '../../assets/svg/Pattern1.svg';
import PlusIcon from '../../assets/svg/PlusIcon.svg';
import {PieChart} from "react-native-chart-kit";

const App = () => {
    const allocations = [
        {
            id: 1,
            name: 'National Bank Savings',
            type: 'Savings Account',
            amount: '$1,000.00',
            date: '15 Nov 2025',
            iconColor: 'bg-green-500',
        },
        {
            id: 2,
            name: 'Swiss bank savings',
            type: 'Savings Account',
            amount: '$1,000.00',
            date: '15 Nov 2025',
            iconColor: 'bg-teal-500',
        },
        {
            id: 3,
            name: 'Real Estate',
            type: 'Savings Account',
            amount: '$7,0000.00',
            date: '15 Nov 2025',
            iconColor: 'bg-green-400',
        },
        {
            id: 4,
            name: 'Mutual Funds',
            type: 'Savings Account',
            amount: '$11,0000.00',
            date: '15 Nov 2025',
            iconColor: 'bg-green-500',
        },
        {
            id: 5,
            name: 'Mutual Funds',
            type: 'Savings Account',
            amount: '$11,0000.00',
            date: '15 Nov 2025',
            iconColor: 'bg-green-500',
        },
        {
            id: 6,
            name: 'Mutual Funds',
            type: 'Savings Account',
            amount: '$11,0000.00',
            date: '15 Nov 2025',
            iconColor: 'bg-green-500',
        },
        {
            id: 7,
            name: 'Mutual Funds',
            type: 'Savings Account',
            amount: '$11,0000.00',
            date: '15 Nov 2025',
            iconColor: 'bg-green-500',
        },
    ];

    const pieData = [
        {
            name: "Quarter Slice",
            population: 37,
            color: "#46aa7c",
            legendFontColor: "#ffffff",
            legendFontSize: 12,
        },
        {
            name: "Rest",
            population: 75,
            color: "#585858", // Dim background color like dark gray
            legendFontColor: "#ffffff",
            legendFontSize: 12,
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-gray-800">
            <LinearGradient
                colors={['#394f45', '#282828', '#282828']}
                locations={[0, 0.2, 1]}
                className="flex-1 flex-col gap-5 pt-8"
            >

                {/* Header Section */}
                <View className="mt-2 flex flex-row justify-center items-start px-6">
                    <View className="flex-1">
                        <Text className="text-white text-2xl font-interSemiBold mb-4">
                            Your Net{'\n'}Worth
                        </Text>
                        <Text className="text-primary text-4xl font-interSemiBold mb-6">
                            $1,000,000
                        </Text>
                    </View>

                    {/* Growth Card */}
                    <View
                        className="relative bg-[#3b7e5e] border-[1.5px] border-[#46aa7c] rounded-2xl p-4 flex-row items-center justify-between">
                        <View className="">
                            <Text className="text-white text-sm font-interMedium mb-1">
                                + $124,900.85
                            </Text>
                            <Text className="text-white text-2xl font-interSemiBold mb-1">
                                10%
                            </Text>
                            <Text className="text-white text-sm font-interMedium">
                                Growth this month
                            </Text>
                        </View>
                        <View className="absolute left-0 top-0">
                            <Pattern/>
                        </View>
                    </View>
                </View>


                <View className="flex-row items-center justify-between px-6 mb-2">
                    <View className="flex-row items-center">
                        <Text className="text-white text-lg font-interSemiBold mr-2">
                            Allocations
                        </Text>
                        <MagicPencilIcon/>
                    </View>
                    <TouchableOpacity>
                        <Text className="text-primary text-md font-interMedium">
                            + Add New
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1 px-6">

                    {/* Allocations Section */}
                    <View className="mb-6">

                        {/* Allocation Cards */}
                        {allocations.map((allocation) => (
                            <View
                                key={allocation.id}
                                className=" bg-[#494949] rounded-xl p-4 mb-4 flex flex-row items-start border-[1.5px] border-[#666666]"
                            >
                                <View className="w-[60px] h-[60px] overflow-hidden mr-3 flex items-center justify-center rounded-full">
                                        <PieChart
                                            data={pieData}
                                            width={65}
                                            height={65}
                                            chartConfig={{
                                                color: (opacity = 1) => `rgba(255, 0, 25, ${opacity})`,
                                            }}
                                            accessor="population"
                                            backgroundColor="transparent"
                                            paddingLeft="16"
                                            hasLegend={false}
                                            absolute
                                        />
                                </View>

                                <View className="flex-1">
                                    <Text className="text-white text-base font-interMedium mb-1">
                                        {allocation.name}
                                    </Text>
                                    <Text className="text-gray-400 text-sm font-interMedium mb-1">
                                        {allocation.type}
                                    </Text>
                                    <Text className="text-primary text-base font-interSemiBold">
                                        {allocation.amount}
                                    </Text>
                                </View>

                                <View className="flex flex-col justify-between items-end self-stretch">
                                    <TouchableOpacity>
                                        <SaveIcon/>
                                    </TouchableOpacity>
                                    <Text className="text-gray-400 text-xs font-interMedium">
                                        {allocation.date}
                                    </Text>
                                </View>
                            </View>
                        ))}

                        {/* Add New Allocation Button */}
                        <TouchableOpacity
                            className="bg-[#363d3a] border-dashed border-[1.5px] border-[#666666] rounded-2xl px-4 py-8 items-center justify-center mt-4 mb-40">
                            <View className="flex flex-row items-center justify-center gap-2">
                                <PlusIcon/>
                                <Text className="text-primary text-base font-interSemiBold">
                                    Add New Allocation
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default App;