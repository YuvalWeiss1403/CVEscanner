import "./CVECard.css";

export interface ICVE {
	cve: ICVECard;
}

export interface description {
	lang: string;
	value: string;
}

export interface reference {
	url: string;
	source: string;
	tags:string[];
}
export interface weakness {
	source: string;
	type: string;
	description: description[];
}
export interface cvsData {
	version: string;
	vectorString: string;
	accessVector: string;
	accessComplexity: string;
	authentication: string;
	confidentialityImpact: string;
	integrityImpact: string;
	availabilityImpact: string;
	baseScore: number;
}

export interface metric {
	cvssMetricV2: metricData[];
}
export interface metricData {
	source: string;
	type: string;
	cvssData: cvsData;
	baseSeverity: string;
	exploitabilityScore: number;
}
export interface ICVECard {
	descriptions: description[];
	id: string;
	lastModified: string;
	published: string;
	references: reference[];
	sourceIdentifier: string;
	vulnStatus: string;
	weaknesses: weakness[];
	metrics: metric;
	configurations:configuration;
}

export interface configuration{
	nodes: node;
}
export interface node{
	cpeMatch:cpeMatch;
}
export interface cpeMatch{
	vulnerable:boolean;
	criteria:string;
	versionEndIncluding:string;
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
		metrics,
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
