import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
} from 'react-native';

interface AddAllocationModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (data: { title: string; type: string; amount: string }) => void;
}

const AddAllocationModal: React.FC<AddAllocationModalProps> = ({
                                                                   visible,
                                                                   onClose,
                                                                   onSave,
                                                               }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');

    const handleSave = () => {
        onSave({ title, type, amount });
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
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-gray-800/80 bg-opacity-50 justify-end">
                <View className="bg-secondary rounded-t-3xl px-6 py-8">
                    <Text className="text-white text-xl font-interSemiBold mb-8">
                        Add New Allocation
                    </Text>

                    {/* Title Input */}
                    <View className="mb-4">
                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Title"
                            placeholderTextColor="#9ca3af"
                            className="bg-transparent border border-gray-600 rounded-lg px-4 py-4 text-white font-interMedium text-base"
                        />
                    </View>

                    {/* Type Input */}
                    <View className="mb-4">
                        <TextInput
                            value={type}
                            onChangeText={setType}
                            placeholder="Type of allocation (Eg: Savings, current)"
                            placeholderTextColor="#9ca3af"
                            className="bg-transparent border border-gray-600 rounded-lg px-4 py-4 text-white font-interMedium text-base"
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
                            className="bg-transparent border border-gray-600 rounded-lg px-4 py-4 text-white font-interMedium text-base"
                        />
                    </View>

                    {/* Save Button */}
                    <TouchableOpacity
                        onPress={handleSave}
                        className="bg-green-500 rounded-lg py-4 items-center"
                    >
                        <Text className="text-white text-lg font-interSemiBold">
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default AddAllocationModal;