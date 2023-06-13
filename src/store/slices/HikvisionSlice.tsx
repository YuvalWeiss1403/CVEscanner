import { createSlice } from "@reduxjs/toolkit";
import { ICVE } from "../../Components/CVECard/CVECard";

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
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const cves: ICVE[] = await getNVDData();

export const HikvisionSlice = createSlice({
	name: "HikvisionCves",
	initialState: {
		value: cves,
		initialValue: cves,
	},
	reducers: {
		HikvisionCves: (state) => {
			state.value = state.initialValue;
		},
		HikvisionCvesBySeverity: (state, action) => {
			state.value = state.initialValue.filter(
				(cve: ICVE) =>
					cve.cve.metrics.cvssMetricV2?.[0]?.baseSeverity.toLowerCase() ===
					action.payload
			);
		},
		HikvisionCvesByID: (state, action) => {
			state.value = state.initialValue.filter((cve: ICVE) =>
				cve.cve.id.toLowerCase().includes(action.payload)
			);
		},
		HikvisionCvesByDesc: (state, action) => {
			state.value = state.initialValue.filter((cve: ICVE) =>
				cve.cve.descriptions[0].value.toLowerCase().includes(action.payload)
			);
		},
		HikvisionCvesByDescOrID: (state, action) => {
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
	HikvisionCves,
	HikvisionCvesBySeverity,
	HikvisionCvesByDesc,
	HikvisionCvesByDescOrID,
	HikvisionCvesByID,
} = HikvisionSlice.actions;

export default HikvisionSlice.reducer;
