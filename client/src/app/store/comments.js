import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { nanoid } from "nanoid";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentsCreated: (state, action) => {
            state.enteties = action.payload;
            state.isLoading = false;
        },
        commentsCreatedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentsRemoved: (state, action) => {
            state.enteties = action.payload;
            state.isLoading = false;
        },
        commentsRemovedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentsCreated,
    commentsCreatedFailed,
    commentsRemoved,
    commentsRemovedFailed
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const createComment =
    (data, pageId, currentUserId) => async (dispatch, getState) => {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId,
            created_at: Date.now(),
            userId: currentUserId
        };
        const state = getState();
        try {
            const { content } = await commentService.createComment(comment);
            dispatch(commentsCreated([...state.comments.entities, content]));
        } catch (error) {
            dispatch(commentsCreatedFailed(error.message));
        }
    };

export const removeComment = (id) => async (dispatch, getState) => {
    const state = getState();
    try {
        const { content } = await commentService.removeComment(id);
        if (content === null) {
            dispatch(
                commentsRemoved(
                    state.comments.entities.filter((c) => c._id !== id)
                )
            );
        }
    } catch (error) {
        dispatch(commentsRemovedFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
