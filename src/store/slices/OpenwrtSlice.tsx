// import { createSlice } from "@reduxjs/toolkit";
// import { ICVE } from "../../Components/CVECard/CVECard";

// const getNVDData = async () => {
// 	try {
// 		const response = await fetch(
// 			"https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=openwrt",
// 			{
// 				method: "GET",
// 			}
// 		);
// 		const data = await response.json();
// 		return data.vulnerabilities;
// 	} catch (err) {}
// };
// const cves: ICVE[] = await getNVDData();

// export const OpenwrtSlice = createSlice({
// 	name: "openwrtCves",
// 	initialState: {
// 		value: cves,
// 		filteredValue: {},
// 	},
// 	reducers: {
// 		setAllCves: (state) => {
// 			state.filteredValue = state.value;
// 		},
// 		openwrtCvesBySeverity: (state, action) => {
// 			state.value = state.value.filter(
// 				(cve: ICVE) =>
// 					cve.cve.metrics.cvssMetricV2[0]?.baseSeverity === action.payload
// 			);
// 		},
// 	},
// });

// export const { setAllCves, openwrtCvesBySeverity } = OpenwrtSlice.actions;

// export default OpenwrtSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { ICVE } from "../../Components/CVECard/CVECard";

const getNVDData = async () => {
	try {
		const response = await fetch(
			"https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=openwrt",
			{
				method: "GET",
			}
		);
		const data = await response.json();
		return data.vulnerabilities;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const cves: ICVE[] = await getNVDData();

export const OpenwrtSlice = createSlice({
	name: "openwrtCves",
	initialState: {
		value: cves,
		initialValue: cves,
	},
	reducers: {
		OpenwrtCves: (state) => {
			state.value = state.initialValue;
		},
		OpenwrtCvesBySeverity: (state, action) => {
			state.value = state.initialValue.filter(
				(cve: ICVE) =>
					cve.cve.metrics.cvssMetricV2?.[0]?.baseSeverity.toLowerCase() ===
					action.payload
			);
		},
	},
});

export const { OpenwrtCves, OpenwrtCvesBySeverity } = OpenwrtSlice.actions;

export default OpenwrtSlice.reducer;
