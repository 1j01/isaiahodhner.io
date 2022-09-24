import Head from 'next/head';

const Title = ({pageName})=>
	<Head>
		<title>{`${pageName ? `${pageName} — ` : ""}Isaiah Odhner`}</title>
	</Head>;

export default Title;
