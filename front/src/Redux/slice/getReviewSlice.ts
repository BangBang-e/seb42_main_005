import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getReviewSlice: any = createSlice({
  name: "getReview",
  initialState: {
    response: {
      storeReview: [],
    },
  },
  reducers: {
    getReviewList: (state: any, action: PayloadAction<any>) => {
      state.response = action.payload;
    },
  },
});
// const { getReviewList } = getReviewSlice.actions;
export const getReviewListActions = getReviewSlice.actions;
export const getReview = (state: any) => state.getPharmDetail.response;
export default getReviewSlice.reducer;
