import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal, StatusBar, Pressable, ActivityIndicator,
} from 'react-native';
import {createNewAllocation} from "../../../services/allocationsService.ts";
import Toast from "react-native-toast-message";

interface AddAllocationModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (data: { title: string; type: string; amount: string }) => void;
    setTriggerRefetch: React.Dispatch<React.SetStateAction<number>>;
}

const AddAllocationModal: React.FC<AddAllocationModalProps> = ({
                                                                   visible,
                                                                   onClose,
                                                                   onSave,
                                                                   setTriggerRefetch
                                                               }) => {
        const [title, setTitle] = useState('');
        const [type, setType] = useState('');
        const [amount, setAmount] = useState('');

        const [isLoading, setIsLoading] = useState(false);

        const handleSave = () => {
            onSave({title, type, amount});
            setIsLoading(true)
            createNewAllocation(title, type, amount)
                .then(() => {
                    setTriggerRefetch(prev => prev + 1)
                    Toast.show({
                        type: 'success',
                        text1: 'New allocation created successfully',
                        position: 'bottom'
                    });
                    onClose();
                })
                .catch((error) => {
                    console.error('Error creating allocation:', error);
                    Toast.show({
                        type: 'error',
                        text1: 'Error creating allocation:',
                        text2: error.message || 'An unexpected error occurred.',
                        position: 'bottom'
                    });
                })
                .finally(() => {
                    setIsLoading(false);
                    setTitle('');
                    setType('');
                    setAmount('');
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
                        <Text className="text-white text-xl font-interSemiBold mb-8">
                            Add New Allocation
                        </Text>

                        {/* Title Input */}
                        <View className="mb-4">
                            <TextInput
                                value={title}
                                onChangeText={setTitle}
                                keyboardType={'default'}
                                placeholder="Title"
                                placeholderTextColor="#9ca3af"
                                className="bg-transparent border border-[#9fafaf] rounded-lg px-4 py-4 text-white font-interMedium text-base"
                            />
                        </View>

                        {/* Type Input */}
                        <View className="mb-4">
                            <TextInput
                                value={type}
                                onChangeText={setType}
                                keyboardType={'default'}
                                placeholder="Type of allocation (Eg: Savings, current)"
                                placeholderTextColor="#9ca3af"
                                className="bg-transparent border border-[#9fafaf] rounded-lg px-4 py-4 text-white font-interMedium text-base"
                            />
                        </View>

                        {/* Amount Input */}
                        <View className="mb-8">
                            <TextInput
                                value={amount}
                                onChangeText={setAmount}
                                placeholder="Amount to allocate"
                                placeholderTextColor="#9ca3af"
                                keyboardType="numeric"
                                className="bg-transparent border border-[#9fafaf] rounded-lg px-4 py-4 text-white font-interMedium text-base"
                            />
                        </View>

                        {/* Save Button */}
                        <TouchableOpacity
                            onPress={handleSave}
                            className="bg-[#3d8262] rounded-lg py-4 items-center border-primary border-[1.5px]"
                            disabled={isLoading}
                        >
                            {!isLoading ?
                                <Text className="text-primary text-lg font-interSemiBold">
                                    Save
                                </Text>
                                :
                                <ActivityIndicator color={'#56eba6'} size={'small'}/>
                            }
                        </TouchableOpacity>
                    </Pressable>
                </Pressable>
            </Modal>
        );
    }
;

export default AddAllocationModal;