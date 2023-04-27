const { paths } = require('../paths')
const rules = require('./module_rules')

module.exports = {
    entry: paths.entry_tsx,
    output: {
        path: paths.output,
        filename: "bundle.[fullhash].js",
        publicPath: '/',
        clean: true
    },
    module: {
        rules: rules
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            src: paths.src
        }
    }
};