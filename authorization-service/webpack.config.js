const slsw = require('serverless-webpack');
const nodeExternals = require("webpack-node-externals");

module.exports = (async () => {
    return {
        entry: slsw.lib.entries,
        target: "node",
        mode: slsw.lib.webpack.isLocal ? "development" : "production",
        externals: [nodeExternals()],
        module: {
            rules: [{ test: /\.js$/, use: "babel-loader" }],
        },
    };
})();
