import React, {useEffect, useState} from 'react';
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
import {IAllocation} from "../../../types/allocation_type.ts";
import {deleteAllocation, updateAllocation} from "../../../services/allocationsService.ts";
import Toast from "react-native-toast-message";

interface AddAllocationModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (data: { title: string; type: string; amount: string }) => void;
    selectedAllocation?: IAllocation | null;
}

const ModifyAllocationModal: React.FC<AddAllocationModalProps> = ({
                                                                      visible,
                                                                      onClose,
                                                                      onSave,
                                                                      selectedAllocation = null
                                                                  }) => {
    const [title, setTitle] = useState(selectedAllocation?.title || '');
    const [type, setType] = useState(selectedAllocation?.type || '');
    const [amount, setAmount] = useState('');
    const [remarks, setRemarks] = useState('');

    const [transactionType, setTransactionType] = useState<'added' | 'deducted'>('added');
    const navigation = useAppNavigation();

    useEffect(() => {
        if (selectedAllocation) {
            setTitle(selectedAllocation?.title || '');
            setType(selectedAllocation?.type || '');
        }
    }, [selectedAllocation]);

    const handleSave = () => {
        onSave({title, type, amount});
        if (selectedAllocation)
            updateAllocation(selectedAllocation.id, title, type, transactionType, amount, remarks)
                .then(() => {
                    onClose();
                })
                .catch((error) => {
                    console.error('Error creating allocation:', error);
                })
                .finally(() => {
                    setAmount('');
                    setRemarks('');
                })

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
                    <View className="flex flex-row items-center justify-between mb-1">
                        <Text className="text-white text-xl font-interSemiBold">
                            Modify Allocation
                        </Text>
                        <View className="flex flex-row items-center justify-between gap-4">
                            <TouchableOpacity onPress={() => {
                                onClose();
                                navigation.navigate("SectionNavigator", {
                                    screen: "AllocationDetails",
                                    params: {
                                        allocation: selectedAllocation
                                    }
                                });
                            }}>
                                <TransactionIcon/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                deleteAllocation(selectedAllocation?.id || '')
                                    .then(() => {
                                        Toast.show({
                                            type: 'success',
                                            text1: 'Allocation deleted successfully',
                                            position: 'bottom'
                                        });
                                        onClose();
                                    })
                                    .catch((error) => {
                                        Toast.show({
                                            type: 'error',
                                            text1: 'Error deleting allocation:',
                                            text2: error.message || 'An unexpected error occurred.',
                                            position: 'bottom'
                                        });
                                    });
                            }}>
                                <DeleteIcon/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="mb-3">
                        <Text className="text-primary text-md font-interSemiBold">
                            {selectedAllocation?.amount}
                        </Text>
                    </View>

                    {/* Title Input */}
                    <View className="mb-4">
                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Allocation title"
                            placeholderTextColor="#9ca3af"
                            className="bg-transparent border border-[#9fafaf] rounded-lg px-4 py-4 text-white font-interMedium text-base"
                        />
                    </View>

                    {/* Type Input */}
                    <View className="mb-4">
                        <TextInput
                            value={type}
                            onChangeText={setType}
                            placeholder="Type"
                            placeholderTextColor="#9ca3af"
                            className="bg-transparent border border-[#9fafaf] rounded-lg px-4 py-4 text-white font-interMedium text-base"
                        />
                    </View>

                    {/* Amount Input with Toggle */}
                    <View className="mb-4 flex-row items-center justify-between gap-4">
                        <TouchableOpacity
                            onPress={() => setTransactionType('deducted')}
                            className={`flex justify-center items-center rounded-lg self-stretch px-5 ${
                                transactionType === 'deducted' ? 'bg-[#3d8262]' : 'bg-[#9fafaf]'
                            }`}
                        >
                            <Minus size={15} color={transactionType === 'deducted' ? '#fff' : '#000'}/>
                        </TouchableOpacity>
                        <TextInput
                            value={amount}
                            onChangeText={setAmount}
                            placeholder={`Amount to ${transactionType === 'added' ? 'Add' : 'Deduct'}`}
                            placeholderTextColor="#9ca3af"
                            keyboardType="numeric"
                            className="flex-1 bg-transparent border border-[#9fafaf] rounded-lg px-4 py-4 text-white font-interMedium text-base"
                        />
                        <TouchableOpacity
                            onPress={() => setTransactionType('added')}
                            className={`flex justify-center items-center rounded-lg self-stretch px-5 ${
                                transactionType === 'added' ? 'bg-[#3d8262]' : 'bg-[#9fafaf]'
                            }`}
                        >
                            <PlusIcon size={15} color={transactionType === 'added' ? '#fff' : '#000'}/>
                        </TouchableOpacity>
                    </View>

                    {/* Remarks Input */}
                    <View className="mb-8">
                        <TextInput
                            value={remarks}
                            onChangeText={setRemarks}
                            placeholder="Remarks"
                            placeholderTextColor="#9ca3af"
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