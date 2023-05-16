import React from "react";
import "./SeverityCard.css";

export interface severityCard {
	type: string;
	count: number;
}

const SeverityCard: React.FC<severityCard> = (props: severityCard) => {
	const { type, count } = props;
	return (
		<div className="severity-card">
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
