import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
// @ts-ignore;
// import adminRoutes from 'admin/Router'
// @ts-ignore;
import { Suspense } from 'react'
import SafeImport from '../SelfImport'
// import shopRoutes from 'shop/Router'

// const ShopRouter = lazy(() => import('shop/Router')) // Загружаем роуты микрофронта shop
// const AdminRouter = lazy(() => import('admin/Router')) // Загружаем роуты микрофронта admin
const GlobalErrorBoundary = () => <div>Ошибка загрузки страницы</div>
const ShopRouter = SafeImport(
	() => import('shop/Router'),
	<div>Shop недоступен</div>
)
const AdminRouter = SafeImport(
	() => import('admin/Router'),
	<div>Admin недоступен</div>
)

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <GlobalErrorBoundary />,
		children: [
			{
				path: '/shop',
				element: (
					<Suspense fallback={<div>Loading Shop...</div>}>
						<ShopRouter />
					</Suspense>
				),
			},
			{
				path: '/admin',
				element: (
					<Suspense fallback={<div>Loading Admin...</div>}>
						<AdminRouter />
					</Suspense>
				),
				errorElement: <GlobalErrorBoundary />,
			},
		],
	},
])
