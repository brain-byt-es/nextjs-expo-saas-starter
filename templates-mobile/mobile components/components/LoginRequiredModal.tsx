import React from 'react';
import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Text } from '@/components/nativewindui/Text';
import { Icon } from '@/components/nativewindui/Icon';

interface LoginRequiredModalProps {
    visible: boolean;
    onClose: () => void;
    onLogin: () => void;
}

export function LoginRequiredModal({ visible, onClose, onLogin }: LoginRequiredModalProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-navy/80 justify-center items-center px-4" style={{ backgroundColor: 'rgba(15, 23, 42, 0.9)' }}>
                {/* Background Grid Effect (Simulated) */}
                <View style={StyleSheet.absoluteFill} className="opacity-10 pointer-events-none">
                    <View className="w-full h-full" style={{
                        backgroundImage: 'linear-gradient(rgba(51, 65, 85, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(51, 65, 85, 0.1) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} />
                </View>

                <BlurView intensity={20} tint="dark" className="w-full max-w-md rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <View className="bg-navy/60 p-8 items-center">
                        {/* Icon */}
                        <View className="w-16 h-16 rounded-2xl bg-navy border border-slate-700 items-center justify-center mb-6 shadow-glow">
                            <Icon name="lock.fill" className="text-cyan-400" size={32} />
                        </View>

                        {/* Title */}
                        <Text className="text-3xl font-bold text-white text-center mb-2 tracking-tight">
                            Login Required
                        </Text>

                        {/* Subtitle */}
                        <Text className="text-slate-400 text-center mb-8 text-base leading-relaxed">
                            This setting is available for registered healthcare professionals only. Please log in to access your personalized preferences.
                        </Text>

                        {/* Actions */}
                        <View className="w-full gap-4">
                            <TouchableOpacity
                                onPress={onLogin}
                                className="w-full py-4 bg-primary rounded-xl items-center justify-center shadow-lg shadow-primary/25 active:opacity-90"
                            >
                                <View className="flex-row items-center gap-2">
                                    <Text className="text-white font-bold text-lg">Log In</Text>
                                    <Icon name="arrow.right" className="text-white" size={20} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={onClose}
                                className="w-full py-4 bg-transparent border border-slate-700 rounded-xl items-center justify-center active:bg-white/5"
                            >
                                <Text className="text-slate-400 font-semibold text-base">Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BlurView>
            </View>
        </Modal>
    );
}
