import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraIsReady, setCameraIsReady] = useState(true);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [mapLocation, setMapLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setMapLocation(coords);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    const showKeyboard = Keyboard.addListener("keyboardDidShow", () => {});
    const hideKeyboard = Keyboard.addListener("keyboardDidHide", () => {});

    return () => {
      hideKeyboard.remove();
      showKeyboard.remove();
    };
  }, []);

  const pressHandler = () => {
    Keyboard.dismiss();
  };
  const takePhoto = async () => {
    if (cameraRef && cameraIsReady) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
      setCameraIsReady(false);
    }
  };
  const onSubmit = () => {
    if (!photo || !title.trim() || !location.trim()) {
      console.log("Not all");
    } else {
      navigation.navigate("PostsScreen", {
        photo,
        title,
        location,
        mapLocation,
        likes: 0,
        comments: 0,
      });
    }
  };
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={pressHandler}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Camera style={styles.camera} type={type} ref={setCameraRef}>
            {photo && !cameraIsReady && (
              <Image source={{ uri: photo }} style={styles.photo} />
            )}
            <TouchableOpacity style={styles.circle} onPress={takePhoto}>
              <FontAwesome color={"#FFFFFF"} name="camera" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flipContainer}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                {" "}
                Flip{" "}
              </Text>
            </TouchableOpacity>
          </Camera>

          <TouchableOpacity
            style={{ maxWidth: 100 }}
            onPress={async () => {
              if (photo) {
                setPhoto(null);
                setCameraIsReady(true);
                return;
              }
              const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== "granted") {
                console.log("Permission denied");
                return;
              }

              const result = await ImagePicker.launchImageLibraryAsync();
              if (!result.canceled && result.assets.length > 0) {
                const selectedAsset = result.assets[0];
                setCameraIsReady(false);
                setPhoto(selectedAsset.uri);
              }
            }}
          >
            <Text style={{ ...styles.text, marginBottom: 32, maxWidth: 100 }}>
              {photo ? "Reset" : "Load image"}
            </Text>
          </TouchableOpacity>
          <TextInput
            onChangeText={setTitle}
            value={title}
            style={{ ...styles.input, marginBottom: 16 }}
            placeholder="Title"
            placeholderTextColor={"#BDBDBD"}
          />
          <View style={styles.locationBox}>
            <Feather
              name="map-pin"
              color={"#BDBDBD"}
              style={{ marginLeft: 25 }}
              size={24}
            />
            <TextInput
              onChangeText={setLocation}
              value={location}
              style={{ ...styles.input, marginLeft: 4 }}
              placeholder="Location"
              placeholderTextColor={"#BDBDBD"}
            />
          </View>
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor:
                photo && title.trim() && location.trim()
                  ? "#FF6C00"
                  : "transparent",
            }}
            onPress={onSubmit}
          >
            <Text
              style={{
                ...styles.text,
                color:
                  photo && title.trim() && location.trim()
                    ? "#FFFFFF"
                    : "#BDBDBD",
              }}
            >
              Publish
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonIcon}>
          <Text>
            <Feather color={"#BDBDBD"} size={24} name="trash-2" />
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
  camera: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 240,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginTop: 32,
    marginBottom: 8,
  },
  photo: {
    position: "absolute",
    width: "100%",
    height: 240,
  },
  circle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: "rgba(255, 255, 255, 0.30)",
  },
  flipContainer: { position: "absolute", bottom: 10, right: 10 },
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
  locationBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default CreatePostsScreen;
