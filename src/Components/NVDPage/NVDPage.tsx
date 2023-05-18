import React, { useState, useEffect } from "react";
import "./NVDPage.css";
import NavBar from "../NavBar/NavBar";
import CVECard, { ICVE, metricData } from "../CVECard/CVECard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SeverityCard from "../SeverityCard/SeverityCard";
import {
	DlinkCves,
	DlinkCvesByDesc,
	DlinkCvesByDescOrID,
	DlinkCvesByID,
} from "../../store/slices/DlinkSlice";
import {
	HikvisionCves,
	HikvisionCvesByDesc,
	HikvisionCvesByDescOrID,
	HikvisionCvesByID,
} from "../../store/slices/HikvisionSlice";
import {
	OpenwrtCves,
	OpenwrtCvesByDesc,
	OpenwrtCvesByDescOrID,
	OpenwrtCvesByID,
} from "../../store/slices/OpenwrtSlice";
import { useParams } from "react-router-dom";

interface BaseSeverity {
	HIGH: number;
	MEDIUM: number;
	LOW: number;
	[key: string]: number;
}

const NVDPage: React.FC = () => {
	const { companyName } = useParams<string>();
	const openwrtCves = useSelector(
		(state: RootState) => state.OpenwrtCves.value
	);
	const dlinkCves = useSelector((state: RootState) => state.DlinkCves.value);
	const hikvisionCves = useSelector(
		(state: RootState) => state.HikvisionCves.value
	);
	const dispatch = useDispatch();
	const initialValue: BaseSeverity = { HIGH: 0, MEDIUM: 0, LOW: 0 };
	const [baseSeverity, setBaseSeverity] = useState<BaseSeverity>(initialValue);
	const [searchByID, setSearchByID] = useState<boolean>(false);
	const [searchByDesc, setSearchByDesc] = useState<boolean>(false);
	const [searchInput, setSearchInput] = useState<string>("");
	const [totalIssues, setTotalIssues] = useState<number>(0);

	let cves: ICVE[] = [];
	if (companyName === "openwrt") {
		cves = openwrtCves;
	} else if (companyName === "dlink") {
		cves = dlinkCves;
	} else if (companyName === "hikvision") {
		cves = hikvisionCves;
	}

	useEffect(() => {
		setBaseSeverity(initialValue);
		const handleSeverity = (sev: string) => {
			setBaseSeverity((prevSeverity) => ({
				...prevSeverity,
				[sev]: prevSeverity[sev] + 1,
			}));
		};
		if (cves) {
			cves.forEach((cve: ICVE) => {
				const cveData: metricData[] | null = cve.cve.metrics.cvssMetricV2;
				if (cveData && cveData.length > 0) {
					handleSeverity(cveData[0].baseSeverity);
				}
			});
		}
		setTotalIssues(cves.length);
	}, [companyName]);

	useEffect(() => {
		dispatch(DlinkCves());
		dispatch(HikvisionCves());
		dispatch(OpenwrtCves());
	}, []);

	const handelSearch = () => {
		if (companyName === "openwrt") {
			if (searchByDesc && searchByID) {
				dispatch(OpenwrtCvesByDescOrID(searchInput));
			} else if (searchByID) {
				dispatch(OpenwrtCvesByID(searchInput));
			} else if (searchByDesc) {
				dispatch(OpenwrtCvesByDesc(searchInput));
			}
		} else if (companyName === "dlink") {
			if (searchByDesc && searchByID) {
				dispatch(DlinkCvesByDescOrID(searchInput));
			} else if (searchByID) {
				dispatch(DlinkCvesByID(searchInput));
			} else if (searchByDesc) {
				dispatch(DlinkCvesByDesc(searchInput));
			}
		} else if (companyName === "hikvision") {
			if (searchByDesc && searchByID) {
				dispatch(HikvisionCvesByDescOrID(searchInput));
			} else if (searchByID) {
				dispatch(HikvisionCvesByID(searchInput));
			} else if (searchByDesc) {
				dispatch(HikvisionCvesByDesc(searchInput));
			}
		}
	};

	useEffect(() => {
		handelSearch();
	}, [searchInput]);

	return (
		<div className="nvd-page">
			<NavBar />
			<div className="page-heading">{companyName + " dashboard"}</div>
			<div className="severity-cards">
				<div className="total-severity-card">
					<div className="type-heading">Total Issues</div>
					<div className="since-heading">Since 1 week ago</div>
					<div className="count-box issues">
						<div className="cves-count">{totalIssues}</div>
						<div className="type">{"Issues"}</div>
					</div>
				</div>
				{Object.entries(baseSeverity).map(([key, value]) => (
					<SeverityCard
						key={key}
						type={key}
						count={value}
						company={companyName ? companyName : ""}
					/>
				))}
			</div>
			<div className="search-container">
				<div className="search-heading">Search By:</div>
				<div className="id-search">
					<input
						type="checkbox"
						checked={searchByID}
						onChange={() => setSearchByID((prevSearchByID) => !prevSearchByID)}
					/>{" "}
					<label>ID</label>
				</div>
				<div className="desc-search">
					<input
						type="checkbox"
						checked={searchByDesc}
						onChange={() =>
							setSearchByDesc((prevSearchByID) => !prevSearchByID)
						}
					/>{" "}
					<label>Description</label>
				</div>
				<input
					type="text"
					placeholder="Search CVE"
					onChange={(e) => setSearchInput(e.target.value)}></input>
				<div>{"Results: " + cves.length}</div>
			</div>
			<div className="table-container">
				<table className="cve-content">
					<thead>
						<tr>
							<th className="index"></th>
							<th className="cve-id-heading">ID</th>
							<th className="cve-lastModified-heading">Last Modified</th>
							<th className="cve-published-heading">Published Date</th>
							<th className="cve-desc-heading">Descriptions</th>
							<th className="cve-patch-heading">Patched</th>
						</tr>
					</thead>
					<tbody>
						{cves &&
							cves.map((cve: ICVE, index: number) => (
								<tr key={index}>
									<td className="index">{index + 1}</td>
									<td className="cve-id">{cve.cve.id}</td>
									<td className="cve-lastModified">{cve.cve.lastModified}</td>
									<td className="cve-published">{cve.cve.published}</td>
									<td className="cve-desc">{cve.cve.descriptions[0].value}</td>
									<th className="cve-patch">
										{cve.cve.references &&
										cve.cve.references[0]?.tags &&
										cve.cve.references[0].tags[0] === "Patch" ? (
											<button className="patch">Patch now</button>
										) : (
											"No available patch"
										)}
									</th>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default NVDPage;
