'use strict'

module.exports = opts => report => {
  const color = report.overallPercent >= opts.thresholds.excellent ? (
    'brightgreen'
  ) : (
    report.overallPercent >= opts.thresholds.good ? 'yellow' : 'red'
  )

  return `https://img.shields.io/badge/coverage-${report.overallPercent}%-${color}.${opts.badgeFormat}?style=${opts.shieldStyle}`
}
