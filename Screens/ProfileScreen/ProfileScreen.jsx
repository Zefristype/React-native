import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/EvilIcons";
import { AuthBackground } from "../../components/Auth/AuthBackground";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { selectUser } from "../../redux/auth/selectors";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);

  const getUserPosts = async () => {
    const q = await query(
      collection(db, "posts"),
      where("userId", "==", user.userId)
    );

    onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  };

  useEffect(() => {
    getUserPosts();
  }, []);
  return (
    <View style={styles.wrapper}>
      <AuthBackground />
      <View style={styles.container}>
        <View style={styles.avatarBox}>
          <Icon name="plus" style={styles.avatarAdd} size={35} />
          <View style={styles.avatarAddBackground}></View>
        </View>
        <Ionicons
          name="exit-outline"
          size={24}
          color="#BDBDBD"
          style={{ marginRight: 16, position: "absolute", top: 22, right: 16 }}
          onPress={() => dispatch(authSignOutUser())}
        />
        <Text style={styles.username}>{user.login}</Text>
        <ScrollView
          style={styles.posts}
          contentContainerStyle={{ paddingBottom: 150 }}
        >
          {posts.map((post) => {
            return (
              <View key={post.id} style={styles.post}>
                <Image source={{ uri: post.image }} style={styles.postImg} />
                <Text style={styles.postTitle}>{post.title}</Text>
                <View style={styles.postInfo}>
                  <View style={styles.postCommentsBox}>
                    <Feather
                      name="message-circle"
                      style={{
                        transform: [{ rotateZ: "270deg" }],
                      }}
                      color={"#FF6C00"}
                      size={24}
                    />
                    <Text style={styles.postCommentsText}>{post.comments}</Text>
                  </View>
                  <View style={styles.postLikesBox}>
                    <Feather name="thumbs-up" color={"#FF6C00"} size={24} />
                    <Text style={styles.postLikesText}>{post.likes}</Text>
                  </View>
                  <View style={styles.postLocationBox}>
                    <Feather name="map-pin" color={"#BDBDBD"} size={24} />
                    <Text style={styles.postLocationText}>
                      {post.allLocations.location}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  container: {
    position: "absolute",
    top: 147,
    display: "flex",
    paddingHorizontal: 16,
    paddingTop: 92,
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarBox: {
    position: "absolute",
    top: "0%",
    left: "50%",
    transform: [{ translateX: -45 }, { translateY: -60 }],
    width: 120,
    height: 120,
    backgroundColor: "#4400ff",
    borderRadius: 16,
  },
  avatarAdd: {
    zIndex: 1000,
    position: "absolute",
    right: "-50%",
    bottom: 10,
    color: "#BDBDBD",

    transform: [{ translateX: -43 }, { rotate: "45deg" }],
  },
  avatarAddBackground: {
    zIndex: 100,
    position: "absolute",
    right: "-50%",
    bottom: 11.5,
    backgroundColor: "white",
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    transform: [{ translateX: -47 }],
  },
  username: {
    marginBottom: 33,
    color: "#212121",
    textAlign: "center",
    fontAamily: "Roboto-Regular",
    fontSize: 30,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  posts: { display: "flex", flexDirection: "column", height: "100%" },
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
  },
  postCommentsBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 24,
  },
  postLikesBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
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
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 18,
  },
  postLikesText: {
    marginLeft: 6,
    color: "#212121",
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

export default ProfileScreen;
