coverage-badger
=========================
Creates a coverage badge by reading the Clover XML coverage report using https://github.com/badges/shields.


* The badge displays appropriate colors for the badge.
 * Green: >= 80% overall coverage
 * Yellow: 65% <= overall coverage < 80%
 * Red: < 65% overall coverage


Installation
=========

```
npm install --save-dev coverage-badger
```

NPM Script
===

coverage-badger can be run as a NPM script.

Example:

```
"scripts": {
  "coverage-badge": "coverage-badger -r coverage/clover.xml -d coverage/",
  "coverage": "npm test -- --coverage && npm run coverage-badge"
}
```

CLI
===

You can now use the CLI to create the badge for a XML Clover report.

The CLI prints the following help:

```
$ ./node_modules/coverage-badger/lib/cli.js

  Usage: cli [options]

  Generates a badge for a given Clover XML report

  Options:

    -h, --help                          output usage information
    -V, --version                       output the version number
    -f, --defaults                      Use the default values for all the input.
    -e, --excellentThreshold <n>       The threshold for green badges, where coverage >= -e
    -g, --goodThreshold <n>            The threshold for yellow badges, where -g <= coverage < -e
    -b, --badgeFileName <badge>         The badge file name that will be saved.
    -r, --reportFile <report>           The Clover XML file path.
    -d, --destinationDir <destination>  The directory where 'coverage.svg' will be generated at.

  Examples:

    $ coverage-badger -e 90 -g 65 -r coverage/clover.xml -d coverage/
      * Green: coverage >= 90
      * Yellow: 65 <= coverage < 90
      * Red: coverage < 65
      * Created at the coverage directory from the given report.
```
