import "./CVECard.css";

export interface ICVE {
	cve: ICVECard;
}

export interface description {
	lang: string;
	value: string;
}

export interface ICVECard {
	descriptions: description[];
	id: string;
	lastModified: string;
	published: string;
	references: object[];
	sourceIdentifier: string;
	vulnStatus: string;
	weaknesses: object[];
}

const CVECard: React.FC<ICVECard> = (props: ICVECard) => {
	const {
		descriptions,
		id,
		lastModified,
		published,
		references,
		sourceIdentifier,
		vulnStatus,
		weaknesses,
	} = props;
	return (
		<div className="cve-card">
			<div className="cve-id">{id}</div>
			<div className="cve-lastModified">{lastModified}</div>
			<div className="cve-published">{published}</div>
			<div className="cve-desc">{descriptions[0].value}</div>
		</div>
	);
};

export default CVECard;
