'use strict'

const fs = require('fs')
const XMLSplitter = require('xml-splitter')

module.exports = report => {
  const metrics = report.project.metrics

  const functionRate = parseFloat(parseInt(metrics.coveredmethods) / parseInt(metrics.methods))
  const lineRate = parseFloat(parseInt(metrics.coveredstatements) / parseInt(metrics.statements))
  const branchRate = parseFloat(parseInt(metrics.coveredconditionals) / parseInt(metrics.conditionals))

  const percent = Math.floor(((functionRate + lineRate + branchRate) / 3) * 100)

  return {
    overallPercent: percent,
    functionRate: functionRate,
    lineRate: lineRate,
    branchRate: branchRate
  }
}
