const path = require('path')


module.exports = {
    entry: './src/cli.tsx',
    output: {
        filename: 'cli.js',
        path: path.resolve(__dirname, 'dist'),
    },
    target: "node",
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    }
}