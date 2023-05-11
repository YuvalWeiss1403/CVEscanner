import React from "react";
import HomePage from "./Components/HomePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp/SignUp";
import LogInPage from "./Components/LogInPage/LogInPage";
import UserInfoPage from "./Components/UserInfoPage/UserInfoPage";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/SignUp" element={<SignUp />} />
				<Route path="/Login" element={<LogInPage />} />
				<Route path="/userInfo" element={<UserInfoPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
