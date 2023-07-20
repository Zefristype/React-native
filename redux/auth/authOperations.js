import { async } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import {
  updateUserProfile,
  authStateChange,
  authSignOut,
  updateUserAvatar,
} from "./authSlice";

export const authSignUpUser =
  ({ login, email, password, avatar }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      await updateProfile(user, {
        displayName: login,
        email: user.email,
        photoURL: avatar,
      });
      dispatch(
        updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          avatar,
        })
      );
      return true;
    } catch (error) {
      console.log("error", error);
      console.log("error.messag", error.message);
      return false;
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      await updateProfile(user, { email: user.email });
      dispatch(
        updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    } catch (error) {
      console.log("error", error);
      console.log("error.messag", error.message);
      return;
    }
  };

export const updateAvatar =
  ({ avatar }) =>
  async (dispatch) => {
    try {
      const user = auth.currentUser;
      await updateProfile(user, { photoURL: avatar });
      dispatch(
        updateUserAvatar({
          avatar,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const authSignOutUser = () => async (dispatch) => {
  await auth.signOut();
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        })
      ),
        dispatch(authStateChange({ stateChange: true }));
    }
  });
};
