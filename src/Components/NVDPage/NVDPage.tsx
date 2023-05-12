import "./NVDPage.css";
import NavBar from "../NavBar/NavBar";
import CVECard, { ICVE } from "./CVECard/CVECard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const NVDPage: React.FC = () => {
	const cves = useSelector((state: RootState) => state.cves.value);

	return (
		<div className="nvd-page">
			<NavBar />
			<div className="cve-content">
				{cves &&
					cves.map((cve: ICVE, index: number) => {
						return (
							<CVECard
								key={index}
								descriptions={cve.cve.descriptions}
								id={cve.cve.id}
								lastModified={cve.cve.lastModified}
								published={cve.cve.published}
								references={cve.cve.references}
								sourceIdentifier={cve.cve.sourceIdentifier}
								vulnStatus={cve.cve.vulnStatus}
								weaknesses={cve.cve.weaknesses}></CVECard>
						);
					})}
			</div>
		</div>
	);
};

export default NVDPage;
