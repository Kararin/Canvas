module.exports = {
    entry: './app/harmony/main.jsx',
    output: {
        filename: 'main.js'
    },
    watch: true,
    devtool: 'source-map',

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    }
};