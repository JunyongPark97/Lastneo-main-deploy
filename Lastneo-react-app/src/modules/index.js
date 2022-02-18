import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import login from "./login";
import register from "./register";
import guest from "./guest";
import owner from "./owner";
import neohome from "./neohome";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({ login, register, guest, owner, neohome });

export default persistReducer(persistConfig, rootReducer);
