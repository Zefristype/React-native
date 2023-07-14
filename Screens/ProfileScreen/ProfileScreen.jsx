import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/EvilIcons";
import { AuthBackground } from "../../components/Auth/AuthBackground";

const ProfileScreen = ({ navigation }) => {
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
          onPress={() => navigation.navigate("Login")}
        />
        <Text style={styles.username}>Example Example</Text>
        <View style={styles.posts}>
          <View style={styles.post}>
            <View style={styles.postImg}></View>
            <Text style={styles.postTitle}>Forest</Text>
            <View style={styles.postInfo}>
              <View style={styles.postComments}>
                <Feather name="message-circle" size={24} />
              </View>
              <View style={styles.postLikes}>
                <Feather name="thumbs-up" size={24} />
              </View>
              <View style={styles.postLocation}>
                <Feather name="map-pin" size={24} />
              </View>
            </View>
          </View>
          
        </View>
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
  posts: { display: "flex", flexDirection: "column" },
  post: { width: "100%", height: 277 },
  postImg: { height: 240, backgroundColor: "blue" },
  postTitle: {},
  postInfo: { display: "flex", flexDirection: "row" },
  postComments: {},
  postLikes: {},
  postLocation: {},
});

export default ProfileScreen;
