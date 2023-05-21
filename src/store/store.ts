import { configureStore } from "@reduxjs/toolkit";
import { ICVE } from "../Components/CVECard/CVECard";
import openwrtcvesReducer from "./slices/OpenwrtSlice";
import DlinkcvesReducer from "./slices/DlinkSlice";
import HikvisioncvesReducer from "./slices/HikvisionSlice";
import CompaniesReducer from "./slices/CompaniesSlice";
import DevicesReducer from "./slices/DevicesSlice";
import { ICompanies } from "./slices/CompaniesSlice";
import { IDevices } from "./slices/DevicesSlice";

export interface RootState {
	OpenwrtCves: ICVEState;
	DlinkCves: ICVEState;
	HikvisionCves: ICVEState;
	Companies: ICompanyState;
	Devices: IDevicesState;
}

export interface ICVEState {
	value: ICVE[];
}
export interface ICompanyState {
	value: ICompanies[];
}
export interface IDevicesState {
	value: IDevices[];
}

export default configureStore({
	reducer: {
		OpenwrtCves: openwrtcvesReducer,
		DlinkCves: DlinkcvesReducer,
		HikvisionCves: HikvisioncvesReducer,
		Companies: CompaniesReducer,
		Devices: DevicesReducer,
	},
});
