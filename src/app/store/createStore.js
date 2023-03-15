import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualities from "./qualities";
import professions from "./professions";

const rootReducer = combineReducers({ qualities, professions });

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
