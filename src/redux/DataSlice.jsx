import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
  name: "data",
  initialState: { data: [] ,filterdata:[]},  episodes:[],
  reducers: {
    datastore: (state, action) => {
      state.data = action.payload;
    },
     storeFilterdata:(state, action) => {
      state.filterdata = action.payload;
    },
    episodesdata:(state, action) => {
      console.log(action.payload)
      state.episodes = action.payload;
    },
  },
});

export const dataAction = DataSlice.actions;
export default DataSlice.reducer;
