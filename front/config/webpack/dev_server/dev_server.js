module.exports = {
    port: 3444,
    hot: true,
    proxy: {
        '/api': {
            target: {
                host: "localhost",
                protocol: 'http:',
                port: 1337
            },
            pathRewrite: {
                '^/api': ''
            }
        }
    }
}