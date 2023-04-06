const ts_rule = require('./typescript')
const sass_rule = require('./sass')
const svg_rule = require('./svg')
const media_rule = require('./media')

const rules = [
    ts_rule,
    sass_rule,
    svg_rule,
    media_rule
]

module.exports = rules
