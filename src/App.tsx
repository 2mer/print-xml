import React from 'react'

// this needs to be imported before any components get imported
import { printXML, svg, html, debug } from './jsx-to-data-uri'


import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@material-ui/core'
import { ServerStyleSheets } from '@material-ui/core/styles';
const sheets = new ServerStyleSheets();

const StyledDiv = () => (
	<div
		style={{
			width: '100px',
			height: '100px',
			background: svg({
				width: 50,
				height: 50,
				element: <circle fill="red" cx="50%" cy="50%" r="50%" />
			})
		}}
	/>
)

const StyledDivMUI = () => (
	<div
		style={{
			width: '100px',
			height: '100px',
			background: html({
				width: 100,
				height: 100,
				style: () => sheets.toString(),
				element: sheets.collect(
					<Paper>
						<Box p="1rem">
							<Button variant="contained">hello</Button>
						</Box>
					</Paper>
				)
			})
		}}
	/>
)

export default function App() {

	printXML.svg({
		width: 100,
		height: 100,
		style: `
		@keyframes rotate {
			to { transform: rotate(360deg); }
		}
	
		.rot {
			fill: red;
			animation: 1s rotate infinite linear;
		}
		`,
		element: <rect width="50%" height="50%" className="rot" />
	})

	debug.svg({
		width: 100,
		height: 100,
		style: `
		@keyframes rotate {
			to { transform: rotate(360deg); }
		}
	
		.rot {
			fill: red;
			animation: 1s rotate infinite linear;
		}
		`,
		element: <rect width="50%" height="50%" className="rot" />
	})

	return <>
		<StyledDiv />
		<StyledDivMUI />
		<div style={{
			width: '100px',
			height: '100px',
			background: svg({
				width: 100,
				height: 100,
				style: `
				@keyframes rotate {
					to { transform: rotate(360deg); }
				}
			
				.rot {
					fill: red;
					animation: 1s rotate infinite linear;
				}
				`,
				element: <rect width="50%" height="50%" className="rot" />
			})
		}} />
	</>
}
