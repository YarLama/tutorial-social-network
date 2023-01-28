const path = require('path')

const paths = {
    root: path.resolve(__dirname, '..'),
    src: path.resolve(__dirname, '../src'),
    public: path.resolve(__dirname, '../public'),
    public_html: path.resolve(__dirname, '../public', 'index.html'),
    entry_tsx: path.resolve(__dirname, '../src', 'index.tsx'),
    dist: path.resolve(__dirname, '../dist')
}

module.exports = { paths }