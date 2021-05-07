import React from 'react'

import { renderToString } from 'react-dom/server'


//#region disable useLayoutEffect warnings by using useEffect instead
const CONTROL = {
	disableUseLayoutEffect: false
}
{
	// used to disable useLayoutEffect warnings, super hacky but does the job.
	// might be weird if multiple renders happen in parallel which shouldnt be happening anyways?
	const oldUseLayoutEffect = React.useLayoutEffect

	Object.defineProperty(React, 'useLayoutEffect', {
		get: () => (f: any, deps: any) => (CONTROL.disableUseLayoutEffect ? React.useEffect : oldUseLayoutEffect)(f, deps)
	})
}
//#endregion

interface JsxToDataUriOptions {
	element: JSX.Element
	width?: number
	height?: number
	style?: (() => string) | string
}

export function jsxToString(el: JSX.Element) {
	return renderToString(el)
		.replace(/"/g, "'")
		.replace(/#/g, '%23')
		.replace(/\n/g, '')
		.replace(/  /g, '')
		.replace(/\t/g, '')
		.replace(/ data-reactroot=''/g, '')
}

export default function jsxToDataUri(options: JsxToDataUriOptions) {

	const { style: css } = options


	// render elements
	CONTROL.disableUseLayoutEffect = true
	const element = jsxToString(options.element)
	CONTROL.disableUseLayoutEffect = false

	// render styles
	const styles = css ? (
		typeof css === 'function' ? (
			jsxToString(<style id="jss-server-side">{css()}</style>)
		) :
			jsxToString(<style id="jss-server-side">{css}</style>)
	) : ''

	const renderString = styles + element

	return svgDataUri(
		renderString,
		options.width,
		options.height,
	)

}

export function svgDataUri(str: string, width = 100, height = 100) {
	return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'>${str}</svg>")`
}

export function svg(options: JsxToDataUriOptions) {
	return jsxToDataUri(options)
}

export function html(options: JsxToDataUriOptions) {

	const {
		width = 100,
		height = 100,
		style,
		element
	} = options

	const nOptions: JsxToDataUriOptions = {
		style,
		width,
		height,
		element: (
			<svg>
				<foreignObject width={width} height={height} >
					{/* @ts-ignore */}
					<body xmlns="http://www.w3.org/1999/xhtml" style={{ padding: 0, margin: 0 }}>
						{element}
					</body>
				</foreignObject>
			</svg>
		)
	}

	return jsxToDataUri(nOptions).replace(/<svg(?! xmlns)/g, '<svg xmlns=\'http://www.w3.org/2000/svg\'')
}


const metaF = (f: Function) => (options: JsxToDataUriOptions & { consoleStyle?: string }) => {
	const {
		width = 100,
		height = 100,
		consoleStyle = '',
	} = options
	console.log('%c ', `${consoleStyle}; padding: ${height / 2}px ${width / 2}px; font-size: 0px; background: ${f(options)}`)
}

const metaFDebug = (f: Function) => (options: JsxToDataUriOptions) => {
	const str = f(options).replace(/^url\("/gm, '').replace(/"\)$/gm, '')
	const iframe = "<iframe width='100%' height='100%' src=\"" + str + "\" frameBorder='0'></iframe>"
	const x = window.open() as any;
	if (x) {
		x.document.open();
		x.document.write(iframe);
		x.document.title = "Debug XML"
		x.document.body.style = "padding: 0; margin: 0;"
		x.document.close();
	}
}

export const printXML = {
	svg: metaF(svg),
	html: metaF(html),
}

export const debug = {
	svg: metaFDebug(svg),
	html: metaFDebug(html),
}