module.exports = {
	"presets": [
		["@babel/preset-env", {"modules": false}],
		"@babel/preset-react"
	],
	"plugins": [
		[
			"import",
			{
				"libraryName": "antd",
				"libraryDirectory": "es",
				"style": true
			}
		],
		"@babel/plugin-syntax-dynamic-import",
		"@babel/plugin-syntax-import-meta",
		"@babel/plugin-proposal-json-strings",
		[
			"@babel/plugin-proposal-decorators",
			{
				"legacy": true
			}
		],
		[
			"@babel/plugin-proposal-class-properties",
			{
				"loose": true
			}
		],
		"@babel/plugin-proposal-function-sent",
		"@babel/plugin-proposal-export-namespace-from",
		"@babel/plugin-proposal-numeric-separator",
		"@babel/plugin-proposal-throw-expressions"
	]
};
