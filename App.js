import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import Main from "./components/Main/Main";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    const prepare = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
}
