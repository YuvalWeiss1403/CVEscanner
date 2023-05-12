import { createSlice } from "@reduxjs/toolkit";
import { ICVEState } from "../store";

const getNVDData = async () => {
	try {
		const response = await fetch(
			"https://services.nvd.nist.gov/rest/json/cves/2.0",
			{
				method: "GET",
			}
		);
		const data = await response.json();
		console.log(data.vulnerabilities);

		return data;
	} catch (err) {}
};
const cves: ICVEState = await getNVDData();

export const cveSlice = createSlice({
	name: "cves",
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

export const { setAllCves } = cveSlice.actions;

export default cveSlice.reducer;
