import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const {
    professionsRequested,
    professionsReceived,
    professionsRequestedFailed
} = actions;

const isOutdated = (date) => {
    return Date.now() - date >= 10 * 60 * 1000;
};

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities;
    if (isOutdated(lastFetch)) {
        dispatch(professionsRequested());
        try {
            const { content } = await professionService.get();
            dispatch(professionsReceived(content));
        } catch (error) {
            dispatch(professionsRequestedFailed(error.message));
        }
    }
};

export const getProfessionById = (profId) => (state) => {
    if (state.professions.entities) {
        for (const profession of state.professions.entities) {
            if (profession._id === profId) return profession;
        }
    }
    return null;
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;
export const getProfessionsError = () => (state) => state.professions.error;

export default professionsReducer;
