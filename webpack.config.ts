import {
	IBuildPaths,
	TypeMode,
	TypePLatform,
	buldWebpack,
} from '@sergeri-jr25/build-config'
// import {
// 	IBuildPaths,
// 	TypeMode,
// 	TypePLatform,
// 	buldWebpack,
// } from '@packages/build-config'
import path from 'path'
import webpack from 'webpack'
import PackageJson from './package.json'

interface IEnvVariable {
	mode: TypeMode
	port: number
	analyzer: boolean
	platform?: TypePLatform
	SHOP_REMOTE_URL?: string
	ADMIN_REMOTE_URL?: string
}
console.log('test buldWebpack', buldWebpack)
export default (env: IEnvVariable) => {
	const isDev = env.mode === 'development'
	const paths: IBuildPaths = {
		output: path.resolve(__dirname, 'build'),
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
		public: path.resolve(__dirname, 'public'),
	}

	const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:5001'
	const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:5002'

	const config: webpack.Configuration = buldWebpack({
		mode: env.mode ?? 'development',
		port: env.port ?? 5000,
		paths,
		analyzer: false,
		platform: env.platform ?? 'desktop',
	})

	config.plugins.push(
		new webpack.container.ModuleFederationPlugin({
			name: 'host',
			filename: 'remoteEntry.js',
			remotes: {
				shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
				admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
			},
			shared: {
				...PackageJson.devDependencies,
				react: {
					eager: true,
					requiredVersion: PackageJson.dependencies['react'],
				},
				'react-router-dom': {
					eager: true,
					requiredVersion: PackageJson.dependencies['react-router-dom'],
				},
				'react-dom': {
					eager: true,
					requiredVersion: PackageJson.dependencies['react-dom'],
				},
			},
		})
	)

	return config
}
