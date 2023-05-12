import { configureStore } from "@reduxjs/toolkit";
import { ICVE } from "../Components/NVDPage/CVECard/CVECard";
import cvesReducer from "./slices/CveSlice";

export interface RootState {
	cves: ICVEState;
}

export interface ICVEState {
	value: ICVE[];
}

export default configureStore({
	reducer: {
		cves: cvesReducer,
	},
});
