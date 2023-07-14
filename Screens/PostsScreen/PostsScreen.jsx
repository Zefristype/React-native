import { StyleSheet, View, Text } from "react-native";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View style={styles.avatar}></View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>Example Example</Text>
          <Text style={styles.email}>Example@gmail.com</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  user: {
    display: "flex",
    flexDirection: "row",

    marginTop: 32,
  },
  avatar: {
    marginRight: 8,
    width: 60,
    height: 60,
    borderRadius: 16,

    backgroundColor: "blue",
  },
  userInfo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  username: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    fontWeight: "700",
  },
  email: {
    color: "rgba(33, 33, 33, 0.80)",
    fontFamily: "Roboto-Regular",
    fontSize: 11,
  },
  activeScreen: {
    width: 70,
    height: 40,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PostsScreen;
