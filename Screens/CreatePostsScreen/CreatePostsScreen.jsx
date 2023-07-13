import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          <TouchableOpacity>
            <Text>Icon</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ ...styles.text, marginBottom: 32 }}>Load image</Text>
        <TextInput
          style={{ ...styles.input, marginBottom: 16 }}
          placeholder="Title"
          placeholderTextColor={"#BDBDBD"}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor={"#BDBDBD"}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Publish</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buttonIcon}>
        <Text>
          <Feather color={"#BDBDBD"} size={24} name="trash-2" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: "100%",
  },
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginTop: 32,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 50,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  text: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 100,
    paddingVertical: 16,
    marginTop: 32,
  },
  buttonIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    marginBottom: 34,
  },
});

export default CreatePostsScreen;
