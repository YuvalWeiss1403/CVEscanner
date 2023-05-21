import "./SingleCompanyDevices.css";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CompanyById, ICompanies } from "../../store/slices/CompaniesSlice";
import { useEffect } from "react";
import { DevicesByID, IDevices } from "../../store/slices/DevicesSlice";

const SingleCompanyDevices: React.FC = () => {
	const { companyID } = useParams<string>();
	const companies: ICompanies[] = useSelector(
		(state: RootState) => state.Companies.value
	);
	const devices: IDevices[] = useSelector(
		(state: RootState) => state.Devices.value
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(CompanyById(companyID));
		dispatch(DevicesByID(companies[0]._id.toString()));
	}, []);

	return (
		<div className="single-company-devices-page">
			<NavBar />
			<div className="company-heading">{`Hello , ${companies[0]?.companyName}`}</div>
			<div className="device-table-container">
				<table className="device-content">
					<thead>
						<tr>
							<th className="index"></th>
							<th className="device-ip-heading">IP Address</th>
							<th className="device-type-heading">Device Type</th>
							<th className="device-location-heading">Location</th>
							<th className="device-year-heading">Year</th>
						</tr>
					</thead>
					<tbody>
						{devices &&
							devices.map((device: IDevices, index: number) => (
								<tr key={index}>
									<td className="index">{index + 1}</td>
									<td className="device-ip">{device.IpAddress}</td>
									<td className="device-desc">{device.Type}</td>
									<td className="device-location">{device.Location}</td>
									<td className="device-year">{device.year}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default SingleCompanyDevices;
