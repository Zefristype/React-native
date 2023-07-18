import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { updateUserProfile, authStateChange, authSignOut } from "./authSlice";

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      await updateProfile(user, {
        displayName: login,
        email: user.email,
      });
      dispatch(
        updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
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

export const authSignOutUser = () => async (dispatch) => {
  await auth.signOut();
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        updateUserProfile({
          useId: user.uid,
          login: user.displayName,
        })
      ),
        dispatch(authStateChange({ stateChange: true }));
    }
  });
};
