import { createSlice } from "@reduxjs/toolkit";
import { ICVEState } from "../store";

const getNVDData = async () => {
	try {
		const response = await fetch(
			"https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=Hikvision",
			{
				method: "GET",
			}
		);
		const data = await response.json();
		return data.vulnerabilities;
	} catch (err) {}
};
const cves: ICVEState = await getNVDData();

export const HikvisionSlice = createSlice({
	name: "HikvisionCves",
	initialState: {
		value: cves,
		filteredValue: {},
	},
	reducers: {
		setAllCves: (state) => {
			state.filteredValue = state.value;
		},
	},
});

export const { setAllCves } = HikvisionSlice.actions;

export default HikvisionSlice.reducer;
