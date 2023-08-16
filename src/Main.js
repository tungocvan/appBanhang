import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from "expo-splash-screen";
import Welcome from './screen/Welcome';
import Login from './screen/Login';
import Register from './screen/Register';
import Forget from './screen/Forget';
import Tabs from './screen/Tabs';
import { Home } from './screen/Home';
import BoxChangePass from './components/BoxChangePass';

const Stack = createStackNavigator();

function Main() {
  const [fontsLoaded] = useFonts({
    black: require('./assets/fonts/Inter-Black.ttf'),
    bold: require('./assets/fonts/Inter-Bold.ttf'),
    regular: require('./assets/fonts/Inter-Regular.ttf'),
    medium: require('./assets/fonts/Inter-Medium.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Đăng nhập',
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: 'Đăng ký tài khoản',
          }}
        />
        <Stack.Screen
          name="Forget"
          component={Forget}
          options={{
            title: 'Quên mật khẩu',
          }}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="ChangePass"
          component={BoxChangePass}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
