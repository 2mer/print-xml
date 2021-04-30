import * as React from 'react'

import { render } from 'react-dom'
import App from './App'

const root = document.createElement("div")
root.id = "root"

document.body.append(root)

render(<App />, root)