import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { rootReducer } from '../rootReducer/RootReducer';


const persistConfig = {
  key: 'root', // Key for the persisted data
  storage: AsyncStorage, // Storage engine
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer
});

const persistor = persistStore(store);
export { store, persistor };
