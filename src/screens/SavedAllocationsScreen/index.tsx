import React, {useCallback, useEffect, useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView, StatusBar, Image,
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import SaveIcon from '../../assets/svg/SaveIcon.svg'
import SaveIconFilled from '../../assets/svg/SaveIconFilled.svg';
import MagicPencilIcon from '../../assets/svg/MagicPencilIcon.svg';
import {PieChart} from "react-native-chart-kit";
import {useAppNavigation} from "../../common/navigationHelper.ts";
import {
    countTotalAllocationAmount, getGrowthThisMonth,
    getSavedAllocations,
    saveAllocation,
    unsaveAllocation
} from "../../services/allocationsService.ts";
import {IAllocation} from "../../types/allocation_type.ts";
import {format} from "date-fns";
import AddAllocationModal from "../HomeScreen/AddAllocationModal";
import ModifyAllocationModal from "../HomeScreen/ModifyAllocationModal";
import {useFocusEffect} from "@react-navigation/native";
import {useStatusBarOnFocus} from "../../hooks/useStatusBar.ts";
import TrendDown from "../../assets/svg/TrendDown.svg";
import TrendUp from "../../assets/svg/TrendUp.svg";

export default function SavedAllocationsScreen() {
    useStatusBarOnFocus('light-content', '#394f45')
    const navigation = useAppNavigation()
    const [addAllocationModalVisible, setAddAllocationModalVisible] = useState(false);
    const [modifyAllocationModalVisible, setModifyAllocationModalVisible] = useState(false);
    const [totalAllocationAmount, setTotalAllocationAmount] = useState(0);
    const [allocations, setAllocations] = useState<IAllocation[]>([]);
    const [selectedAllocation, setSelectedAllocation] = useState<IAllocation | null>(null);
    const [savedAllocations, setSavedAllocations] = useState<Set<string>>(new Set());

    const [growthThisMonth, setGrowthThisMonth] = useState<string>('0')
    const [growthLastMonth, setGrowthLastMonth] = useState<string>()
    const [growthPercentage, setGrowthPercentage] = useState<string>('0')

    const [triggerRefetch, setTriggerRefetch] = useState(0);

    const toggleSaveAllocation = (allocationId: string) => {
        let wasSaved = savedAllocations.has(allocationId);
        setSavedAllocations(prev => {
            const newSet = new Set(prev);
            if (wasSaved) {
                newSet.delete(allocationId);
            } else {
                newSet.add(allocationId);
            }
            return newSet;
        });
        if (!wasSaved) {
            saveAllocation(allocationId)
                .then(() => {
                    setTriggerRefetch(prev => prev + 1);
                })
                .catch((error) => {
                    console.error("Error saving allocation:", error);
                    setSavedAllocations(prev => {
                        const newSet = new Set(prev);
                        newSet.add(allocationId);
                        return newSet;
                    });
                });
        } else {
            unsaveAllocation(allocationId)
                .then(() => {
                    setTriggerRefetch(prev => prev + 1);
                })
                .catch((error) => {
                    console.error("Error unsaving allocation:", error);
                    setSavedAllocations(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(allocationId);
                        return newSet;
                    });
                });
        }
    };

    const fetchSavedAllocations = () => {
        console.log("Refetching allocations...");
        getSavedAllocations()
            .then((res) => {
                console.log(res)
                setAllocations(res);
                const savedIds = new Set(
                    res
                        .filter(a => a.is_saved)
                        .map(a => a.id)
                );
                setSavedAllocations(savedIds);
            })
        countTotalAllocationAmount()
            .then((totalAmount) => {
                setTotalAllocationAmount(totalAmount);
            })

        getGrowthThisMonth()
            .then(res => {
                setGrowthThisMonth(res.growthThisMonth)
                setGrowthLastMonth(res.growthLastMonth)
                setGrowthPercentage(res.growthPercentage)

                console.log("Growth ", res.growthThisMonth, res.growthLastMonth, res.growthPercentage, typeof res.growthLastMonth)
            })
    };

    useFocusEffect(
        useCallback(() => {
            fetchSavedAllocations();
        }, [])
    );

    useEffect(() => {
        fetchSavedAllocations();
    }, [triggerRefetch]);

    return (
        <SafeAreaView className="flex-1 bg-gray-800">
            <StatusBar backgroundColor={'#394f45'} barStyle={'light-content'}/>

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
                        <Text className="text-primary text-3xl font-interSemiBold mb-6">
                            ${Number(totalAllocationAmount).toFixed(2)}
                        </Text>
                    </View>
                    {/* Growth Card */}
                    <View
                        className={`relative border-[2px] ${Number(growthThisMonth) < 0 ? 'bg-[#a63b3b]/80 border-[#FF4C4C]' : 'bg-[#3b7e5e] border-[#46aa7c]'} rounded-2xl p-4 flex-row items-center justify-between overflow-hidden max-w-[45%]`}>
                        <View className="">
                            <Text
                                className={`${Number(growthThisMonth) < 0 ? 'text-[#FF4C4C]' : 'text-primary'} text-sm font-interMedium mb-1`}>
                                {growthThisMonth && Number(growthThisMonth) < 0 ? '-' : '+'} ${growthThisMonth && Math.abs(Number(growthThisMonth))}
                            </Text>
                            <View className="flex flex-row items-center justify-between gap-2 py-1">
                                <Text className="text-white text-3xl font-interBold mb-1">
                                    {growthPercentage}%
                                </Text>
                                <View>
                                    {growthThisMonth && Number(growthThisMonth) < 0 ?
                                        <TrendDown/>
                                        :
                                        <TrendUp height={35}/>
                                    }
                                </View>
                            </View>
                            <Text className="text-white text-sm font-interMedium">
                                Growth this month
                            </Text>
                        </View>
                        <View className="absolute left-0 top-0 right-0 bottom-0">
                            <Image source={require('../../assets/png/Pattern.png')} className=""/>
                        </View>
                    </View>
                </View>
                <View className="flex-row items-center justify-between px-6 mt-3 mb-1">
                    <View className="flex-row items-center">
                        <Text className="text-white text-lg font-interSemiBold mr-2">
                            Saved Allocations
                        </Text>
                        <MagicPencilIcon/>
                    </View>
                    {/*<TouchableOpacity onPress={() => {*/}
                    {/*    setAddAllocationModalVisible(true)*/}
                    {/*}}>*/}
                    {/*    <Text className="text-primary text-md font-interMedium">*/}
                    {/*        + Add New*/}
                    {/*    </Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
                <ScrollView className="flex-1 px-6">
                    {/* Allocations Section */}
                    {allocations && allocations.length > 0 ?
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
                                            <TouchableOpacity onPress={() => toggleSaveAllocation(allocation.id)}>
                                                {savedAllocations.has(allocation.id) ? <SaveIconFilled/> : <SaveIcon/>}
                                            </TouchableOpacity>
                                            <Text className="text-gray-400 text-xs font-interMedium">
                                                {allocation.created_at && format(allocation.created_at, 'dd MMM yyyy')}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}

                            {/* Add New Allocation Button */}
                            {/*<TouchableOpacity*/}
                            {/*    className="bg-[#363d3a] border-dashed border-[1.5px] border-[#666666] rounded-2xl px-4 py-8 items-center justify-center mt-4 mb-40"*/}
                            {/*    onPress={() => {*/}
                            {/*        setAddAllocationModalVisible(true)*/}
                            {/*    }}>*/}
                            {/*    <View className="flex flex-row items-center justify-center gap-2">*/}
                            {/*        <PlusIcon/>*/}
                            {/*        <Text className="text-primary text-base font-interSemiBold">*/}
                            {/*            Add New Allocation*/}
                            {/*        </Text>*/}
                            {/*    </View>*/}
                            {/*</TouchableOpacity>*/}
                        </View>
                        :
                        <View className="flex-1 min-h-full items-center justify-center py-48 opacity-20">
                            <Text className="text-gray-400 text-lg font-interMedium mb-1">
                                No saved allocations
                            </Text>
                        </View>
                    }
                </ScrollView>

                <AddAllocationModal
                    visible={addAllocationModalVisible}
                    onClose={() => setAddAllocationModalVisible(false)}
                    setTriggerRefetch={setTriggerRefetch}
                    onSave={() => {
                    }}
                />
                <ModifyAllocationModal
                    visible={modifyAllocationModalVisible}
                    onClose={() => setModifyAllocationModalVisible(false)}
                    setTriggerRefetch={setTriggerRefetch}
                    onSave={() => {
                    }}
                    selectedAllocation={selectedAllocation}
                />
            </LinearGradient>
        </SafeAreaView>
    );
};