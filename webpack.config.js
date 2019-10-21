const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'es-bundle.js',
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
                type: 'javascript/esm',
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                },
                exclude: /node_modules/
            }
        ]
    }
};
