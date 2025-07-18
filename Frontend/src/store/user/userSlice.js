import {createSlice } from '@reduxjs/toolkit';
const initialState = {
    currentUser : null,
    error:null,
    loading:null
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart: (state)=>{
            state.loading = true;
            state.error = false;
        },
        signInFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        signInSuccess: (state,action)=>{
            state.loading = false;
            state.error = false;
            state.currentUser = action.payload;
        },
        updateSuccess: (state,action)=>{
            state.loading = false;
            state.error=false;
            state.currentUser = action.payload;
        },
        deleteStart: (state)=>{
            state.loading = true;
            state.error=false;
        },
        deleteFailure: (state,action)=>{
            state.loading = false;
            state.error=action.payload;
        },
        deleteSuccess: (state)=>{
            state.loading = false;
            state.error=false;
            state.currentUser = null;
        },
        signOutStart: (state)=>{
            state.loading = true;
            state.error=false;
        },
        signOutFailure: (state,action)=>{
            state.loading = false;
            state.error=action.payload;
        },
        signOutSuccess: (state)=>{
            state.loading = false;
            state.error=false;
            state.currentUser = null;
        },
        changePassWordStart:(state)=>{
            state.loading = true;
            state.error = false;
        },  
        changePassWordFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        changePassWordSuccess:(state,action)=>{
            state.loading = false;
            state.error = false;
            state.currentUser = {
                ...state.currentUser,
                password: action.payload.password
            };
        }
    }
})

export const {
    signInStart,
    signInFailure,
    signInSuccess,
    updateSuccess,
    deleteStart,
    deleteFailure,
    deleteSuccess,
    signOutStart,
    signOutFailure,
    signOutSuccess,
    changePassWordStart,
    changePassWordFailure,
    changePassWordSuccess
} = userSlice.actions;

export default userSlice.reducer;
