import React from "react";
import { useNavigate } from "react-router";
import NavBar from "../NavBar/NavBar";

import "./UserInfoPage.css";

const UserInfoPage: React.FC = () => {
	const navigator = useNavigate();

	const onLogout = async () => {
		sessionStorage.removeItem("user");
		navigator("/LogIn");
	};

	const handelLogout = async () => {
		await onLogout();
	};

	const user = JSON.parse(sessionStorage.getItem("user") || "");

	return (
		<div className="logIn-page">
			<NavBar />
			<div className="login-content">
				<div className="user-page-heading">{`Hello,${user?.firstName}`}</div>
				<button
					id="page-logout"
					onClick={() => {
						handelLogout();
					}}>
					Logout
				</button>
			</div>
		</div>
	);
};

export default UserInfoPage;
