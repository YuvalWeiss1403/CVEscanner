import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
	const navigator = useNavigate();
	const data = JSON.parse(sessionStorage.getItem("user") || "{}");
	const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
	useEffect(() => {
		data.firstName ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false);
	}, []);

	return (
		<div className="navbar">
			<div className="navbar-container">
				<button className="logo" onClick={() => navigator("/")}>
					Hook
				</button>
				<input type="text" placeholder="Search" className="search"></input>
				<button className="add-data">Add Data</button>
				<button className="devices">Devices</button>
				<button className="openwrt" onClick={() => navigator("/openwrt")}>
					Openwrt
				</button>
				<button className="dlink" onClick={() => navigator("/dlink")}>
					Dlink
				</button>
				<button className="hikvision" onClick={() => navigator("/hikvision")}>
					HikVision
				</button>
			</div>
			<div className="footer-container">
				<button className="help">Help</button>
				{isUserLoggedIn && (
					<button
						className="user-message"
						onClick={() =>
							navigator("/userInfo")
						}>{`${data.firstName} ${data.lastName}`}</button>
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
