import React from 'react';
import {
    Text, View, Platform,ScrollView,
    SafeAreaView as SafeAreaViewIos, StyleSheet, StatusBar, KeyboardAvoidingView
} from 'react-native';


export default function KeyboardAvoidingContainer({ children, style, backgroundColor }) {
    let SafeArea = Platform.OS === 'ios' ? SafeAreaViewIos : SafeAreaViewAndroid;

    return (
        <SafeArea style={{flex:1, backgroundColor:backgroundColor || '#f9fafb'}}>
            <KeyboardAvoidingView
                style={{flex:1}}
                behavior={Platform.OS === 'ios'?'padding':'height'} >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[styles.contentContainer,style]}
                >
                 {children}       
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeArea>
    );
}

const styles = StyleSheet.create({
    contentContainer:{
        padding:20,
        paddingTop: Platform.OS==="android" ? StatusBar.currentHeight + 50:50
    }
})
