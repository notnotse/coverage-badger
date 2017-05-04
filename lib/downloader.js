'use strict'

const https = require('https')
const http = require('http')

module.exports = (url) => new Promise((resolve, reject) => {
  const httpClient = url.indexOf('https://') === 0 ? https : http

  const req = httpClient.get(url, (res) => {
    if (res.statusCode === 404) reject(res.statusCode)

    const chunks = []
    res.on('data', chunk => chunks.push(chunk))
    res.on('end', () => resolve(Buffer.concat(chunks)))
  })

  req.on('error', reject)
})
