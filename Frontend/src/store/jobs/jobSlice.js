import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs : [],
    error:false,
    loading:false
}
const jobSlice = createSlice({
    name:'job',
    initialState,
    reducers:{
        fetchStart:(state)=>{
            state.loading = true;
            state.error = false;
            state.jobs =  [];
        },
        fetchSuccess: (state,action)=>{
            state.jobs =action.payload;
            state.error =false;
            state.loading =false;
        },
        fetchFailure:(state,action)=>{
            state.jobs = [],
            state.error =action.payload
        },
        addJobStart:(state)=>{
            state.loading =true;
            state.error = false;
        },
        addJobSuccess:(state,action)=>{
            state.jobs.push(action.payload);
            state.error = false;
            state.loading =false;
        },
        addJobFailure:(state,action)=>{
            state.loading =false;
            state.error = action.payload;
        },
        deleteJobStart:(state)=>{
            state.loading = true;
            state.error =false;
        },
        deleteJobSuccess :(state,action)=>{
            state.loading =false;
            state.jobs = state.jobs.filter((job)=>job._id !== action.payload);
        },
        deleteJobFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        updateJobStart: (state)=>{
            state.loading = true;
            state.error = false;
        },
        updateJobFailure: (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        updateJobSuccess: (state,action)=>{
            state.jobs = state.jobs.map((job)=> (job._id  === action.payload)? action.payload : job );
            state.error = false;
            state.loading = false;
        },
    }
})

export const {
    fetchStart,
    fetchSuccess,
    fetchFailure,
    addJobStart,
    addJobSuccess,
    addJobFailure,
    deleteJobStart,
    deleteJobSuccess,
    deleteJobFailure,
    updateJobStart,
    updateJobSuccess,
    updateJobFailure
} = jobSlice.actions;

export default jobSlice.reducer;