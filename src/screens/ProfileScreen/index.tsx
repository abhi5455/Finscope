import React, {useCallback, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Modal,
} from 'react-native';
import {
    User,
    Mail,
    LogOut,
    Edit2,
    Save,
    X,
    AlertTriangle,
} from "lucide-react-native";
import {signOut} from "../../services/signInHelper.ts";
import {useAppNavigation} from "../../common/navigationHelper.ts";
import {getUserDetails, updateUserProfile} from "../../services/userServices.ts";
import {useFocusEffect} from "@react-navigation/native";
import Toast from "react-native-toast-message";

interface ProfileData {
    name: string;
    phone?: string;
    email: string;
}

const ProfileScreen: React.FC = () => {
    const navigation = useAppNavigation();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
    const [profile, setProfile] = useState<ProfileData>({
        name: "John Doe",
        email: "john.doe@example.com",
    });
    const [editedProfile, setEditedProfile] = useState<ProfileData>(profile);

    useFocusEffect(
        useCallback(() => {
            getUserDetails()
                .then((user) => {
                    console.log("User details fetched:", user);
                    if (user) {
                        setProfile({
                            name: user.display_name || "",
                            email: user.email || ""
                        })
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user details:", error);
                });
            return () => {

            };
        }, [])
    );

    const handleEdit = (): void => {
        setIsEditing(true);
        setEditedProfile(profile);
    };

    const handleSave = (): void => {
        setProfile(editedProfile);
        setIsEditing(false);
        updateUserProfile(editedProfile.name)
            .then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Profile updated successfully',
                    position: 'bottom'
                })
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
                Toast.show({
                    type: 'error',
                    text1: 'Error updating profile:',
                    text2: error.message || 'An unexpected error occurred.',
                    position: 'bottom'
                })
            });
    };

    const handleCancel = (): void => {
        setEditedProfile(profile);
        setIsEditing(false);
    };

    const handleLogoutPress = (): void => {
        setShowLogoutModal(true);
    };

    const handleLogoutConfirm = (): void => {
        setShowLogoutModal(false);
        signOut()
            .then(() => {
                navigation.goBack();
                navigation.navigate("AuthenticationStack");
            })
            .catch((err) => {
                console.error("Logout failed:", err.message);
            });
    };

    const handleLogoutCancel = (): void => {
        setShowLogoutModal(false);
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
            {/* Header with Logout Button */}
            <View className="flex-row justify-between items-center px-4 py-4">
                <Text className="text-xl font-interSemiBold text-white">
                    {isEditing ? "Edit Profile" : "Profile"}
                </Text>
                <TouchableOpacity
                    onPress={handleLogoutPress}
                    className="p-2 rounded-lg border border-red-600/30"
                    activeOpacity={0.8}
                >
                    <LogOut size={18} color="#F87171"/>
                </TouchableOpacity>
            </View>

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
                                className="bg-[#494949]/80 rounded-xl p-4 mb-4 flex flex-row items-start border-[1.5px] border-[#666666] text-white font-interMedium"
                                placeholderTextColor="#9CA3AF"
                            />
                        ) : (
                            <View
                                className="bg-[#494949]/80 rounded-lg p-4 mb-4 flex flex-row items-start border-[1.5px] border-[#666666] text-white font-interMedium">
                                <Text className="text-white font-interMedium">
                                    {profile.name}
                                </Text>
                            </View>
                        )}
                    </View>

                    {/*/!* Phone Field *!/*/}
                    {/*<View className="mb-4">*/}
                    {/*    <View className="flex-row items-center mb-2">*/}
                    {/*        <View className="w-4 h-4 mr-2">*/}
                    {/*            <Phone size={16} color="#D1D5DB"/>*/}
                    {/*        </View>*/}
                    {/*        <Text className="text-sm font-interMedium text-gray-300">*/}
                    {/*            Phone*/}
                    {/*        </Text>*/}
                    {/*    </View>*/}
                    {/*    {isEditing ? (*/}
                    {/*        <TextInput*/}
                    {/*            value={editedProfile.phone}*/}
                    {/*            onChangeText={(text) => setEditedProfile({...editedProfile, phone: text})}*/}
                    {/*            className="bg-[#494949]/80 rounded-xl p-4 mb-4 flex flex-row items-start border-[1.5px] border-[#666666] text-white font-interMedium"*/}
                    {/*            placeholderTextColor="#9CA3AF"*/}
                    {/*            keyboardType="phone-pad"*/}
                    {/*        />*/}
                    {/*    ) : (*/}
                    {/*        <View className="bg-[#494949]/80 rounded-lg p-4 mb-4 flex flex-row items-start border-[1.5px] border-[#666666] text-white font-interMedium">*/}
                    {/*            <Text className="text-white font-interMedium">*/}
                    {/*                {profile.phone}*/}
                    {/*            </Text>*/}
                    {/*        </View>*/}
                    {/*    )}*/}
                    {/*</View>*/}

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
                        <View
                            className="bg-[#494949]/80 rounded-lg p-4 mb-4 flex flex-row items-start border-[1.5px] border-[#666666] text-white font-interMedium">
                            <Text className={`${isEditing ? 'text-white opacity-30' : 'text-white'} font-interMedium`}>
                                {profile.email}
                            </Text>
                        </View>
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
                    </View>
                </View>
            </ScrollView>

            {/* Logout Confirmation Modal */}
            <Modal
                visible={showLogoutModal}
                transparent={true}
                animationType="fade"
                onRequestClose={handleLogoutCancel}
            >
                <View className="flex-1 bg-black/60 justify-center items-center px-6">
                    <View className="bg-secondary rounded-2xl p-6 w-full border-0 border-[#78797a]">
                        {/* Icon */}
                        <View className="items-center mb-4">
                            <View className="w-16 h-16 bg-red-600/20 rounded-full items-center justify-center mb-3">
                                <AlertTriangle size={24} color="#F87171"/>
                            </View>
                        </View>

                        {/* Title */}
                        <Text className="text-xl font-interSemiBold text-white text-center mb-2">
                            Confirm Logout
                        </Text>

                        {/* Message */}
                        <Text className="text-gray-300/70 font-interMedium text-center mb-6 leading-5">
                            Are you sure you want to logout? You'll need to sign in again to access your account.
                        </Text>

                        {/* Buttons */}
                        <View className="flex flex-col gap-y-4">
                            <TouchableOpacity
                                onPress={handleLogoutConfirm}
                                className="bg-red-600 rounded-md py-4 px-4 flex-row items-center justify-center"
                                activeOpacity={0.8}
                            >
                                <LogOut size={16} color="#FFFFFF"/>
                                <Text className="text-white font-interSemiBold ml-2">Yes, Logout</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleLogoutCancel}
                                className="border border-gray-600 rounded-md py-4 px-4 flex-row items-center justify-center"
                                activeOpacity={0.8}
                            >
                                <X size={16} color="#D1D5DB"/>
                                <Text className="text-gray-300 font-interSemiBold ml-2">Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default ProfileScreen;