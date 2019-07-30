const path = require('path');

module.exports = {
    entry: './src/cdn.js',
    output: {
        filename: 'bold-subscriptions-js.min.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                },
            }
        ]
    }
};
