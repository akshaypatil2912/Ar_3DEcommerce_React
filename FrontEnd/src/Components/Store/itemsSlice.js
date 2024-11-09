import {createSlice} from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    addInitialItems: (state, action) => {
      return {
        ...state,
        allItems: action.payload,
        filteredItems: action.payload, // Set filtered items to initial products list
     };
    },
    filterItems: (state, action) => {
      let searchTerm=action.payload;
      return {
        ...state,
        filteredItems: state.allItems.filter((item) =>
        item.imagename.toLowerCase().includes(searchTerm)
        )
     };
   }
  }
});

export const itemsActions = itemsSlice.actions;

export default itemsSlice;