// import { User } from "@/schemas/User";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import PocketBase, { AsyncAuthStore } from "pocketbase";
// import { Platform } from "react-native";

// export const getPbBaseURL = () => {
//   // Override for local dev on Android Emulator
//   if (process.env.EXPO_PUBLIC_EAS_CHANNEL !== "production") {
//     if (
//       process.env.EXPO_PUBLIC_POCKETBASE_BASEURL == "http://localhost:8090" &&
//       Platform.OS == "android"
//     ) {
//       return "http://10.0.2.2:8090";
//     }
//   }

//   return process.env.EXPO_PUBLIC_POCKETBASE_BASEURL;
// };

// // Configured in Pocketbase admin panel: edit collection users -> options tab.
// export const PB_MIN_PASSWORD_LENGTH = 8;

// const store = new AsyncAuthStore({
//   save: async (serialized) => AsyncStorage.setItem("pb_auth", serialized),
//   initial: AsyncStorage.getItem("pb_auth"),
// });

// const pb = new PocketBase(getPbBaseURL(), store);

// export default pb;

// // Helpers

// export const getUserAvatarUri = (user: User) => {
//   if (user.avatar) {
//     return {
//       uri: `${getPbBaseURL()}/api/files/users/${user.id}/${user.avatar}`,
//     };
//   } else {
//     return require("@/assets/images/avatar.png");
//   }
// };
