import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostModelType } from "../../helpers/types/models";


interface PostState {
    posts: PostModelType[];
}

const initialState: PostState = {
    posts: []
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts(state, action: PayloadAction<PostModelType[]>) {
            state.posts = action.payload;
        },
        addPost(state, action: PayloadAction<PostModelType>) {
            state.posts.push(action.payload);
        },
        deletePost(state, action: PayloadAction<number>) {
            const postId = action.payload;
            state.posts = state.posts.filter(post => post.id !== postId)
        },
        updatePost() {},
    }
})

export default postSlice.reducer;