import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import {
    User,
    Phone,
    Mail,
    LogOut,
    Edit2,
    Save,
    X,
} from "lucide-react-native";

interface ProfileData {
    name: string;
    phone: string;
    email: string;
}

const ProfileScreen: React.FC = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [profile, setProfile] = useState<ProfileData>({
        name: "John Doe",
        phone: "+1 (555) 123-4567",
        email: "john.doe@example.com",
    });
    const [editedProfile, setEditedProfile] = useState<ProfileData>(profile);

    const handleEdit = (): void => {
        setIsEditing(true);
        setEditedProfile(profile);
    };

    const handleSave = (): void => {
        setProfile(editedProfile);
        setIsEditing(false);
    };

    const handleCancel = (): void => {
        setEditedProfile(profile);
        setIsEditing(false);
    };

    const handleLogout = (): void => {
        console.log("Logging out...");
    };

    const getInitials = (name: string): string => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <SafeAreaView className="flex-1 bg-secondary">
            <ScrollView className="flex-1 px-4 py-6">

                {/* Profile Card */}
                <View className="rounded-xl p-4 mb-6">
                    {/* Avatar Section */}
                    <View className="items-center mb-6">
                        <View className="w-20 h-20 bg-emerald-600 rounded-full items-center justify-center mb-4">
                            <Text className="text-xl font-interSemiBold text-white">
                                {getInitials(profile.name)}
                            </Text>
                        </View>
                        <Text className="text-xl font-interSemiBold text-white">
                            {profile.name}
                        </Text>
                    </View>

                    {/* Name Field */}
                    <View className="mb-4">
                        <View className="flex-row items-center mb-2">
                            <View className="w-4 h-4 mr-2">
                                <User size={16} color="#D1D5DB"/>
                            </View>
                            <Text className="text-sm font-interMedium text-gray-300">
                                Name
                            </Text>
                        </View>
                        {isEditing ? (
                            <TextInput
                                value={editedProfile.name}
                                onChangeText={(text) => setEditedProfile({...editedProfile, name: text})}
                                className="bg-[#494949]/80 rounded-xl p-4 mb-4 flex flex-row items-start border-[1.5px] border-[#666666]  text-white font-interMedium"
                                placeholderTextColor="#9CA3AF"
                            />
                        ) : (
                            <View
                                className="bg-[#494949]/80 rounded-lg p-4 mb-4 flex flex-row items-start border-[1.5px] border-[#666666]  text-white font-interMedium">
                                <Text className="text-white font-interMedium">
                                    {profile.name}
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Phone Field */}
                    <View className="mb-4">
                        <View className="flex-row items-center mb-2">
                            <View className="w-4 h-4 mr-2">
                                <Phone size={16} color="#D1D5DB"/>
                            </View>
                            <Text className="text-sm font-interMedium text-gray-300">
                                Phone
                            </Text>
                        </View>
                        {isEditing ? (
                            <TextInput
                                value={editedProfile.phone}
                                onChangeText={(text) => setEditedProfile({...editedProfile, phone: text})}
                                className="bg-[#494949]/80 rounded-xl p-4 mb-4 flex flex-row items-start border-[1.5px] border-[#666666]  text-white font-interMedium"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="phone-pad"
                            />
                        ) : (
                            <View
                                className="bg-[#494949]/80 rounded-lg p-4 mb-4 flex flex-row items-start border-[1.5px] border-[#666666]  text-white font-interMedium">
                                <Text className="text-white font-interMedium">
                                    {profile.phone}
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Email Field */}
                    <View className="mb-6">
                        <View className="flex-row items-center mb-2">
                            <View className="w-4 h-4 mr-2">
                                <Mail size={16} color="#D1D5DB"/>
                            </View>
                            <Text className="text-sm font-interMedium text-gray-300">
                                Email
                            </Text>
                        </View>
                        {isEditing ? (
                            <TextInput
                                value={editedProfile.email}
                                onChangeText={(text) => setEditedProfile({...editedProfile, email: text})}
                                className="bg-[#494949]/80 rounded-xl p-4 mb-4 flex flex-row items-start border-[1.5px] border-[#666666]  text-white font-interMedium"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        ) : (
                            <View
                                className="bg-[#494949]/80 rounded-lg p-4 mb-4 flex flex-row items-start border-[1.5px] border-[#666666]  text-white font-interMedium">
                                <Text className="text-white font-interMedium">
                                    {profile.email}
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Action Buttons */}
                    <View className="space-y-3">
                        {isEditing ? (
                            <View className="flex-row gap-x-3 mb-3">
                                <TouchableOpacity
                                    onPress={handleSave}
                                    className="flex-1 bg-emerald-600 rounded-md py-3 px-4 flex-row items-center justify-center"
                                    activeOpacity={0.8}
                                >
                                    <Save size={16} color="#FFFFFF"/>
                                    <Text className="text-white font-interSemiBold ml-2">Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleCancel}
                                    className="flex-1 border border-gray-600 rounded-md py-3 px-4 flex-row items-center justify-center"
                                    activeOpacity={0.8}
                                >
                                    <X size={16} color="#D1D5DB"/>
                                    <Text className="text-gray-300 font-interSemiBold ml-2">Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                onPress={handleEdit}
                                className="bg-emerald-600 rounded-md py-3 px-4 flex-row items-center justify-center mb-3"
                                activeOpacity={0.8}
                            >
                                <Edit2 size={16} color="#FFFFFF"/>
                                <Text className="text-white font-interSemiBold ml-2">Edit Profile</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            onPress={handleLogout}
                            className="border border-red-600 rounded-md py-3 px-4 flex-row items-center justify-center"
                            activeOpacity={0.8}
                        >
                            <LogOut size={16} color="#F87171"/>
                            <Text className="text-red-400 font-interSemiBold ml-2">Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;