import React from 'react'

import { svg } from './jsx-to-data-uri'

export default function App() {
	return (
		<div style={{
			width: '100px',
			height: '100px',

			// background: jsxToDataUri({
			// 	style: `
			// 	.box {
			// 		fill: orange;
			// 		animation: 1s change infinite alternate;
			// 	}

			// 	@keyframes change {
			// 		to { fill: red; }
			// 	}
			// 	`,
			// 	element: <rect fill="transparent" stroke="red" strokeWidth="2px" width="10" height="10" className="box" />,
			// 	width: '10px',
			// 	height: '10px',
			// })
			background: svg`
				.box {
					fill: orange;
					animation: 1s change infinite alternate;
				}

				@keyframes change {
					to { fill: red; }
				}
				`
				({
					element: <rect fill="transparent" stroke="red" strokeWidth="2px" width="10" height="10" className="box" />,
					width: '10px',
					height: '10px',
				})

		}} />
	)
}
