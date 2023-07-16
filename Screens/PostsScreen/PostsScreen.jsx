import { StyleSheet, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

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
      <View style={styles.posts}>
        <View style={styles.post}>
          <View style={styles.postImg}></View>
          <Text style={styles.postTitle}>Forest</Text>
          <View style={styles.postInfo}>
            <View style={styles.postCommentsBox}>
              <Feather
                name="message-circle"
                style={{
                  transform: [{ rotateZ: "270deg" }],
                }}
                color={"#BDBDBD"}
                size={24}
              />
              <Text style={styles.postCommentsText}>10</Text>
            </View>
            <View style={styles.postLocationBox}>
              <Feather name="map-pin" color={"#BDBDBD"} size={24} />
              <Text style={styles.postLocationText}>Ukraine</Text>
            </View>
          </View>
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
    marginBottom: 32,
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
  posts: { display: "flex", flexDirection: "column" },
  post: { width: "100%", height: 277 },
  postImg: { height: 240, backgroundColor: "blue" },
  postTitle: {
    marginTop: 8,
    marginBottom: 8,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,

    fontWeight: "500",
  },
  postInfo: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  postCommentsBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 24,
  },

  postLocationBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginLeft: "auto",
  },
  postCommentsText: {
    marginLeft: 6,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 18,
  },

  postLocationText: {
    marginLeft: 4,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    textDecorationLine: "underline",
  },
});

export default PostsScreen;
