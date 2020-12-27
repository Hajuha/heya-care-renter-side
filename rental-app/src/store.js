import reducers from './reducers';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};
const pReducer = persistReducer(persistConfig, reducers);

export const store = createStore(pReducer,devToolsEnhancer());
export const persistor = persistStore(store);