import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

interface comments {
    commentId: string;
    createdAt: number;
    commentContent: string;
    commentAuthor: string;
    postId: string;
}

const initialState = {
    posts: [] as {
        postId: string;
        postContent: string;
        postAuthor: string;
        liked: boolean;
        feeling: string;
        numberOfLikes: number,
        createdAt: number;
        comments: comments[],
    }[],
}

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addUserPost: (state, action) => {
            state.posts.unshift({ ...action.payload, postId: nanoid(), createdAt: Date.now(), comments: [], numberOfLikes: 0 });
        },
        updateUserPost: (state, action) => {
            state.posts = state.posts.map((post) => {
                if (post.postId === action.payload.postId) {
                    return { ...post, postContent: action.payload.postContent };
                }
                return post;
            });
        },
        addUserLike: (state, action) => {
            state.posts = state.posts.map((post) => {
                if (post.postId === action.payload) {
                    const newNumberOfLikes = post.numberOfLikes + 1;
                    return { ...post, numberOfLikes: newNumberOfLikes };
                }
                return post;
            });
        },
        removeUserLike: (state, action) => {
            state.posts = state.posts.map((post) => {
                if (post.postId === action.payload) {
                    const newNumberOfLikes = post.numberOfLikes - 1;
                    return { ...post, numberOfLikes: newNumberOfLikes };
                }
                return post;
            });
        },
        deleteUserPost: (state, action) => {
            state.posts = state.posts.filter((post) => post.postId !== action.payload);
        },
        addUserComment: (state, action) => {
            state.posts = state.posts.map((post) => {
                if (post.postId === action.payload.postId) {
                    const newComment: comments = {
                        commentId: nanoid(),
                        createdAt: Date.now(),
                        commentContent: action.payload.commentContent,
                        commentAuthor: action.payload.commentAuthor,
                        postId : action.payload.postId
                    };
                    post.comments.unshift(newComment);
                }
                return post;
            });
        },
        updateUserComment: (state, action) => {
            state.posts = state.posts.map(post => {
                if (post.postId === action.payload.postId) {
                    post.comments = post.comments.map(comment => {
                        if (comment.commentId === action.payload.commentId) {
                            return { ...comment, commentContent: action.payload.commentContent };
                        }
                        return comment; 
                    });
                }
                return post;
            });
        },
        deleteUserComment: (state, action) => {
            const post = state.posts.find((post) => post.postId === action.payload.postId);
            if (post) {
                post.comments = post.comments.filter((comment) => comment.commentId !== action.payload.commentId);
            }
        },

    }
})

export const { addUserPost, updateUserPost, addUserLike, removeUserLike, deleteUserPost, addUserComment, updateUserComment, deleteUserComment } = postSlice.actions;
export default postSlice.reducer;