import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import login from "./login_reducer";
import register from "./register_reducer";
import guest from "./guest_reducer";
import owner from "./owner_reducer";
import neohome from "./neohome_reducer";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({ login, register, guest, owner, neohome });

export default persistReducer(persistConfig, rootReducer);
