const {
	override,
	fixBabelImports,
	addLessLoader,
	useEslintRc
} = require('customize-cra');

module.exports = override(
	fixBabelImports('antd', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true // change importing css to less
	}, 'antd'),
	fixBabelImports('ant-design-pro', {
		libraryName: 'ant-design-pro',
		libraryDirectory: 'lib',
		style: true, // change importing css to less
		camel2DashComponentName: false
	}, 'antd-pro'),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: {
			'@font-family-no-number': 'Roboto, Helvetica, Arial, sans-serif',
			'@font-family': 'Roboto, @font-family-no-number'
		}
	}),
	useEslintRc('./.eslintrc.js')
);
