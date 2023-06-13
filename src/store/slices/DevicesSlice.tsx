import { createSlice } from "@reduxjs/toolkit";
import { ObjectId } from "mongoose";

export interface IDevices {
	_id?: ObjectId;
	Location: string;
	IpAddress: string;
	PatchHistory: string[];
	year: number;
	Type: string;
	companyID: string;
}

const getDevicesData = async () => {
	try {
		const response = await fetch("http://localhost:3001/devices", {
			method: "GET",
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const devices: IDevices[] = await getDevicesData();

export const CompaniesSlice = createSlice({
	name: "Devices",
	initialState: {
		value: devices,
		initialValue: devices,
	},
	reducers: {
		AllDevices: (state) => {
			state.value = state.initialValue;
		},
		DevicesByID: (state, action) => {
			state.value = state.initialValue?.filter(
				(device) => device.companyID === action.payload
			);
		},
		AddDevice: (state, action) => {
			state.initialValue = action.payload;
		},
		DevicesByType: (state, action) => {
			state.value = state.value?.filter(
				(device) => device.Type.toLowerCase() === action.payload
			);
		},
	},
});

export const { AllDevices, DevicesByID, AddDevice, DevicesByType } =
	CompaniesSlice.actions;

export default CompaniesSlice.reducer;
