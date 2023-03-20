import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        auth: null,
        isLoggedIn: false
    },
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        usersRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequested: () => {},
        authRequestedSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
            state.isLoading = false;
        },
        authRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoggedIn = false;
            state.isLoading = false;
        }
    }
});
const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceived,
    usersRequestedFailed,
    authRequested,
    authRequestedSuccess,
    authRequestedFailed
} = actions;

export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestedFailed(error.message));
    }
};

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const { data } = await authService.register({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestedSuccess({ userId: data.localId }));
        } catch (e) {
            dispatch(authRequestedFailed(e.message));
        }
    };

export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((user) => user._id === userId);
    }
};
export const getUsersList = () => (state) => state.users.entities;

export default usersReducer;
