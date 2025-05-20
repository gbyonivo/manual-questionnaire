import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import questionsReducer from "./slices/questions";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["questions"],
};

const rootReducer = combineReducers({
  questions: questionsReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }),
  });
};

const store = makeStore();
const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export { store, persistor };
