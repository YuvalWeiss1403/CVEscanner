import React from "react";
import "./SeverityCard.css";
import { useDispatch } from "react-redux";
import { OpenwrtCvesBySeverity } from "../../store/slices/OpenwrtSlice";
import { DlinkCvesBySeverity } from "../../store/slices/DlinkSlice";
import { HikvisionCvesBySeverity } from "../../store/slices/HikvisionSlice";

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
					dispatch(OpenwrtCvesBySeverity(type.toLowerCase()));
				}
				if (company === "dlink") {
					dispatch(DlinkCvesBySeverity(type.toLowerCase()));
				}
				if (company === "hikvision") {
					dispatch(HikvisionCvesBySeverity(type.toLowerCase()));
				}
			}}>
			<div className="type-heading">{type.toLowerCase() + " severity"}</div>
			<div className="since-heading">Since 1 week ago</div>
			<div className={`count-box ${type.toLowerCase()}`}>
				<div className="cves-count">{count}</div>
				<div className="type">{type.toLowerCase()}</div>
			</div>
		</div>
	);
};

export default SeverityCard;
