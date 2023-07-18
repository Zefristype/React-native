import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authStateChangeUser } from "../../redux/auth/authOperations";
import LoginScreen from "../../Screens/LoginScreen/LoginScreen";
import RegisterScreen from "../../Screens/RegisterScreen/RegisterScreen";
import Home from "../../Screens/Home/Home";
import MapScreen from "../../Screens/MapScreen/MapScreen";
import CommentsScreen from "../../Screens/CommentsScreen/CommentsScreen";
import { Feather } from "@expo/vector-icons";

const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();

const Main = () => {
  const { stateChange: isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  if (isAuth) {
    return (
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="CommentsScreen"
          component={CommentsScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: "Comments",
            headerLeft: () => (
              <Feather
                name="arrow-left"
                size={24}
                color="#212121"
                style={{ marginLeft: 16 }}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
      </MainStack.Navigator>
    );
  }
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    );
  }
};

export default Main;
