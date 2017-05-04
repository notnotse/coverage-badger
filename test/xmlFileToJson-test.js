'use strict'

const expect = require('chai').expect
const cloverReportParser = require('../lib/cloverReportParser')
const xmlFileToJson = require('../lib/xmlFileToJson')

describe('XML file to JSON loader', () => {
  it('Should load file as json', done => {
    const reportFilePath = __dirname + '/fixture/clover.xml'

    xmlFileToJson(reportFilePath)
      .then(data => {
        expect(data).to.be.defined
        done()
      })
  })

  it('Should handle if file not found', done => {
    const reportFilePath = __dirname + '/non-existent.xml'

    xmlFileToJson(reportFilePath)
      .catch(err => {
        expect(err).to.be.defined
        done()
      })
  })
})
