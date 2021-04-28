import * as React from 'react'

import { renderToString } from 'react-dom/server'

interface JsxToDataUriOptions {
	element: JSX.Element
	width?: string
	height?: string
}

export default function jsxToDataUri(style: string, options: JsxToDataUriOptions) {

	return svgDataUri(
		renderToString(<>
			{style && <style>{style}</style>}
			{options.element}
		</>)
			.replace(/"/g, "'")
			.replace(/#/g, '%23')
			.replace(/\n/g, '')
			.replace(/  /g, '')
			.replace(/\t/g, '')
			.replace(/ data-reactroot=''/g, ''),
		options.width,
		options.height,
	)

}

export function svgDataUri(str: string, width: string = '100', height: string = '100') {
	return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'>${str}</svg>")`
}

export function svg(strs: TemplateStringsArray, ...rest: any[]) {
	let [ret, rstrs] = strs
	rest.forEach((r, index) => {
		ret += r
		ret += rstrs[index]
	});

	const style = ret

	return (options: JsxToDataUriOptions) => jsxToDataUri(style, options)
}