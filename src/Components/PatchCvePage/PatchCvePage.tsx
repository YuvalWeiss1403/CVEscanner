import "./PatchCvePage.css";
import NavBar from "../NavBar/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ICVE } from "../CVECard/CVECard";
import { OpenwrtCvesByID } from "../../store/slices/OpenwrtSlice";
import { DlinkCvesByID } from "../../store/slices/DlinkSlice";
import { HikvisionCvesByID } from "../../store/slices/HikvisionSlice";
import { useEffect, useState } from "react";
import {
	DevicesByID,
	DevicesByType,
	IDevices,
} from "../../store/slices/DevicesSlice";

const PatchCvePage: React.FC = () => {
	const { companyName } = useParams<string>();
	const { CVEId } = useParams<string>();
	const [Product, setProduct] = useState<string>("all");
	const [SelectedDevices, setSelectedDevices] = useState<string[]>([]);
	const [PatchedModal, setPatchedModal] = useState(false);

	const openwrtCves = useSelector(
		(state: RootState) => state.OpenwrtCves.value
	);
	const dlinkCves = useSelector((state: RootState) => state.DlinkCves.value);
	const hikvisionCves = useSelector(
		(state: RootState) => state.HikvisionCves.value
	);

	const devices: IDevices[] = useSelector(
		(state: RootState) => state.Devices.value
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	let cves: ICVE[] = [];
	if (companyName === "openwrt") {
		cves = openwrtCves;
	} else if (companyName === "dlink") {
		cves = dlinkCves;
	} else if (companyName === "hikvision") {
		cves = hikvisionCves;
	}

	useEffect(() => {
		dispatch(OpenwrtCvesByID(CVEId?.toLowerCase()));
		dispatch(DlinkCvesByID(CVEId?.toLowerCase()));
		dispatch(HikvisionCvesByID(CVEId?.toLowerCase()));
		dispatch(DevicesByID("6467c1009384512f2ca368a4"));
	}, []);

	const handelProductSelection = (value: string) => {
		setProduct(value);
	};

	const handelDeviceSelection = (value: string) => {
		const isSelected = SelectedDevices.includes(value);
		setSelectedDevices((prevDevices) =>
			isSelected
				? prevDevices.filter((device) => device !== value)
				: [...prevDevices, value]
		);
	};

	const handelPatched = () => {
		setPatchedModal(true);
	};

	const handelExit = () => {
		setPatchedModal(false);
	};

	return (
		<div className="patch-cve-page">
			<NavBar />
			<div className="patch-cve-content">
				<div className="cve-id">{cves[0].cve.id}</div>
				<div className="cve-desc">{cves[0].cve.descriptions[0].value}</div>
				<div className="choose-patch-container">
					<div className="choose-product">
						<label>{"Choose a Product: "}</label>

						<select
							name="product"
							id="products"
							onChange={(e) => handelProductSelection(e.target.value)}>
							<option value="all">All</option>
							<option value="router">Router</option>
							<option value="switch">Switch</option>
							<option value="camera">Camera</option>
						</select>
					</div>
				</div>
				<table className="device-table">
					<thead>
						<tr>
							<th>Select</th>
							<th>Device IP</th>
							<th>Year</th>
							<th>Last Patched</th>
						</tr>
					</thead>
					<tbody>
						{devices.map((device: IDevices, index: number) => (
							<tr key={index}>
								<td>
									<input
										type="checkbox"
										checked={SelectedDevices.includes(device.IpAddress)}
										onChange={() => handelDeviceSelection(device.IpAddress)}
									/>
								</td>
								<td>{device.IpAddress}</td>
								<td>{device.year}</td>
								<td>{device.PatchHistory}</td>
							</tr>
						))}
					</tbody>
				</table>
				<button className="patch" onClick={() => handelPatched()}>
					Patch Devices
				</button>
			</div>
			{PatchedModal && (
				<div className="device-patched-modal">
					<button
						className="close-button"
						onClick={() => {
							setPatchedModal(false);
							window.location.reload();
						}}>
						&times;
					</button>
					<div className="device-patched-content">
						<div className="device-patched-header">Device Patched:</div>
						<div className="device-patched">{SelectedDevices.join(", ")}</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PatchCvePage;
