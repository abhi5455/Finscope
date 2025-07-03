import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal, StatusBar, Pressable,
} from 'react-native';
import {Minus, PlusIcon} from "lucide-react-native";
import TransactionIcon from '../../../assets/svg/TransactionGreenIcon.svg';
import DeleteIcon from '../../../assets/svg/DeleteIcon.svg';
import {useAppNavigation} from "../../../common/navigationHelper.ts";

interface AddAllocationModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (data: { title: string; type: string; amount: string }) => void;
}

const ModifyAllocationModal: React.FC<AddAllocationModalProps> = ({
                                                                      visible,
                                                                      onClose,
                                                                      onSave,
                                                                  }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const navigation = useAppNavigation();

    const handleSave = () => {
        onSave({title, type, amount});
        // Reset form
        setTitle('');
        setType('');
        setAmount('');
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <StatusBar backgroundColor={'#000'} barStyle={'light-content'}/>
            <Pressable className="flex-1 bg-[#545454]/80 bg-opacity-50 justify-end" onPress={onClose}>
                <Pressable className="bg-secondary rounded-t-3xl px-6 py-8" onPress={(e) => e.stopPropagation()}>
                    <View className="flex flex-row items-center justify-between mb-8">
                        <Text className="text-white text-xl font-interSemiBold">
                            Modify Allocation
                        </Text>
                        <View className="flex flex-row items-center justify-between gap-4">
                            <TouchableOpacity onPress={()=>{
                                onClose();
                                navigation.navigate("SectionNavigator", {
                                    screen: "AllocationDetails",
                                });
                            }}>
                                <TransactionIcon/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <DeleteIcon/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Title Input */}
                    <View className="mb-4">
                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            placeholder="National Bank Savings"
                            placeholderTextColor="#9ca3af"
                            className="bg-transparent border border-[#9fafaf] rounded-lg px-4 py-4 text-white font-interMedium text-base"
                        />
                    </View>

                    {/* Type Input */}
                    <View className="mb-4">
                        <TextInput
                            value={type}
                            onChangeText={setType}
                            placeholder="Savings Account"
                            placeholderTextColor="#9ca3af"
                            className="bg-transparent border border-[#9fafaf] rounded-lg px-4 py-4 text-white font-interMedium text-base"
                        />
                    </View>

                    {/* Amount to Add Input */}
                    <View className="mb-4 flex-row items-center justify-between gap-4">
                        <TouchableOpacity
                            className="flex justify-center items-center bg-[#9fafaf] rounded-lg self-stretch px-5">
                            <Minus size={15}/>
                        </TouchableOpacity>
                        <TextInput
                            value={type}
                            onChangeText={setType}
                            placeholder="Amount to Add"
                            placeholderTextColor="#9ca3af"
                            className="flex-1 bg-transparent border border-[#9fafaf] rounded-lg px-4 py-4 text-white font-interMedium text-base"
                        />
                        <TouchableOpacity
                            className="flex justify-center items-center bg-[#9fafaf] rounded-lg self-stretch px-5">
                            <PlusIcon size={15}/>
                        </TouchableOpacity>
                    </View>

                    {/* Amount to Deduct Input */}
                    <View className="mb-4 flex-row items-center justify-between gap-4">
                        <TouchableOpacity
                            className="flex justify-center items-center bg-[#9fafaf] rounded-lg self-stretch px-5">
                            <Minus size={15}/>
                        </TouchableOpacity>
                        <TextInput
                            value={type}
                            onChangeText={setType}
                            placeholder="Amount to Deduct"
                            placeholderTextColor="#9ca3af"
                            className="flex-1 bg-transparent border border-[#9fafaf] rounded-lg px-4 py-4 text-white font-interMedium text-base"
                        />
                        <TouchableOpacity
                            className="flex justify-center items-center bg-[#9fafaf] rounded-lg self-stretch px-5">
                            <PlusIcon size={15}/>
                        </TouchableOpacity>
                    </View>

                    {/* Remarks Input */}
                    <View className="mb-8">
                        <TextInput
                            value={amount}
                            onChangeText={setAmount}
                            placeholder="Remarks"
                            placeholderTextColor="#9ca3af"
                            keyboardType="numeric"
                            className="bg-transparent border border-[#9fafaf] rounded-lg px-4 py-4 text-white font-interMedium text-base"
                        />
                    </View>

                    {/* Save Button */}
                    <TouchableOpacity
                        onPress={handleSave}
                        className="bg-[#3d8262] rounded-lg py-4 items-center border-primary border-[1.5px]"
                    >
                        <Text className="text-primary text-lg font-interSemiBold">
                            Save
                        </Text>
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default ModifyAllocationModal;