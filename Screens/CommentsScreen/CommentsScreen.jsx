import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  updateDoc,
  getCountFromServer,
  getDoc,
} from "firebase/firestore";
import uuid from "react-native-uuid";
import { format } from "date-fns";

const CommentsScreen = () => {
  const { params: postId } = useRoute();
  const { login, userId, avatar } = useSelector(selectUser);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [post, setPost] = useState(null);
  const [isKeyboardShowing, setIsKeyboardShowing] = useState(false);

  const onSubmit = async () => {
    if (!comment.trim()) {
      return;
    }

    const time = format(new Date(), "dd MMMM, yyyy | HH:mm");
    const postsCollection = collection(db, "posts");
    const newPostRef = doc(postsCollection, postId);
    const newCollection = collection(newPostRef, "comments");
    await addDoc(newCollection, { comment, login, userId, avatar, time });
    const snapshot = await getCountFromServer(newCollection);
    updatePostCommentsCount(snapshot.data().count.toString());
    Keyboard.dismiss();
    setComment("");
  };

  const getAllComments = async () => {
    const postsCollection = collection(db, "posts");
    const newPostRef = doc(postsCollection, postId);
    const newCollection = collection(newPostRef, "comments");
    onSnapshot(newCollection, (snapshot) => {
      setAllComments(snapshot.docs.map((doc) => doc.data()));
    });
  };
  const getPostDetails = async () => {
    try {
      const postRef = doc(collection(db, "posts"), postId);
      const postSnapshot = await getDoc(postRef);
      if (postSnapshot.exists()) {
        setPost(postSnapshot.data());
      } else {
      }
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };

  const updatePostCommentsCount = async (commentsCount) => {
    const postRef = doc(db, "posts", postId);
    try {
      await updateDoc(postRef, { comments: commentsCount });
      console.log("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const pressHandler = () => {
    setIsKeyboardShowing(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    getAllComments();
    getPostDetails();
  }, []);

  useEffect(() => {
    const showKeyboard = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardShowing(true);
    });
    const hideKeyboard = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardShowing(false);
    });

    return () => {
      hideKeyboard.remove();
      showKeyboard.remove();
    };
  }, []);

  return (
    <View
      onPress={pressHandler}
      style={{
        ...styles.container,
        paddingBottom: isKeyboardShowing ? 350 : 16,
      }}
    >
      {post?.image && (
        <Image style={styles.postImg} source={{ uri: post.image }} />
      )}
      <FlatList
        contentContainerStyle={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
        }}
        data={allComments}
        renderItem={({ item }) => {
          return (
            <View
              key={uuid.v4()}
              style={{
                ...styles.comment,
                flexDirection: userId === item.userId ? "row" : "row-reverse",
              }}
            >
              <View style={styles.textWrapper}>
                <Text style={styles.text}>{item.comment}</Text>
                <Text
                  style={{
                    ...styles.data,
                    textAlign: userId === item.userId ? "left" : "right",
                  }}
                >
                  {item.time}
                </Text>
              </View>
              <Image
                style={{
                  ...styles.avatar,
                  backgroundColor: "#000000",
                  marginLeft: userId === item.userId ? 16 : 0,
                  marginRight: userId !== item.userId ? 16 : 0,
                }}
                source={{ uri: item.avatar }}
              />
            </View>
          );
        }}
      />
      <View style={{ position: "relative", marginBottom: 16 }}>
        <TextInput
          onChangeText={setComment}
          placeholder="Comment..."
          placeholderTextColor={"#BDBDBD"}
          style={styles.input}
          value={comment}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 19,
            right: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 34,
            height: 34,
            backgroundColor: "#FF6C00",
            borderRadius: 34 / 2,
          }}
          onPress={onSubmit}
        >
          <Feather
            name="arrow-left"
            size={25}
            color={"#FFFFFF"}
            style={{ transform: [{ rotate: "90deg" }] }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    paddingHorizontal: 16,
    flex: 1,
  },
  postImg: {
    marginBottom: 32,
    marginTop: 32,
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  comment: {
    display: "flex",
    marginBottom: 24,
  },
  avatar: { width: 28, height: 28, borderRadius: 28 / 2 },
  textWrapper: {
    display: "flex",
    width: 299,
    padding: 16,
  },
  text: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 18,
  },
  data: {
    color: "#BDBDBD",
    textAlign: "left",
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 18,
  },
  input: {
    width: "100%",
    borderRadius: 30,
    color: "#212121",
    textAlign: "right",
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "500",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 16,
    textAlign: "left",
  },
});

export default CommentsScreen;
