import React, {useCallback, useEffect, useState} from 'react';
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
import {useAppNavigation} from "../../common/navigationHelper.ts";
import AddAllocationModal from "./AddAllocationModal";
import ModifyAllocationModal from "./ModifyAllocationModal";
import {useFocusEffect} from "@react-navigation/native";
import {countTotalAllocationAmount, getAllAllocations} from "../../services/allocationsService.ts";
import {IAllocation} from "../../types/allocation_type.ts";
import {format} from "date-fns";

export default function HomeScreen() {
    const navigation = useAppNavigation()
    const [addAllocationModalVisible, setAddAllocationModalVisible] = useState(false);
    const [modifyAllocationModalVisible, setModifyAllocationModalVisible] = useState(false);
    const [totalAllocationAmount, setTotalAllocationAmount] = useState(0);

    const [allocations, setAllocations] = useState<IAllocation[]>([]);
    const [selectedAllocation, setSelectedAllocation] = useState<IAllocation | null>(null);

    useEffect(() => {
        console.log(selectedAllocation)
    }, [selectedAllocation]);

    useFocusEffect(
        useCallback(() => {
            getAllAllocations()
                .then((res) => {
                    console.log(res)
                    setAllocations(res);
                })

            countTotalAllocationAmount()
                .then((totalAmount) => {
                    setTotalAllocationAmount(totalAmount);
                })
            return () => {
                console.log('Screen unfocused — cleanup if needed');
            };
        }, [])
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-800">
            <LinearGradient
                colors={['#394f45', '#282828', '#282828']}
                locations={[0, 0.15, 1]}
                className="flex-1 flex-col gap-5 pt-8"
            >

                {/* Header Section */}
                <View className="flex flex-row justify-center items-start px-6">
                    <View className="flex-1">
                        <Text className="text-white text-2xl font-interSemiBold mb-4">
                            Your Net{'\n'}Worth
                        </Text>
                        <Text className="text-primary text-4xl font-interSemiBold mb-6">
                            ${totalAllocationAmount}
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


                <View className="flex-row items-center justify-between px-6 mt-3 mb-1">
                    <View className="flex-row items-center">
                        <Text className="text-white text-lg font-interSemiBold mr-2">
                            Allocations
                        </Text>
                        <MagicPencilIcon/>
                    </View>
                    <TouchableOpacity onPress={() => {
                        setAddAllocationModalVisible(true)
                    }}>
                        <Text className="text-primary text-md font-interMedium">
                            + Add New
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1 px-6">

                    {/* Allocations Section */}
                    <View className="mb-6">

                        {/* Allocation Cards */}
                        {allocations?.map((allocation) => {
                            const percentage = totalAllocationAmount > 0
                                ? (allocation.amount / totalAllocationAmount) * 100
                                : 0;

                            const pieData = [
                                {
                                    name: 'Allocated',
                                    population: percentage,
                                    color: '#46aa7c',
                                    legendFontColor: '#ffffff',
                                    legendFontSize: 12,
                                },
                                {
                                    name: 'Remaining',
                                    population: 100 - percentage,
                                    color: '#585858',
                                    legendFontColor: '#ffffff',
                                    legendFontSize: 12,
                                },
                            ];

                            return (
                                <TouchableOpacity
                                    key={allocation.id}
                                    className="bg-[#494949]/80 rounded-xl p-4 mb-4 flex flex-row items-start border-[1.5px] border-[#666666]"
                                    onPress={() => {
                                        setModifyAllocationModalVisible(true)
                                        setSelectedAllocation(allocation);
                                    }}
                                >
                                    <View
                                        className="w-[60px] h-[60px] overflow-hidden mr-3 flex items-center justify-center rounded-full">
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
                                            {allocation.title}
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
                                            {allocation.created_at && format(allocation.created_at, 'dd MMM yyyy')}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}

                        {/* Add New Allocation Button */}
                        <TouchableOpacity
                            className="bg-[#363d3a] border-dashed border-[1.5px] border-[#666666] rounded-2xl px-4 py-8 items-center justify-center mt-4 mb-40"
                            onPress={() => {
                                setAddAllocationModalVisible(true)
                            }}>
                            <View className="flex flex-row items-center justify-center gap-2">
                                <PlusIcon/>
                                <Text className="text-primary text-base font-interSemiBold">
                                    Add New Allocation
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <AddAllocationModal
                    visible={addAllocationModalVisible}
                    onClose={() => setAddAllocationModalVisible(false)}
                    onSave={() => {

                    }}
                />

                <ModifyAllocationModal
                    visible={modifyAllocationModalVisible}
                    onClose={() => setModifyAllocationModalVisible(false)}
                    onSave={() => {

                    }}
                    selectedAllocation={selectedAllocation}
                />
            </LinearGradient>
        </SafeAreaView>
    );
};