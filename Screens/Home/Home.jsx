import { StyleSheet, View } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import PostsScreen from "../PostsScreen/PostsScreen";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import { useLayoutEffect, useState } from "react";

const Tabs = createBottomTabNavigator();
const Home = ({ route }) => {
  const [tabBar, setTabBar] = useState("flex");
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "CreatePostsScreen") {
      setTabBar("none");
    } else {
      setTabBar("flex");
    }
  }, [setTabBar, route]);
  return (
    <View style={styles.container}>
      <Tabs.Navigator
        initialRouteName="PostsScreen"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: { display: tabBar },
        }}
      >
        <Tabs.Screen
          name="PostsScreen"
          component={PostsScreen}
          options={({ navigation }) => ({
            tabBarIcon: ({ focused, size, color }) => (
              <View
                style={styles.activeScreen}
                backgroundColor={focused ? "#FF6C00" : "#fff"}
              >
                <SimpleLineIcons
                  name="grid"
                  size={24}
                  color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)"}
                />
              </View>
            ),
            headerStyle: {
              borderBottomColor: "rgba(0, 0, 0, 0.30)",
              borderBottomWidth: 1,
            },
            headerShown: true,
            headerTitle: "Posts",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 17,
              alignItems: "center",
            },
            headerRight: () => (
              <Ionicons
                name="exit-outline"
                size={24}
                color="black"
                style={{ marginRight: 16 }}
                onPress={() => navigation.navigate("Login")}
              />
            ),
          })}
        />
        <Tabs.Screen
          name="CreatePostsScreen"
          component={CreatePostsScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Feather
                name="arrow-left"
                size={24}
                color="#212121"
                style={{ marginLeft: 16 }}
                onPress={() => navigation.goBack()}
              />
            ),
            tabBarIcon: ({ focused, size, color }) => (
              <View
                style={styles.activeScreen}
                backgroundColor={focused ? "#FF6C00" : "#fff"}
              >
                <MaterialCommunityIcons
                  name="plus"
                  size={24}
                  color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)"}
                  backgroundColor={focused ? "#FF6C00" : "#fff"}
                />
              </View>
            ),
            headerStyle: {
              borderBottomColor: "rgba(0, 0, 0, 0.30)",
              borderBottomWidth: 1,
            },
            headerShown: true,
            headerTitle: "Create Post",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 17,
              alignItems: "center",
            },
          })}
        />
        <Tabs.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size, color, backgroundColor }) => (
              <View
                style={styles.activeScreen}
                backgroundColor={focused ? "#FF6C00" : "#fff"}
              >
                <Feather
                  name="user"
                  size={24}
                  color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)"}
                  backgroundColor={focused ? "#FF6C00" : "#fff"}
                />
              </View>
            ),
            headerTitle: "Profile",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 17,
              alignItems: "center",
            },
          }}
        />
      </Tabs.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  activeScreen: {
    width: 70,
    height: 40,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
