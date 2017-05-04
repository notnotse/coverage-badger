#!/usr/bin/env node
'use strict'

const path = require('path')
const program = require('commander')
const pkgJson = require('../package')
const cloverReportParser = require('./cloverReportParser')
const download = require('./downloader')
const xmlFileToJson = require('./xmlFileToJson')
const saveFile = require('./saveFile')
const createBadgeUrl = require('./createBadgeUrl')

const input = path.resolve('./coverage/clover.xml')
const output = path.resolve('./coverage')

program.description('Generates a badge for a given Clover XML report. ')
  .version(pkgJson.version)
  .option('-F, --format <type>', 'Format of the generated badge. (SVG by default)', 'svg')
  .option('-f, --defaults', 'Use the default values for all the input.')
  .option('-e, --excellentThreashold <n>', 'The threshold for green badges, where coverage >= -e', 90)
  .option('-g, --goodThreashold <n>', 'The threshold for yellow badges, where -g <= coverage < -e  ', 65)
  .option('-b, --badgeFileName <badge>', 'The badge file name that will be saved.', 'coverage')
  .option('-r, --reportFile <report>', 'The Clover XML file path.', input)
  .option('-d, --destinationDir <destination>', 'The directory where coverage.svg will be generated at.', output)
  .option('-v, --verbose', 'Prints the metadata for the command')
  .parse(process.argv)

program.on('--help', function() {
  console.log('  Examples:')
  console.log('')
  console.log('    $ coverage-badger -e 90 -g 65 -r coverage/clover.xml -d coverage/')
  console.log('      * Green: coverage >= 90')
  console.log('      * Yellow: 65 <= coverage < 90')
  console.log('      * Red: coverage < 65')
  console.log('      * Created at the coverage directory from the given report.')
  console.log('')
})

// Stop the execution if no options were provided.
if (!program.defaults && !process.argv.slice(2).length) {
  program.outputHelp()
  process.exit(0)
}

// The options to the badger API coming from the program.
const opts = {
  badgeFileName: path.join(program.destinationDir, program.badgeFileName + '.' + program.format),
  badgeFormat: program.format,
  destinationDir: path.resolve(program.destinationDir),
  reportFile: program.reportFile,
  thresholds: {
    excellent: program.excellentThreashold,
    good: program.goodThreashold
  }
}

xmlFileToJson(opts.reportFile)
  .then(cloverReportParser)
  .then(createBadgeUrl(opts))
  .then(download)
  .then(saveFile(opts.badgeFileName))
  .then(console.log)
  .catch(console.error)
