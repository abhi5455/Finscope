import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    KeyboardAvoidingView,
    Platform, ActivityIndicator,
} from 'react-native';
import FinscopeLogo from '../../assets/svg/FinscopeLogo.svg'
import {signInWithEmailPassword, signUpWithEmailPassword} from "../../services/supabaseClient.ts";
import {useAppNavigation} from "../../common/navigationHelper.ts";
import {Eye, EyeOff} from "lucide-react-native";

const LoginScreen: React.FC = () => {
    const navigation = useAppNavigation();
    const [toSignIn, setToSignIn] = useState<boolean>(true);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <SafeAreaView className="flex-1 bg-secondary">
            <StatusBar barStyle="light-content" backgroundColor="#282828"/>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <View className="flex-1 px-6 pt-16">
                    {/* Logo/Icon Section */}
                    <View className="items-center mb-12">
                        <View className="items-center mb-5">
                            <FinscopeLogo height={75}/>
                        </View>
                        <Text className="text-white text-2xl font-interSemiBold text-center">
                            {toSignIn ? 'Welcome Back' : 'Create an Account'}
                        </Text>
                        <Text className="text-gray-400 text-base font-interMedium text-center mt-2">
                            Sign {toSignIn ? 'in' : 'up'} to continue to your account
                        </Text>
                    </View>

                    {/* Form Section */}
                    <View className="gap-y-6">
                        {/* Name Input */}
                        {!toSignIn &&
                            <View>
                                <Text className="text-gray-300 text-sm font-interMedium mb-2">
                                    Full Name
                                </Text>
                                <TextInput
                                    value={name}
                                    onChangeText={setName}
                                    placeholder="Enter your full name"
                                    placeholderTextColor="#666666"
                                    className="bg-[#494949]/80 text-white text-base font-interMedium px-4 py-4 rounded-xl  border-[1px] border-[#666666]"
                                    autoCapitalize="words"
                                    autoComplete="name"
                                />
                            </View>
                        }

                        {/* Phone Input */}
                        {/*<View>*/}
                        {/*    <Text className="text-gray-300 text-sm font-interMedium mb-2">*/}
                        {/*        Phone Number*/}
                        {/*    </Text>*/}
                        {/*    <TextInput*/}
                        {/*        value={phone}*/}
                        {/*        onChangeText={setPhone}*/}
                        {/*        placeholder="Enter your phone number"*/}
                        {/*        placeholderTextColor="#6B7280"*/}
                        {/*        className="bg-gray-700 text-white text-base font-interMedium px-4 py-4 rounded-xl border border-gray-600 focus:border-green-400"*/}
                        {/*        keyboardType="phone-pad"*/}
                        {/*        autoComplete="tel"*/}
                        {/*    />*/}
                        {/*</View>*/}

                        {/* Email Input */}
                        <View>
                            <Text className="text-gray-300 text-sm font-interMedium mb-2">
                                Email Address
                            </Text>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Enter your email address"
                                placeholderTextColor="#666666"
                                className="bg-[#494949]/80 text-white text-base font-interMedium px-4 py-4 rounded-xl  border-[1px] border-[#666666]"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                            />
                        </View>

                        {/* Password Input */}
                        <View>
                            <Text className="text-gray-300 text-sm font-interMedium mb-2">Password</Text>
                            <View className="relative">
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#666666"
                                    className="bg-[#494949]/80 text-white text-base font-interMedium px-4 py-4 pr-12 rounded-xl border-[1px] border-[#666666]"
                                    secureTextEntry={!isPasswordVisible}
                                    autoCapitalize="none"
                                    autoComplete="password"
                                />
                                <TouchableOpacity
                                    onPress={togglePasswordVisibility}
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                    style={{ transform: [{ translateY: -12 }] }}
                                >
                                    {isPasswordVisible ? <Eye size={20} color="#666666" /> : <EyeOff size={20} color="#666666" />}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity
                        onPress={() => {
                            setIsLoading(true)
                            if (toSignIn) {
                                signInWithEmailPassword(email, password)
                                    .then(() => {
                                        navigation.goBack()
                                        navigation.navigate("TabNavigator");
                                    })
                                    .catch(err => {
                                        console.error("Login error:", err.message);
                                    })
                                    .finally(() => setIsLoading(false));
                            } else {
                                signUpWithEmailPassword(name, email, password)
                                    .then(() => {
                                        navigation.goBack()
                                        navigation.navigate("TabNavigator");
                                    })
                                    .catch(err => {
                                        console.error("Signup error:", err.message);
                                    })
                                    .finally(() => setIsLoading(false));
                            }

                        }}
                        className="bg-primary py-4 rounded-xl mt-8 active:bg-green-500"
                        activeOpacity={0.8}
                    >
                        {!isLoading ?
                            <Text className="text-secondary text-base font-interSemiBold text-center">
                                Continue
                            </Text>
                            :
                            <ActivityIndicator color={'#282828'} size={'small'}/>
                        }
                    </TouchableOpacity>

                    {/* Footer */}
                    <View className="flex-1 justify-end pb-8">
                        <View className="flex-row justify-center items-center">
                            <Text className="text-gray-400 text-sm font-interMedium">
                                {toSignIn ? 'Don\'t' : 'Already'} have an account?{' '}
                            </Text>
                            <TouchableOpacity onPress={() => {
                                setToSignIn(!toSignIn);
                            }}>
                                <Text className="text-primary text-sm font-interSemiBold">
                                    {toSignIn ? 'Sign Up' : 'Sign In'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Text className="text-gray-500 text-xs font-interMedium text-center mt-4">
                            By continuing, you agree to our Terms of Service and Privacy Policy
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;