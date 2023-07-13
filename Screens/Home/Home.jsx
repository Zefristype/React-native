import {
  StyleSheet,
  View,
} from "react-native";


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import PostsScreen from "../PostsScreen/PostsScreen";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";

const Tab = createBottomTabNavigator();
const Home = () => {

  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="PostsScreen"
        screenOptions={{
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="PostsScreen"
          component={PostsScreen}
          options={{
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
                style={{ marginRight: 10 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="CreatePostsScreen"
          component={CreatePostsScreen}
          options={{
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

            headerShown: true,
            headerTitle: "Create Post",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 17,
              alignItems: "center",
            },
          }}
        />
        <Tab.Screen
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
      </Tab.Navigator>
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
