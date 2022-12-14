const path = require('path');

module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	entry: "./src/index.ts",
	output: {
		filename: "script.js"
	},
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules: [
			// all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
			{ test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" }
		]
	}
};
