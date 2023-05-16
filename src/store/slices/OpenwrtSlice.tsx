import { createSlice } from "@reduxjs/toolkit";
import { ICVEState } from "../store";

const getNVDData = async () => {
	try {
		const response = await fetch(
			"https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=openwrt",
			{
				method: "GET",
			}
		);
		const data = await response.json();
		console.log(data.vulnerabilities);

		return data.vulnerabilities;
	} catch (err) {}
};
const cves: ICVEState = await getNVDData();

export const OpenwrtSlice = createSlice({
	name: "openwrtCves",
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

export const { setAllCves } = OpenwrtSlice.actions;

export default OpenwrtSlice.reducer;
