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
            const posts = [...action.payload].sort((a, b) => a.id - b.id);
            state.posts = posts;
        },
        addPost(state, action: PayloadAction<PostModelType>) {
            state.posts.push(action.payload);
        },
        deletePost(state, action: PayloadAction<number>) {
            const postId = action.payload;
            state.posts = state.posts.filter(post => post.id !== postId)
        },
        updatePost(state, action: PayloadAction<PostModelType>) {
            const postId = action.payload.id;
            const changeValueById = (posts: PostModelType[], id: number, updatedPost: PostModelType): PostModelType[] => {
                return posts.map(post => post.id === id ? updatedPost : post)
            }
            state.posts = changeValueById(state.posts, postId, action.payload);
        },
    }
})

export default postSlice.reducer;