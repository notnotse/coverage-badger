'use strict'

const fs = require('fs')
const XMLSplitter = require('xml-splitter')

module.exports = file => new Promise((resolve, reject) => {
  fs.readFile(file, (err, coberturaXmlReport) => {
    if (err) reject(err)

    // Parse the coverage root element.
    const xs = new XMLSplitter('/coverage')
    xs
      .on('data', resolve)
      .on('error', reject)
      .parseString(coberturaXmlReport)
  })
})
