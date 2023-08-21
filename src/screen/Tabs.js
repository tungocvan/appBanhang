import React , {useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "@expo/vector-icons/Ionicons";
import StackHome from './Home';
import StackCustomer from './Customer';
import Alerts from './Alerts';
import Account from './Account';
import Tools from './Tools';

const Tab = createBottomTabNavigator();


function Tabs() {
    
    
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="StackHome" component={StackHome} 
                options={{
                    header: () => null,
                    tabBarLabel: "Trang Chủ",
                    tabBarIcon: () => (                      
                      <Ionicons name="home-outline" color="#068F47" size={24} />
                    ),
                  }} 
            />
            <Tab.Screen 
                name="StackCustomer" component={StackCustomer} 
                options={{
                    header: () => null,
                    tabBarLabel: "Khách hàng",
                    tabBarIcon: () => (                      
                      <Ionicons name="people" color="#068F47" size={24} />
                    ),
                  }}
            />
            <Tab.Screen 
                name="Alerts" component={Alerts} 
                options={{
                    header: () => null,
                    tabBarLabel: "Thông báo",
                    tabBarIcon: () => (                      
                      <Ionicons name="notifications-outline" color="#068F47" size={24} />
                    ),
                  }}
            />          
            <Tab.Screen 
                name="Tools" component={Tools} 
                options={{
                    header: () => null,
                    tabBarLabel: "Công cụ",
                    tabBarIcon: () => (                      
                      <Ionicons name="hammer" color="#068F47" size={24} />
                    ),
                  }}
            />
            <Tab.Screen 
                name="Account" component={Account} 
                options={{
                    header: () => null,
                    tabBarLabel: "Tài khoản",
                    tabBarIcon: () => (                      
                      <Ionicons name="person-add" color="#068F47" size={24} />
                    ),
                  }}
            />
            
       </Tab.Navigator>
    );
}

export default Tabs;