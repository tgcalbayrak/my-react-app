import { createStore } from "redux";
import reducer from './reducer'
import { loadState, saveState } from "./storage";

const persistedState = loadState();
const store = createStore(reducer, persistedState);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
