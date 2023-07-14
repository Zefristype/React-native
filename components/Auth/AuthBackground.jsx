import { Image, StyleSheet } from "react-native";

export const AuthBackground = () => {
  return (
    <Image
      style={styles.image}
      source={require("../../assets/images/BackgroundPhoto.png")}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    width: "100%",
    top: 0,
    zIndex: -1,
  },
});
