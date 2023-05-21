import "./AddDevicePage.css";
import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CompanyByName, ICompanies } from "../../store/slices/CompaniesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import axios from "axios";

const AddDevicePage: React.FC = () => {
	const data = JSON.parse(sessionStorage.getItem("user") || "{}");
	const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
	const navigator = useNavigate();
	const defaultInputValue = {
		Location: "",
		IpAddress: "",
		patchHistory: [""],
		year: "",
		Type: "",
	};
	const [Device, setDevice] = useState(defaultInputValue);
	const companies: ICompanies[] = useSelector(
		(state: RootState) => state.Companies.value
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(CompanyByName(data.CompanyName));
	}, []);

	const AddDeviceToDb = async () => {
		try {
			const response = await axios.post(
				"http://localhost:3001/devices/create",
				{
					location: Device.Location,
					ipAddress: Device.IpAddress,
					patchHistory: Device.patchHistory,
					year: Device.year,
					type: Device.Type,
					companyName: "Hook",
				}
			);
			navigator("/");
		} catch (error: any) {
			if (error.response && error.response.status === 409) {
				console.error(error.response.data);
			} else {
				console.error(error);
			}
		}
	};

	const handelAddDevice = () => {
		AddDeviceToDb();
	};

	useEffect(() => {
		data.firstName ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false);
	}, []);
	return (
		<div className="add-device-page">
			<NavBar />
			<div className="add-device-content">
				{isUserLoggedIn && (
					<div className="data-input">
						<div className="user-logged-heading">{`Hello ${data.firstName}`}</div>
						<div className="add-device-heading">{`Please fill in the details below to add a new device to the system`}</div>
						<input
							value={Device.IpAddress}
							onChange={(e) =>
								setDevice({ ...Device, IpAddress: e.target.value })
							}
							className="enter-ip-Address"
							type="text"
							placeholder="IP Address"></input>
						<input
							value={Device.Location}
							onChange={(e) =>
								setDevice({ ...Device, Location: e.target.value })
							}
							className="enter-location"
							type="text"
							placeholder="Location"></input>
						<input
							value={Device.Type}
							onChange={(e) => setDevice({ ...Device, Type: e.target.value })}
							className="enter-type"
							type="text"
							placeholder="Device Type"></input>
						<input
							value={Device.year}
							onChange={(e) => setDevice({ ...Device, year: e.target.value })}
							className="enter-year"
							type="text"
							placeholder="Year"></input>
						<button className="add-device" onClick={() => handelAddDevice()}>
							Add Device
						</button>
					</div>
				)}
				{!isUserLoggedIn && (
					<div className="add-device-not-loggedin">
						<div className="login-heading">To continue, please sign in</div>
						<button
							className="login page-login"
							onClick={() => navigator("/Login")}>
							Login
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default AddDevicePage;
