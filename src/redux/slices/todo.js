import {createSlice,createAsyncThunk } from '@reduxjs/toolkit';


const todoSlice = createSlice({
  name:'todo',
  initialState:{
   isLoading:false,
   isError:false,
   data:null
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchTodo.fulfilled,(state,action)=>{
      state.isLoading = false;
      state.data = action.payload;
    })
    builder.addCase(fetchTodo.pending,(state,action)=>{
      state.isLoading = true;
      state.data = action.payload;
    })
    builder.addCase(fetchTodo.rejected,(state,action)=>{
      console.log("is error",action.payload);
    })
  }
});

export const fetchTodo = createAsyncThunk('fetchTodos',async ()=>{
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    return response.json();
})

export default todoSlice.reducer;