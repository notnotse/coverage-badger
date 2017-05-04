'use strict'

const expect = require('chai').expect
const cloverReportParser = require('../lib/cloverReportParser')
const xmlFileToJson = require('../lib/xmlFileToJson')

describe('Coverage Parser', () => {
  it('should parse clover file.', done => {
    const reportFilePath = __dirname + '/fixture/clover.xml'

    xmlFileToJson(reportFilePath)
      .then(cloverReportParser)
      .then(report => {
        expect(report.overallPercent).to.equal(24)
        expect(report.functionRate).to.equal(0.20665083135391923)
        expect(report.lineRate).to.equal(0.3381226053639847)
        expect(report.branchRate).to.equal(0.1928721174004193)
        done()
      })
  })
})
