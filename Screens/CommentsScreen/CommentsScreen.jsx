import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

const CommentsScreen = () => {
  const { params } = useRoute();
  console.log(params);
  return (
    <View style={styles.container}>
      <Image style={styles.postImg} source={{ uri: params }} />
      <View style={styles.comment}>
        <View
          style={{
            ...styles.avatar,
            backgroundColor: "blue",
            marginRight: 16,
          }}
        ></View>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>
            Really love your most recent photo. I’ve been trying to capture the
            same thing for a few months and would love some tips!
          </Text>
          <Text style={styles.data}>09 June, 2020 | 08:40</Text>
        </View>
      </View>
      <View style={styles.comment}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>
            A fast 50mm like f1.8 would help with the bokeh. I’ve been using
            primes as they tend to get a bit sharper images.
          </Text>
          <Text style={{ ...styles.data, textAlign: "left" }}>
            09 June, 2020 | 09:14
          </Text>
        </View>
        <View
          style={{
            ...styles.avatar,
            backgroundColor: "yellow",
            marginLeft: 16,
          }}
        ></View>
      </View>
      <View style={{ ...styles.comment, marginBottom: 31 }}>
        <View
          style={{
            ...styles.avatar,
            backgroundColor: "blue",
            marginRight: 16,
          }}
        ></View>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Thank you! That was very helpful!</Text>
          <Text style={styles.data}>09 June, 2020 | 09:20</Text>
        </View>
      </View>
      <View style={{ position: "relative" }}>
        <TextInput
          placeholder="Comment..."
          placeholderTextColor={"#BDBDBD"}
          style={styles.input}
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
    paddingHorizontal: 16,
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
    flexDirection: "row",
    width: 299,
    marginBottom: 24,
  },
  avatar: { width: 28, height: 28, borderRadius: 28 / 2 },
  textWrapper: {
    display: "flex",
    width: "100%",
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
    textAlign: "right",
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 18,
  },
  input: {
    width: "100%",
    borderRadius: 30,
    color: "#BDBDBD",
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
