import { createSlice } from "@reduxjs/toolkit";
import { ObjectId } from "mongoose";

export interface ICompanies {
	companyName: string;
	_id: ObjectId;
}

const getCompaniesData = async () => {
	try {
		const response = await fetch("http://localhost:3001/companies", {
			method: "GET",
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const companies: ICompanies[] = await getCompaniesData();

export const CompaniesSlice = createSlice({
	name: "Companies",
	initialState: {
		value: companies,
		initialValue: companies,
	},
	reducers: {
		AllCompanies: (state) => {
			state.value = state.initialValue;
		},
		CompanyByName: (state, action) => {
			state.value = state.initialValue?.filter(
				(company) =>
					company.companyName?.toLowerCase() === action.payload?.toLowerCase()
			);
		},
		CompanyById: (state, action) => {
			state.value = state.initialValue?.filter(
				(company) => company._id?.toString() === action.payload
			);
		},
	},
});

export const { AllCompanies, CompanyByName, CompanyById } =
	CompaniesSlice.actions;

export default CompaniesSlice.reducer;
