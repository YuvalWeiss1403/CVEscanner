import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
	const navigator = useNavigate();

	return (
		<div className="navbar">
			<div className="navbar-container">
				<button className="logo" onClick={() => navigator("/")}>
					Hook
				</button>
				<input type="text" placeholder="Search" className="search"></input>
				<button className="add-data">Add Data</button>
				<button className="all-capabilities">All Capabilities</button>
				<button className="all-entities">All Entities</button>
				<button className="apps">Apps</button>
				<button className="devices">Devices</button>
			</div>
			<div className="footer-container">
				<button className="help">Help</button>
				<button className="login" onClick={() => navigator("/Login")}>
					Login
				</button>
				<button className="sign-up" onClick={() => navigator("/SignUp")}>
					Sign Up
				</button>
			</div>
		</div>
	);
};
export default NavBar;