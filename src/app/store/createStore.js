import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualities from "./qualities";

const rootReducer = combineReducers({ qualities });

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
