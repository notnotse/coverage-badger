'use strict'

const fs = require('fs')
const path = require('path')

module.exports = saveAtPath => buffer => new Promise((resolve, reject) => {
  var dirToSave = path.dirname(saveAtPath)
  fs.writeFile(saveAtPath, buffer, err => {
    if (err) reject(err)

    fs.stat(saveAtPath, (err, stat) => {
      if (err) reject(err)

      resolve({
        filePath: saveAtPath,
        size: stat.size
      })
    })
  })
})
