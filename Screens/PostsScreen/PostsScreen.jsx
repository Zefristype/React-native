import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

const PostsScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, [setPosts]);

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View style={styles.avatar}></View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{user.login}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
      {posts.length !== 0 && (
        <ScrollView
          style={styles.posts}
          contentContainerStyle={{ paddingBottom: 140 }}
        >
          {posts.map((post) => {
            return (
              <View key={post.id} style={styles.post}>
                <Image source={{ uri: post.image }} style={styles.postImg} />
                <Text style={styles.postTitle}>{post.title}</Text>
                <View style={styles.postInfo}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("CommentsScreen", post.id)
                    }
                  >
                    <View style={styles.postCommentsBox}>
                      <Feather
                        name="message-circle"
                        style={{
                          transform: [{ rotateZ: "270deg" }],
                        }}
                        color={"#BDBDBD"}
                        size={24}
                      />
                      <Text style={styles.postCommentsText}>
                        {post.comments}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(
                        "MapScreen",
                        post.allLocations.mapLocation
                      )
                    }
                    style={{ marginLeft: "auto" }}
                  >
                    <View style={styles.postLocationBox}>
                      <Feather name="map-pin" color={"#BDBDBD"} size={24} />
                      <Text style={styles.postLocationText}>
                        {post.allLocations.location}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
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
  posts: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  post: { width: "100%", height: 277, marginBottom: 68 },
  postImg: { height: 240, borderRadius: 8 },
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
    justifyContent: "space-between",
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
