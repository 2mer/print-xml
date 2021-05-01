# print-xml
## A tool used to create `DataURI` out of `React` nodes - And even render them to the `devtools console`!

<br />
<br />
<br />


<p align="center">
  <a href="https://codesandbox.io/s/printxml-demo-w8ozv?file=/src/App.js">
    <img src="https://img.shields.io/badge/CodeSandbox-Live%20Demo-lightgrey?style=for-the-badge&logo=CodeSandBox" style="transform: scale(2)"/>
  </a>
</p>

<br />
<br />
<br />

### installation
npm:
```bash
$ npm install print-xml
```
yarn:
```bash
$ yarn add print-xml
```

<br />
<br />
<br />

### usage
custom svg background:
```js
import { svg } from 'print-xml'

const StyledDiv = () => (
  <div
    style={{
      width: '100px',
      height: '100px',
      background: svg({
        width: 50,
        height: 50,
        element: <circle fill="red" cx="50%" cy="50%" r="50%"/>
      })
    }}
  />
)
```
custom html background:
```js
import { html } from 'print-xml'

const StyledDiv = () => (
  <div
    style={{
      width: '100px',
      height: '100px',
      background: html({
        width: 50,
        height: 50,
        element: (
          <div
            style={{
              borderRadius: '50%',
              width: '100%',
              height: '100%'
            }}
          />
        )
      })
    }}
  />
)
```
Alternatively using styles:
```js
import { html, svg } from 'print-xml'

const StyledDivSVG = () => (
  <div
    style={{
      width: '100px',
      height: '100px',
      background: html({
        width: 50,
        height: 50,
        style: `
        .abc {
          fill: red;
        }
        `,
        element: <circle cx="50%" cy="50%" r="50%" className="abc"/>
      })
    }}
  />
)

const StyledDivHTML = () => (
  <div
    style={{
      width: '100px',
      height: '100px',
      background: html({
        width: 50,
        height: 50,
        style: `
        .abc {
          background: red;
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
        `,
        element: <div className="abc"/>
      })
    }}
  />
)
```
Material UI example:
```js
import React from 'react'

// This has to be imported before other components
import { html } from 'print-xml'

import { Paper, Box, Button } from '@material-ui/core'

import { ServerStyleSheets } from '@material-ui/core/styles';


const sheets = new ServerStyleSheets();

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
```

### Printing to console
now for the fun part:

```js
import React from 'react'

// This has to be imported before other components
import printXML from 'print-xml'

import { Paper, Box, Button } from '@material-ui/core'

import { ServerStyleSheets } from '@material-ui/core/styles';


const sheets = new ServerStyleSheets();

printXML.html({
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
  element: <rect width="100%" height="100%" className="rot"/>
})
```
