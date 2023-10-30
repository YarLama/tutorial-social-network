import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentModelType } from "../../helpers/types/models";

interface CommentState {
    comments: CommentModelType[];
}

const initialState: CommentState = {
    comments: []
}

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setComments(state, action: PayloadAction<CommentModelType[]>) {
            const comments = [...action.payload].sort((a, b) => a.id - b.id);
            state.comments = comments;
        },
        addComment(state, action: PayloadAction<CommentModelType>) {
            state.comments.push(action.payload);
        },
        deleteComment(state, action: PayloadAction<number>) {
            const commentId = action.payload;
            state.comments = state.comments.filter(comment => comment.id !== commentId);
        },
        updateComment(state, action: PayloadAction<CommentModelType>) {
            const commentId = action.payload.id;
            const changeValueById = (comments: CommentModelType[], id: number, updatedComment: CommentModelType): CommentModelType[] => {
                return comments.map(comment => comment.id === id ? updatedComment : comment)
            }
            state.comments = changeValueById(state.comments, commentId, action.payload);
        },
        resetComments: () => initialState 
    }
}) 

export default commentSlice.reducer