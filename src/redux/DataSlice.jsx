import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    episodes: [],
     pageNumber:1,
    filterdata: { filterdata: [], Totalpage: 1 },
  },
  reducers: {
    datastore: (state, action) => {
      state.data = action.payload;
    },
    storeFilterdata: (state, action) => {
      const { result, Totalpage } = action.payload;
      console.log(result)
      state.filterdata.filterdata = result;
      state.filterdata.Totalpage = Totalpage;
    },
    episodesdata: (state, action) => {
      console.log(action.payload);
      state.episodes = action.payload;
    },
    setpage: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
});

export const dataAction = DataSlice.actions;
export default DataSlice.reducer;
