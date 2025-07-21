// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en-US">
				<Head>
					<meta name="author" content="Isaiah Odhner" />
					<meta name="description" content="Isaiah Odhner's portfolio website" />
					<meta name="keywords" content="Isaiah Odhner, 1j0, 1j01" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta name="theme-color" content="#0083A5" />
					<link rel="icon" sizes="any" type="image/svg+xml" href="/images/icons/favicon.svg" />
					<link rel="icon" sizes="16x16" type="image/x-icon" href="/images/icons/favicon.ico" />
					<link rel="icon" sizes="16x16" type="image/png" href="/images/icons/favicon.png" />
					<link rel="stylesheet" type="text/css" href="/portfolio.css" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
