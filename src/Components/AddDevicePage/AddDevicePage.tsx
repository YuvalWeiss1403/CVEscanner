import "./AddDevicePage.css";
import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AddDevicePage: React.FC = () => {
	const data = JSON.parse(sessionStorage.getItem("user") || "{}");
	const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
	const navigator = useNavigate();

	useEffect(() => {
		data.firstName ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false);
	}, []);
	return (
		<div className="add-device-page">
			<NavBar />
			{isUserLoggedIn && <div></div>}
			{!isUserLoggedIn && (
				<div className="add-device-not-loggedin">
					<div className="login-heading">To continue, please sign in</div>
					<button className="login page-login" onClick={() => navigator("/Login")}>
						Login
					</button>
				</div>
			)}
		</div>
	);
};

export default AddDevicePage;
