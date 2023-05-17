import React from "react";
import "./SeverityCard.css";
import { useDispatch } from "react-redux";
import {
	OpenwrtCves,
	OpenwrtCvesBySeverity,
} from "../../store/slices/OpenwrtSlice";
import { DlinkCves, DlinkCvesBySeverity } from "../../store/slices/DlinkSlice";
import {
	HikvisionCves,
	HikvisionCvesBySeverity,
} from "../../store/slices/HikvisionSlice";

export interface severityCard {
	company: string;
	type: string;
	count: number;
}

const SeverityCard: React.FC<severityCard> = (props: severityCard) => {
	const { type, count, company } = props;
	const dispatch = useDispatch();

	return (
		<div
			className="severity-card"
			onClick={() => {
				if (company === "openwrt") {
					if (type === "issues") {
						dispatch(OpenwrtCves());
					} else {
						dispatch(OpenwrtCvesBySeverity(type.toLowerCase()));
					}
				}
				if (company === "dlink") {
					if (type === "issues") {
						dispatch(DlinkCves());
					} else {
						dispatch(DlinkCvesBySeverity(type.toLowerCase()));
					}
				}
				if (company === "hikvision") {
					if (type === "issues") {
						dispatch(HikvisionCves());
					} else {
						dispatch(HikvisionCvesBySeverity(type.toLowerCase()));
					}
				}
			}}>
			<div className="type-heading">
				{type.toLowerCase() !== "issues"
					? type.toLowerCase() + " severity"
					: "Total Issues"}
			</div>
			<div className="since-heading">Since 1 week ago</div>
			<div className={`count-box ${type.toLowerCase()}`}>
				<div className="cves-count">{count}</div>
				<div className="type">{type.toLowerCase()}</div>
			</div>
		</div>
	);
};

export default SeverityCard;
