import AsyncStorage from "@react-native-community/async-storage";

export const setLocalData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.warn("ASYNCSTORAGE SET ERROR: ", error);
  }

  console.debug("Done setting local storage item");
};

export const getLocalData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.warn("ASYNCSTORAGE GET ERROR: ", error);
  }

  console.debug("Done getting local storage item");
};

export const removeLocalData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.warn("ASYNCSTORAGE REMOVE ERROR: ", error);
  }

  console.debug("Done removing local storage item");
};

// export const logLocalStorage = () => {
//   AsyncStorage.getAllKeys((err, keys = [""]) => {
//     AsyncStorage.multiGet(keys, (error, stores = []) => {
//       console.log("=================");
//       console.log("LOCAL STORAGE IS: ");
//       stores.map((result, i, store) => {
//         console.log({ [store[i][0]]: store[i][1] });
//         return true;
//       });
//       console.log("=================");
//     });
//   });
// };
