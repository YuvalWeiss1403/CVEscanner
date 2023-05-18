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
		OpenwrtCvesByID: (state, action) => {
			state.value = state.initialValue.filter((cve: ICVE) =>
				cve.cve.id.toLowerCase().includes(action.payload)
			);
		},
		OpenwrtCvesByDesc: (state, action) => {
			state.value = state.initialValue.filter((cve: ICVE) =>
				cve.cve.descriptions[0].value.toLowerCase().includes(action.payload)
			);
		},
		OpenwrtCvesByDescOrID: (state, action) => {
			state.value = state.initialValue.filter(
				(cve: ICVE) =>
					cve.cve.descriptions[0].value
						.toLowerCase()
						.includes(action.payload) ||
					cve.cve.id.toLowerCase().includes(action.payload)
			);
		},
	},
});

export const {
	OpenwrtCves,
	OpenwrtCvesBySeverity,
	OpenwrtCvesByID,
	OpenwrtCvesByDesc,
	OpenwrtCvesByDescOrID,
} = OpenwrtSlice.actions;

export default OpenwrtSlice.reducer;
