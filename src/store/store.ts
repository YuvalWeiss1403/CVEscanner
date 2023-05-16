import { configureStore } from "@reduxjs/toolkit";
import { ICVE } from "../Components/CVECard/CVECard";
import openwrtcvesReducer from "./slices/OpenwrtSlice";
import DlinkcvesReducer from "./slices/DlinkSlice";
import HikvisioncvesReducer from "./slices/HikvisionSlice";

export interface RootState {
	OpenwrtCves: ICVEState;
	DlinkCves: ICVEState;
	HikvisionCves: ICVEState;
}

export interface ICVEState {
	value: ICVE[];
}

export default configureStore({
	reducer: {
		OpenwrtCves: openwrtcvesReducer,
		DlinkCves: DlinkcvesReducer,
		HikvisionCves: HikvisioncvesReducer,
	},
});
