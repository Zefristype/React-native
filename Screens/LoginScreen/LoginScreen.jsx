import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthBackground } from "../../components/Auth/AuthBackground";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardShowing, setIsKeyboardShowing] = useState(false);
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const [isInputActive, setIsInputActive] = useState({
    email: false,
    password: false,
  });
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", (window) => {
      setDimensions(window.width);
    });
    return () => subscription?.remove();
  });

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

  const pressHandler = () => {
    setIsKeyboardShowing(false);
    Keyboard.dismiss();
  };
  const onSubmit = () => {
    console.log("Email", `${email}`, "Password", `${password}`);
  };

  return (
    <TouchableWithoutFeedback onPress={pressHandler}>
      <View style={styles.container}>
        <AuthBackground />
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.form,
              width: dimensions,
              paddingBottom: isKeyboardShowing ? 32 : 144,
              marginBottom: isKeyboardShowing ? -150 : 0,
            }}
          >
            <Text style={styles.formTitle}>Sign In</Text>

            <View style={styles.inputsWrapper}>
              <TextInput
                onFocus={() => {
                  setIsKeyboardShowing(true),
                    setIsInputActive((prevState) => ({
                      ...prevState,
                      email: true,
                    }));
                }}
                onBlur={() =>
                  setIsInputActive((prevState) => ({
                    ...prevState,
                    email: false,
                  }))
                }
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                style={{
                  ...styles.input,
                  borderColor: isInputActive.email ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: isInputActive.email ? "#FFFFFF" : "#F6F6F6",
                }}
              />
              <View style={{ position: "relative" }}>
                <TextInput
                  onFocus={() => {
                    setIsKeyboardShowing(true),
                      setIsInputActive((prevState) => ({
                        ...prevState,
                        password: true,
                      }));
                  }}
                  onBlur={() =>
                    setIsInputActive((prevState) => ({
                      ...prevState,
                      password: false,
                    }))
                  }
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry={!isPasswordShowing}
                  style={{
                    ...styles.input,
                    borderColor: isInputActive.password ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isInputActive.password
                      ? "#FFFFFF"
                      : "#F6F6F6",
                  }}
                />
                <TouchableOpacity
                  onPress={() =>
                    setIsPasswordShowing((prevState) => !prevState)
                  }
                  style={styles.passwordShow}
                >
                  <Text style={styles.passwordShowText}>
                    {isPasswordShowing ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={onSubmit}
              style={styles.formBtn}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonFormText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate("Register")}>
              <Text style={styles.regNavigate}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  input: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    paddingVertical: 16,
    paddingLeft: 16,
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  inputsWrapper: {
    width: "100%",
    marginBottom: -16,
  },
  form: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "center",
    paddingTop: 32,
    fontFamily: "Roboto-Regular",
    paddingHorizontal: 16,
  },
  formTitle: {
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    textAlign: "center",
    marginBottom: 32,
  },
  formBtn: {
    marginTop: 43,
    marginBottom: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    fontSize: 50,
    width: "100%",
  },
  passwordShow: { position: "absolute", top: 16, right: 16 },
  passwordShowText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  buttonFormText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
    textAlign: "center",
  },
  regNavigate: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});

export default LoginScreen;
