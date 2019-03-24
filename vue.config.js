module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/tu-vibe/'
        : '/',
    devServer: {
        https: true
    }
}