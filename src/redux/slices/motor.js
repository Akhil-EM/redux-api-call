import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addMotor = createAsyncThunk("addMotor", async (dataSet,{ rejectWithValue }) => {
  try {
    const {data,status} = await axios.post("http://localhost:5000/motor-types",dataSet);
    return data;
  } catch ({response}) {
    const {data,status} = response;
    return rejectWithValue(data.error);
  }
});

const addMotorSlice = createSlice({
  name: "motorSlice",
  initialState: {
    isLoading: false,
    isError: false,
    data: null,
    name:""
  },
  reducers:{
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMotor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(addMotor.pending, (state, action) => {
      state.isLoading = true;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(addMotor.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.data = action.payload;
    });
  },
});


export const { setName } = addMotorSlice.actions;
export default addMotorSlice.reducer;
