// craco.config.js
const path = require('path');
const webpack = require('webpack')
const { DefinePlugin } = webpack

module.exports = {
    style: {
        postcss: {
            plugins: [require("tailwindcss"), require("autoprefixer")],
        },
    },
    webpack: {
        plugins: {
            add: [new DefinePlugin({
                'process.env.API_URL': '"http://localhost:4000"',
            })],
        }
    },
};
