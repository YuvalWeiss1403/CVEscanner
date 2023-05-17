import { createSlice } from "@reduxjs/toolkit";
import { ICVE } from "../../Components/CVECard/CVECard";

const getNVDData = async () => {
	try {
		const response = await fetch(
			"https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=dlink",
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

export const DlinkSlice = createSlice({
	name: "DlinkCves",
	initialState: {
		value: cves,
		initialValue: cves,
	},
	reducers: {
		DlinkCves: (state) => {
			state.value = state.initialValue;
		},
		DlinkCvesBySeverity: (state, action) => {
			state.value = state.initialValue.filter(
				(cve: ICVE) =>
					cve.cve.metrics.cvssMetricV2?.[0]?.baseSeverity.toLowerCase() ===
					action.payload
			);
		},
	},
});

export const { DlinkCves, DlinkCvesBySeverity } = DlinkSlice.actions;

export default DlinkSlice.reducer;
