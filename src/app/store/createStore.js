import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualities from "./qualities";
import professions from "./professions";
import users from "./users";

const rootReducer = combineReducers({ qualities, professions, users });

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
