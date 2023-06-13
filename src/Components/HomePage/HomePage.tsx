import "./HomePage.css";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
	const navigator = useNavigate();

	return (
		<div className="home-page">
			<NavBar />
			<div className="home-page-content">
				<div className="home-page-heading"> Welcome</div>
				<div className="companies-cve">
					<div
						className="company"
						id="company1"
						onClick={() => navigator("/hikvision")}>
						Hikvision
					</div>
					<div
						className="company"
						id="company2"
						onClick={() => navigator("/openwrt")}>
						OpenWrt
					</div>
					<div
						className="company"
						id="company3"
						onClick={() => navigator("/dlink")}>
						Dlink
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
