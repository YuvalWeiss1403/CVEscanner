import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CompanyByName } from "../../store/slices/CompaniesSlice";

const NavBar: React.FC = () => {
	const navigator = useNavigate();
	const data = JSON.parse(sessionStorage.getItem("user") || "{}");
	const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
	const companies = useSelector((state: RootState) => state.Companies.value);
	const dispatch = useDispatch();

	useEffect(() => {
		data.firstName ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false);
		dispatch(CompanyByName(data.CompanyName));
	}, []);

	return (
		<div className="navbar">
			<div className="navbar-container">
				<button className="logo" onClick={() => navigator("/")}>
					Hook
				</button>
				<input type="text" placeholder="Search" className="search"></input>
				<button className="add-device" onClick={() => navigator("/AddDevice")}>
					Add Device
				</button>
				<button className="openwrt" onClick={() => navigator("/openwrt")}>
					Openwrt
				</button>
				<button className="dlink" onClick={() => navigator("/dlink")}>
					Dlink
				</button>
				<button className="hikvision" onClick={() => navigator("/hikvision")}>
					HikVision
				</button>
				{isUserLoggedIn && (
					<button
						className="user-devices"
						onClick={() =>
							navigator(`/MyDevices/${companies[0]?._id}`)
						}>{`My Devices`}</button>
				)}
			</div>
			<div className="footer-container">
				<button className="help">Help</button>
				{isUserLoggedIn && (
					<button
						className="user-message"
						onClick={() =>
							navigator("/userInfo")
						}>{`${data.firstName} ${data.lastName} ${data.CompanyName}`}</button>
				)}
				{!isUserLoggedIn && (
					<>
						<button className="login" onClick={() => navigator("/Login")}>
							Login
						</button>
						<button className="sign-up" onClick={() => navigator("/SignUp")}>
							Sign Up
						</button>
					</>
				)}
			</div>
		</div>
	);
};
export default NavBar;
