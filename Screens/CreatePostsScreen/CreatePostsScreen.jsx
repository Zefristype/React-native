import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text>
          <Feather color={"#BDBDBD"} size={24} name="trash-2" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "column" },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
  },
});

export default CreatePostsScreen;
